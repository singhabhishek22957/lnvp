
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { LoginForm } from "./login-form";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user?.role === "admin") {
    redirect("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--color-background)] px-4 py-10">
      <section className="surface w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold brand-text">
            EduRevive
          </h1>

          <p className="mt-2 text-sm text-muted">
            Administration Portal
          </p>

          <h2 className="mt-7 text-2xl font-bold">
            Admin Sign In
          </h2>

          <p className="mt-2 text-sm text-muted">
            Sign in to manage school operations and donations.
          </p>
        </div>

        <LoginForm />
      </section>
    </main>
  );
}
