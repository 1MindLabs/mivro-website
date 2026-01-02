import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { constructMetadata } from "@/lib/utils";
import { faqData } from "@/utils/constants";
import Link from "next/link";
import { Metadata } from "next/types";

export const metadata: Metadata = constructMetadata({
  title: "FAQ",
  description: "Frequently Asked Questions",
  canonical: "/faq",
});

const FAQ: React.FC = () => {
  return (
    <>
      <section>
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="relative pb-10 pt-32 md:pb-16 md:pt-40">
            <div className="mx-auto max-w-3xl pb-12 md:pb-16">
              <div className="mb-8">
                <h2
                  className="mb-4 text-5xl font-medium text-primary-700"
                  data-aos="fade-up"
                >
                  Frequently Asked Questions
                </h2>
                <p className="text-base text-gray-600" data-aos="fade-up">
                  Can&apos;t find the answer you&apos;re looking for? Ask us
                  directly in our{" "}
                  <Link
                    className="underline"
                    rel="noopener noreferrer"
                    target="_blank"
                    href="https://discord.gg/4CA58C7rkN"
                  >
                    Discord
                  </Link>
                  .
                </p>
              </div>
              <Accordion type="single" collapsible>
                {faqData.map((item, index) => (
                  <AccordionItem key={index} value={String(index + 1)}>
                    <AccordionTrigger className="text-left font-semibold">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="whitespace-pre-line text-base text-gray-600">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;
