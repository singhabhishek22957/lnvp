
import { ThemeToggle } from "@/components/theme/theme-toggle";

export default function Home() {
  return (
    <main className="container-shell py-10">
      <header className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold brand-text">
          EduRevive
        </h1>

        <ThemeToggle />
      </header>

      <section className="surface mt-10 p-8">
        <h2 className="text-3xl font-bold">
          Help a School Rise Again
        </h2>

        <p className="text-muted mt-4">
          Revive Schools. Restore Futures.
        </p>

        <button className="theme-toggle mt-6">
          Test Button
        </button>
      </section>
    </main>
  );
}
