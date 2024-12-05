import { Banner } from "@/components/branding";
import { ThemeToggler } from "@/components/theme/toggler";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/auth";
import Link from "next/link";

export default async function Navbar() {
  const sessionResponse = await getSession();
  return (
    <header className="flex py-6 shadow-xl shadow-foreground/10 fixed top-0 w-full z-10 bg-background/95">
      <nav className="flex items-center gap-10 container font-semibold">
        <Link href="/" className="mr-auto">
          <Banner />
        </Link>
        <Link className="text-lg" href="#">
          Features
        </Link>
        <Link className="text-lg" href="/#pricing">
          Pricing
        </Link>
        <Link className="text-lg" href="#">
          About
        </Link>
        <div className="flex items-center gap-2">
          {sessionResponse?.user ? (
            <Link href="/dashboard">
              <Button>Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link href="/auth/signin">
                <Button>Login</Button>
              </Link>
              <Link href="/auth/signup">
                <Button variant="outline">Sign Up</Button>
              </Link>
            </>
          )}
          <ThemeToggler />
        </div>
      </nav>
    </header>
  );
}
