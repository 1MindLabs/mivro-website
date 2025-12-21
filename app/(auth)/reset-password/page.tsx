import ResetPasswordComponent from "@/components/auth/reset-password";
import { constructMetadata } from "@/lib/utils";
import { Metadata } from "next/types";

export const metadata: Metadata = constructMetadata({
  title: "Reset Password",
  description: "Reset your password",
  canonical: "/reset-password",
});

export default function SignIn() {
  return <ResetPasswordComponent />;
}
