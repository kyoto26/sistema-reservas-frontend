"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login, register } from "@/lib/api";
import SoccerVideo from "../_components/SoccerVideo";

export default function RegistroPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await register(name, email, password);
      await login(email, password);
      router.push("/");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "No se pudo completar el registro",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-1 items-center justify-center gap-8 bg-brand-black px-6 py-16 text-white">
      <div className="flex flex-col items-center justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
          <h1 className="text-2xl font-semibold">Registrarse</h1>

          <div className="space-y-1">
            <label htmlFor="name" className="text-sm font-medium">
              Nombre
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="text-sm font-medium">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-brand-violet px-5 py-2.5 font-medium text-white transition-colors hover:bg-brand-violet/85 disabled:opacity-60"
          >
            {loading ? "Registrando..." : "Registrarse"}
          </button>

          <p className="text-center text-sm text-zinc-500">
            ¿Ya tenés cuenta?{" "}
            <Link href="/login" className="font-medium text-brand-violet">
              Iniciá sesión
            </Link>
          </p>
        </form>
      </div>

      <div className="hidden aspect-video w-72 shrink-0 overflow-hidden md:block">
        <SoccerVideo />
      </div>
    </main>
  );
}
