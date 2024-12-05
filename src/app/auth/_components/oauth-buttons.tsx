'use client'
import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/lib/auth-client";

export default function GoogleOAuthButton() {
  return <Button onClick={() => signInWithGoogle()}>Sign in with Google</Button>;
}

