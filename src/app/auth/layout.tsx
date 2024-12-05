import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessionResponse = await getSession();
  if (sessionResponse?.user) {
    redirect("/dashboard");
  }
  return <div className="flex h-screen w-screen items-center justify-center">{children}</div>;
}
