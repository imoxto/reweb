import { createAuthClient } from "better-auth/react"
import { BASE_URL } from "./constants";

export const authClient = createAuthClient({
  baseURL: BASE_URL,
});

export async function signInWithGoogle() {
  await authClient.signIn.social({ provider: "google", callbackURL: "/" });
}