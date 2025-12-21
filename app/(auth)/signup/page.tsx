import SignUpComponent from "@/components/auth/signup";
import { constructMetadata } from "@/lib/utils";
import { Metadata } from "next/types";
import { Suspense } from "react";

export const metadata: Metadata = constructMetadata({
  title: "Sign Up",
  description: "Sign up for an account",
  canonical: "/signup",
});

export default function SignUp() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpComponent />
    </Suspense>
  );
}
