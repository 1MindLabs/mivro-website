"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DashboardClient() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isExtension = searchParams.get("source") === "extension";
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [password, setPassword] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!isExtension || !user) return;

    const storedAuth = localStorage.getItem("mivro_extension_auth");

    if (storedAuth) {
      try {
        const authData = JSON.parse(storedAuth);

        window.postMessage(
          {
            type: "MIVRO_AUTH_SUCCESS",
            email: authData.email,
            password: authData.password,
            name: authData.name,
          },
          window.location.origin,
        );

        setTimeout(() => {
          window.postMessage(
            { type: "MIVRO_CLOSE_WINDOW" },
            window.location.origin,
          );
        }, 1500);
      } catch (error) {
        console.error("Failed to parse stored auth:", error);
      }
    } else {
      setShowPasswordPrompt(true);
    }
  }, [isExtension, user]);

  const handlePasswordSubmit = async () => {
    if (!user?.email || !password) return;

    setIsVerifying(true);
    setError(null);

    try {
      const { signInWithEmail } = await import("@/utils/firebase/auth-client");
      const result = await signInWithEmail(user.email, password);

      if (result.success) {
        const displayName = user.displayName || user.email.split("@")[0];

        window.postMessage(
          {
            type: "MIVRO_AUTH_SUCCESS",
            email: user.email,
            password: password,
            name: displayName,
          },
          window.location.origin,
        );

        localStorage.setItem(
          "mivro_extension_auth",
          JSON.stringify({
            email: user.email,
            password: password,
            name: displayName,
          }),
        );

        setTimeout(() => {
          window.postMessage(
            { type: "MIVRO_CLOSE_WINDOW" },
            window.location.origin,
          );
        }, 1000);
      } else {
        setError(result.error || "Invalid password");
      }
    } catch (error) {
      setError("Failed to verify password");
    } finally {
      setIsVerifying(false);
    }
  };

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

  if (isExtension && showPasswordPrompt) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6 rounded-lg border border-gray-300 bg-white p-8 shadow-lg">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Verify Your Password</h1>
            <p className="text-muted-foreground text-sm">
              To sync with the extension, please confirm your password
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={user?.email || ""}
                disabled
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handlePasswordSubmit();
                }}
                placeholder="Enter your password"
                disabled={isVerifying}
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button
              onClick={handlePasswordSubmit}
              disabled={isVerifying || !password}
              className="w-full"
            >
              {isVerifying ? "Verifying..." : "Verify & Sync"}
            </Button>
          </div>
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
