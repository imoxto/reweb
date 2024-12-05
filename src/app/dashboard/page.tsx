import { getSession } from "@/lib/auth";

export default async function DashboardPage() {
  const sessionResponse = await getSession();
  return <h1>Hi! {sessionResponse!.user.name}</h1>;
}
