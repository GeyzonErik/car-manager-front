import LoginForm from "@/components/auth/LoginForm";
import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const authenticated = await isAuthenticated();

  if (authenticated) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoginForm />
    </main>
  );
}
