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

export default function SignUpPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <GoogleOAuthButton />
        </div>
      </CardContent>
      <CardFooter>
        Already have an account?{" "}
        <Link href="/auth/signin">
          <Button variant="link">Sign In</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
