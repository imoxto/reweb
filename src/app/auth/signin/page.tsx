import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import GoogleOAuthButton from "../_components/oauth-buttons";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const sessionResponse = await getSession();
  if (sessionResponse?.user) {
    redirect("/dashboard");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <GoogleOAuthButton />
        </div>
      </CardContent>
      <CardFooter>
        Don&apos;t have an account?{" "}
        <Link href="/auth/signup">
          <Button variant="link">Sign Up</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
