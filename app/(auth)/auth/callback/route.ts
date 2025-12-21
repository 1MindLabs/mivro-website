import { setAuthCookie } from "@/utils/firebase/auth-helpers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const token = searchParams.get("token");
  const next = searchParams.get("next") ?? "/dashboard";
  let authError = "";

  if (token) {
    try {
      await setAuthCookie(token);
      return NextResponse.redirect(`${origin}${next}`);
    } catch (error: any) {
      authError = error?.message ?? "Error setting auth cookie";
    }
  } else {
    authError = "No auth token in params";
  }

  return NextResponse.redirect(
    `${origin}/auth/auth-code-error?error=${authError}`,
  );
}
