import SignInComponent from "@/components/auth/signin";
import { constructMetadata } from "@/lib/utils";
import { Metadata } from "next/types";
import { Suspense } from "react";

export const metadata: Metadata = constructMetadata({
  title: "Sign In",
  description: "Sign in to your account",
  canonical: "/signin",
});

export default function SignIn() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInComponent />
    </Suspense>
  );
}
