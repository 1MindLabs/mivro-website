"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { sendPasswordReset } from "@/utils/firebase/auth-client";
import {
  ResetPasswordFormData,
  resetPasswordSchema,
} from "@/utils/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";

export default function ResetPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleResetPassword = async (data: ResetPasswordFormData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage("");

    try {
      const result = await sendPasswordReset(data.email);

      if (result.success) {
        setSuccessMessage(
          "Password reset instructions have been sent to your email.",
        );
      } else {
        setErrorMessage(result.error || "Failed to send reset email");
        form.reset();
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
    setIsSubmitting(false);
  };

  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-12 pt-32 md:pb-20 md:pt-40">
          {/* Page header */}
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
            <h1 className="h1 mb-4">Forgot your password?</h1>
            <p className="text-xl text-gray-500">
              We&apos;ll email you instructions on how to reset it.
            </p>
          </div>

          {/* Form */}
          <div className="mx-auto max-w-sm">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleResetPassword)}
                className="space-y-4"
              >
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  size="lg"
                  className="w-full rounded-md"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Resetting..." : "Reset Password"}
                </Button>

                {errorMessage && (
                  <p className="text-center text-red-500">{errorMessage}</p>
                )}
                {successMessage !== "" && (
                  <p className="text-center text-green-500">{successMessage}</p>
                )}
              </form>
            </Form>

            <div className="mt-6 text-center text-gray-400">
              <Link
                href="/"
                className="text-gray-700 transition duration-150 ease-in-out hover:text-mivro-green"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
