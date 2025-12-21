"use server";

import { removeAuthCookie, setAuthCookie } from "@/utils/firebase/auth-helpers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function setAuthToken(token: string) {
  try {
    await setAuthCookie(token);
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Failed to set auth token",
    };
  }
}

export async function signOut() {
  try {
    await removeAuthCookie();
    revalidatePath("/", "layout");
  } catch (error: any) {}
  redirect("/");
}

export async function revalidateLayout() {
  revalidatePath("/", "layout");
}
