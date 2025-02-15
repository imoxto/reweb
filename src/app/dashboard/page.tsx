import { getSession } from "@/lib/auth";

export default async function DashboardPage() {
  const sessionResponse = await getSession();
  return (
    <main className="flex flex-col items-center justify-center h-screen w-screen">
      <h1>Hello {sessionResponse!.user.name}</h1>
    </main>
  );
}
