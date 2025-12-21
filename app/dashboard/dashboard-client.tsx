"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardClient() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isExtension = searchParams.get("source") === "extension";
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

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (isExtension && extensionReady && user) {
      setTimeout(() => {
        window.close();
      }, 2000);
    }
  }, [isExtension, extensionReady, user]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Sign In Required</h1>
          <p className="text-muted-foreground">
            Please sign in to access the dashboard
          </p>
        </div>
      </div>
    );
  }

  if (isExtension) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block rounded-full bg-green-100 p-4">
            <svg
              className="h-12 w-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">Already Signed In!</h1>
          <p className="text-muted-foreground">
            You're already authenticated. This window will close
            automatically...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Coming Soon</h1>
      </div>
    </div>
  );
}
