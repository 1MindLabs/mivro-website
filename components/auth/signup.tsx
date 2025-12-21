"use client";

import { setAuthToken } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { GitHubLogo, GoogleLogoColored } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import {
  signInWithOAuthProvider,
  signUpWithEmail,
} from "@/utils/firebase/auth-client";
import { SignUpFormData, signUpSchema } from "@/utils/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function SignUp() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isExtension = searchParams.get("source") === "extension";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [extensionReady, setExtensionReady] = useState(false);

  useEffect(() => {
    if (isExtension) {
      const handleMessage = (event: MessageEvent) => {
        if (
          event.origin === window.location.origin &&
          event.data.type === "MIVRO_EXTENSION_READY"
        ) {
          setExtensionReady(true);
        }
      };
      window.addEventListener("message", handleMessage);
      return () => window.removeEventListener("message", handleMessage);
    }
  }, [isExtension]);

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const checkExistingAuth = async () => {
      if (isExtension && extensionReady) {
        const { auth } = await import("@/utils/firebase/client");
        const user = auth.currentUser;

        if (user && user.email) {
          router.push("/dashboard?source=extension");
        }
      }
    };
    checkExistingAuth();
  }, [isExtension, extensionReady, router]);

  const handleSignUp = async (data: SignUpFormData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const result = await signUpWithEmail(
        data.email,
        data.password,
        data.name,
      );

      if (result.success && result.token) {
        await setAuthToken(result.token);
        toast.success("Account created successfully! Welcome to Mivro.");

        if (isExtension) {
          window.postMessage(
            {
              type: "MIVRO_AUTH_SUCCESS",
              email: data.email,
              password: data.password,
              name: data.name,
            },
            window.location.origin,
          );
        } else {
          router.push("/");
        }
        form.reset();
      } else if (result.exists) {
        toast.error("An account with this email already exists.");
        router.push("/signin");
      } else {
        setErrorMessage(result.error || "Failed to create account");
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOAuthSignUp = async (provider: "google" | "github") => {
    setErrorMessage(null);
    try {
      const result = await signInWithOAuthProvider(provider);

      if (result.success && result.token) {
        await setAuthToken(result.token);
        router.push("/");
      } else {
        setErrorMessage(result.error || "Failed to sign up with OAuth");
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-12 pt-32 md:pb-20 md:pt-40">
          <div className="md:pb-15 mx-auto max-w-3xl pb-10 text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            <h1 className="h1">Create Your Account</h1>
          </div>
          <div className="mx-auto max-w-sm">
            <form onSubmit={(e) => handleOAuthSignUp("google")}>
              <Button
                type="submit"
                size="lg"
                variant="authgroup"
                className="relative flex w-full items-center rounded-md px-0"
              >
                <GoogleLogoColored className="text-white mx-1 h-4 w-4 shrink-0" />
                <span>Sign up with Google</span>
              </Button>
            </form>
            <form onSubmit={(e) => handleOAuthSignUp("github")}>
              <div className="-mx-3 flex flex-wrap">
                <div className="mt-3 w-full px-3">
                  <Button
                    type="submit"
                    size="lg"
                    variant="authgroup"
                    className="relative flex w-full items-center rounded-md px-0"
                  >
                    <GitHubLogo className="mx-1 h-4 w-4 shrink-0 text-gray-700" />
                    <span>Sign up with Github</span>
                  </Button>
                </div>
              </div>
            </form>
            <div className="my-6 flex items-center">
              <div
                className="mr-3 grow border-t border-dotted border-gray-400"
                aria-hidden="true"
              />
              <div className="text-gray-400">Or, register with your email</div>
              <div
                className="ml-3 grow border-t border-dotted border-gray-400"
                aria-hidden="true"
              />
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSignUp)}
                className="space-y-4"
              >
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <FormControl>
                        <Input
                          id="name"
                          placeholder="First and last name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                          placeholder="helloworld@email.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password (at least 8 characters)"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  size="lg"
                  className="w-full rounded-md"
                  disabled={isSubmitting}
                  isLoading={isSubmitting}
                >
                  {isSubmitting ? "Signing up..." : "Sign Up"}
                </Button>

                {errorMessage && (
                  <p className="text-center text-red-500">{errorMessage}</p>
                )}
              </form>
            </Form>

            <div className="mt-6 text-center text-gray-600">
              Already have an account?{" "}
              <Link
                href={isExtension ? "/signin?source=extension" : "/signin"}
                className="text-gray-800 transition duration-150 ease-in-out hover:text-primary-800"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
