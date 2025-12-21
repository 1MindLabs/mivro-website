import UpdatePasswordForm from "@/components/auth/update-password-form";
import { constructMetadata } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = constructMetadata({
  title: "Update Password",
  description: "Update your account password",
  canonical: "/update-password",
});

export default function UpdatePasswordPage() {
  return (
    <div className="mx-auto max-w-md pt-44 md:pt-32">
      <h1 className="text-center text-3xl font-semibold md:text-5xl md:font-normal">
        Update Password
      </h1>
      <UpdatePasswordForm />
    </div>
  );
}
