"use client";

import { revalidateLayout } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateUserEmail } from "@/utils/firebase/auth-client";
import { UpdateEmailFormData, updateEmailSchema } from "@/utils/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const ChangeEmailForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<UpdateEmailFormData>({
    resolver: zodResolver(updateEmailSchema),
    defaultValues: {
      email: "",
      confirmEmail: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const router = useRouter();

  const handleChangeEmail: SubmitHandler<UpdateEmailFormData> = async () => {
    if (isSubmitting) return;
    setErrorMessage(null);

    try {
      const data = form.getValues();
      const result = await updateUserEmail(data.email);
      if (!result.success) {
        setErrorMessage(result.error || "Failed to update email.");
      } else {
        toast.success("Email updated successfully.");
        form.reset();
        await revalidateLayout();
        router.push("/dashboard");
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleChangeEmail)}
        className="mt-12 space-y-6 px-6 md:px-0"
      >
        {/* New Email Input */}
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">New Email</FormLabel>
              <FormControl>
                <Input id="email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Email Input */}
        <FormField
          name="confirmEmail"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="confirmEmail">Confirm New Email</FormLabel>
              <FormControl>
                <Input id="confirmEmail" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Error Message */}
        {errorMessage && (
          <p className="text-center text-sm text-red-500">{errorMessage}</p>
        )}

        {/* Submit Button */}
        <Button
          className="mt-6 w-full rounded-md bg-primary-700 text-white-50 hover:bg-primary-800 hover:shadow-sm"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating email..." : "Change Email"}
        </Button>
      </form>
    </Form>
  );
};

export default ChangeEmailForm;
