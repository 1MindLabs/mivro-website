"use client";

import Footer from "@/components/footer";
import PageIllustration from "@/components/page-illustration";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 600,
      easing: "ease-out-sine",
    });
  });

  return (
    <>
      <main className="grow">
        <PageIllustration />

        {children}
      </main>

      <Footer />
    </>
  );
}
