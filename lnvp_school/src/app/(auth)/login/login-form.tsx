
"use client";

import { useState, type FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        redirectTo: "/admin",
      });

      if (!result || result.error) {
        setError("Invalid email or password.");
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="email" className="mb-2 block font-medium">
          Email address
        </label>

        <input
          id="email"
          type="email"
          autoComplete="username"
          required
          maxLength={254}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3 text-[var(--color-foreground)]"
          placeholder="admin@example.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-2 block font-medium">
          Password
        </label>

        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          maxLength={128}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3 text-[var(--color-foreground)]"
          placeholder="Enter your password"
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-[var(--color-brand)] p-3 font-semibold text-white disabled:opacity-60"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
