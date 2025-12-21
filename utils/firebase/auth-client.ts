"use client";

import {
  createUserWithEmailAndPassword,
  updateEmail as firebaseUpdateEmail,
  GithubAuthProvider,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "./client";

export async function signInWithEmail(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const token = await userCredential.user.getIdToken();

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
    } catch (backendError) {
      console.error("Backend sign-in error:", backendError);
    }

    return { success: true, token };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to sign in" };
  }
}

export async function signUpWithEmail(
  email: string,
  password: string,
  name: string,
) {
  try {
    const backendResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      },
    );

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json();
      return { success: false, error: errorData.error || "Failed to sign up" };
    }

    let userCredential;
    try {
      userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
    } catch (authError: any) {
      if (authError.code === "auth/email-already-in-use") {
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );
      } else {
        throw authError;
      }
    }

    await updateProfile(userCredential.user, {
      displayName: name,
    });

    const token = await userCredential.user.getIdToken();

    return { success: true, token };
  } catch (error: any) {
    if (error.code === "auth/email-already-in-use") {
      return { success: false, error: "Email already in use", exists: true };
    }
    return { success: false, error: error.message || "Failed to sign up" };
  }
}

export async function signInWithOAuthProvider(provider: "google" | "github") {
  try {
    let authProvider;
    if (provider === "google") {
      authProvider = new GoogleAuthProvider();
      if (process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
        authProvider.setCustomParameters({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        });
      }
    } else {
      authProvider = new GithubAuthProvider();
      if (process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID) {
        authProvider.setCustomParameters({
          client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
        });
      }
    }

    const result = await signInWithPopup(auth, authProvider);
    const token = await result.user.getIdToken();

    return { success: true, token };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Failed to sign in with OAuth",
    };
  }
}

export async function sendPasswordReset(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Failed to send reset email",
    };
  }
}

export async function updateUserPassword(password: string) {
  try {
    const user = auth.currentUser;
    if (!user) {
      return { success: false, error: "No user logged in" };
    }

    await updatePassword(user, password);
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Failed to update password",
    };
  }
}

export async function updateUserEmail(email: string) {
  try {
    const user = auth.currentUser;
    if (!user) {
      return { success: false, error: "No user logged in" };
    }

    await firebaseUpdateEmail(user, email);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update email" };
  }
}

export async function updateUserDisplayName(name: string) {
  try {
    const user = auth.currentUser;
    if (!user) {
      return { success: false, error: "No user logged in" };
    }

    await updateProfile(user, {
      displayName: name,
    });

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Failed to update profile",
    };
  }
}

export async function resendVerificationEmail() {
  try {
    const user = auth.currentUser;
    if (!user) {
      return { success: false, error: "No user logged in" };
    }

    await sendEmailVerification(user);
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Failed to send verification email",
    };
  }
}
