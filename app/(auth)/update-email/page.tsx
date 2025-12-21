import UpdateEmailForm from "@/components/auth/update-email-form";
import { constructMetadata } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = constructMetadata({
  title: "Update Email",
  description: "Update your account email",
  canonical: "/update-email",
});

export default function UpdateEmailPage() {
  return (
    <div className="mx-auto max-w-md pt-44 md:pt-32">
      <h1 className="text-center text-3xl font-semibold md:text-5xl md:font-normal">
        Update Email
      </h1>
      <UpdateEmailForm />
    </div>
  );
}
