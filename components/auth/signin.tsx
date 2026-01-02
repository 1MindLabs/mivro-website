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
  signInWithEmail,
  signInWithOAuthProvider,
} from "@/utils/firebase/auth-client";
import { SignInFormData, signInSchema } from "@/utils/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";

export default function SignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isExtension = searchParams.get("source") === "extension";
  const { user, loading: authLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [needsPasswordVerification, setNeedsPasswordVerification] =
    useState(false);

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (!isExtension || authLoading || !user?.email) return;

    const storedAuth = localStorage.getItem("mivro_extension_auth");

    if (storedAuth) {
      try {
        const { email, password, name } = JSON.parse(storedAuth);
        window.postMessage(
          {
            type: "MIVRO_AUTH_SUCCESS",
            email,
            password,
            name,
          },
          window.location.origin,
        );

        setTimeout(() => {
          window.postMessage(
            { type: "MIVRO_CLOSE_WINDOW" },
            window.location.origin,
          );
        }, 500);
      } catch (error) {
        console.error("Failed to parse stored auth:", error);
      }
    } else {
      setNeedsPasswordVerification(true);
      form.setValue("email", user.email);
    }
  }, [isExtension, user, authLoading, form]);

  const handleSignIn = async (data: SignInFormData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const result = await signInWithEmail(data.email, data.password);

      if (result.success && result.token) {
        await setAuthToken(result.token);

        const { auth } = await import("@/utils/firebase/client");
        const user = auth.currentUser;
        const displayName = user?.displayName || data.email.split("@")[0];

        localStorage.setItem(
          "mivro_extension_auth",
          JSON.stringify({
            email: data.email,
            password: data.password,
            name: displayName,
          }),
        );

        if (isExtension) {
          window.postMessage(
            {
              type: "MIVRO_AUTH_SUCCESS",
              email: data.email,
              password: data.password,
              name: displayName,
            },
            window.location.origin,
          );
        } else {
          router.push("/");
        }
        form.reset();
      } else {
        setErrorMessage(result.error || "Failed to sign in");
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOAuthSignIn = async (provider: "google" | "github") => {
    setErrorMessage(null);
    try {
      const result = await signInWithOAuthProvider(provider);

      if (result.success && result.token) {
        await setAuthToken(result.token);
        router.push("/dashboard");
      } else {
        setErrorMessage(result.error || "Failed to sign in with OAuth");
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  if (isExtension && authLoading) {
    return (
      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent mx-auto mb-4"></div>
              <p className="text-muted-foreground">
                Checking authentication...
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-12 pt-32 md:pb-20 md:pt-40">
          <div className="md:pb-17 mx-auto max-w-3xl pb-10 text-center text-3xl lg:text-4xl">
            <h1 className="h1">
              {needsPasswordVerification
                ? "Verify Your Password"
                : "Welcome Back!"}
            </h1>
            {needsPasswordVerification && (
              <p className="mt-4 text-base text-muted-foreground">
                You're already signed in! Enter your password to sync with the
                extension.
              </p>
            )}
          </div>

          <div className="mx-auto max-w-sm">
            {!needsPasswordVerification && (
              <>
                <Button
                  type="button"
                  size="lg"
                  variant="authgroup"
                  className="relative flex w-full items-center rounded-md px-0"
                  onClick={() => handleOAuthSignIn("google")}
                >
                  <GoogleLogoColored className="text-white mx-1 h-4 w-4 shrink-0" />
                  <span className="">Sign in with Google</span>
                </Button>
                <div className="-mx-3 flex flex-wrap">
                  <div className="mt-3 w-full px-3">
                    <Button
                      type="button"
                      size="lg"
                      variant="authgroup"
                      className="relative flex w-full items-center rounded-md px-0"
                      onClick={() => handleOAuthSignIn("github")}
                    >
                      <GitHubLogo className="mx-1 h-4 w-4 shrink-0 text-gray-700" />
                      <span className="">Sign in with GitHub</span>
                    </Button>
                  </div>
                </div>
                <div className="my-6 flex items-center">
                  <div
                    className="mr-3 grow border-t border-dotted border-gray-400"
                    aria-hidden="true"
                  />
                  <div className="text-gray-400">
                    Or, sign in with your email
                  </div>
                  <div
                    className="ml-3 grow border-t border-dotted border-gray-400"
                    aria-hidden="true"
                  />
                </div>
              </>
            )}

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSignIn)}
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
                          disabled={needsPasswordVerification}
                          className={
                            needsPasswordVerification ? "bg-gray-50" : ""
                          }
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
                            placeholder="********"
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

                <div className="flex justify-end">
                  <Link
                    href="/reset-password"
                    className="text-gray-800 transition duration-150 ease-in-out hover:text-mivro-green"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full rounded-md"
                  disabled={isSubmitting}
                  isLoading={isSubmitting}
                >
                  {isSubmitting ? "Signing in..." : "Sign In"}
                </Button>

                {errorMessage && (
                  <p className="text-center text-red-500">{errorMessage}</p>
                )}
              </form>
            </Form>

            <div className="mt-6 text-center text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href={isExtension ? "/signup?source=extension" : "/signup"}
                className="text-gray-800 transition duration-150 ease-in-out hover:text-mivro-green"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
