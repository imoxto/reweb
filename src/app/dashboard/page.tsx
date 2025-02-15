import { getSession } from "@/lib/auth";

export default async function DashboardPage() {
  const sessionResponse = await getSession();
  return (
    <main className="p-8">
      <h1>Hello {sessionResponse!.user.name}!</h1>
    </main>
  );
}
