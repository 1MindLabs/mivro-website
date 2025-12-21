import { setAuthCookie } from "@/utils/firebase/auth-helpers";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const next = searchParams.get("next") ?? "/dashboard";
  const redirectUrl = searchParams.get("redirectUrl");

  const redirectTo = request.nextUrl.clone();

  if (redirectUrl) {
    const decodedRedirectUrl = decodeURIComponent(redirectUrl);
    redirectTo.href = decodedRedirectUrl;
  } else {
    redirectTo.pathname = next;
  }

  redirectTo.searchParams.delete("token");
  redirectTo.searchParams.delete("next");
  redirectTo.searchParams.delete("redirectUrl");

  if (token) {
    try {
      await setAuthCookie(token);
      return NextResponse.redirect(redirectTo);
    } catch (error) {}
  }

  redirectTo.pathname = "/signin?message=cannot-verify-token";
  return NextResponse.redirect(redirectTo);
}
