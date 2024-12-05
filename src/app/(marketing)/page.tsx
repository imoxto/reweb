import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  return (
    <section className="min-h-screen bg-[radial-gradient(hsl(0,72%,65%,40%),hsl(24,62%,73%,40%),hsl(var(--background))_60%)] flex items-center justify-center text-center text-balance flex-col gap-8 px-4">
      <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight m-4">
        Simple web tools for your business
      </h1>
      <p className="text-lg lg:text-3xl max-w-screen-xl">
        Optimize your business with simple web tools
      </p>
      <Link href="/auth/signup">
        <Button className="text-lg p-6 rounded-xl flex gap-2">
          Get started for free <ArrowRightIcon className="size-5" />
        </Button>
      </Link>
    </section>
  );
}
