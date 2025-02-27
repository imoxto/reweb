import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  const sessionResponse = await getSession();
  if (!sessionResponse?.user) {
    redirect("/auth/signin");
  }
  return (
    <main className="p-8">
      <h1>Hello {sessionResponse!.user.name}!</h1>
      <Link href="/dashboard/projects">Click here to see your projects</Link>
    </main>
  );
}
