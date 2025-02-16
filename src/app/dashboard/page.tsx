import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const sessionResponse = await getSession();
  if (!sessionResponse?.user) {
    redirect("/auth/signin");
  }
  return (
    <main className="p-8">
      <h1>Hello {sessionResponse!.user.name}!</h1>
    </main>
  );
}
