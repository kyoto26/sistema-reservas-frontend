"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clearToken, isAdmin, isLoggedIn, subscribeToAuthChanges } from "@/lib/api";

function getServerSnapshot() {
  return false;
}

export default function Header() {
  const router = useRouter();
  const loggedIn = useSyncExternalStore(
    subscribeToAuthChanges,
    isLoggedIn,
    getServerSnapshot,
  );
  const admin = useSyncExternalStore(
    subscribeToAuthChanges,
    isAdmin,
    getServerSnapshot,
  );

  function handleLogout() {
    clearToken();
    router.push("/");
  }

  return (
    <header className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
      <Link href="/" className="text-lg font-semibold">
        Sistema de Reservas
      </Link>
      <nav className="flex items-center gap-3 text-sm font-medium">
        {loggedIn ? (
          <>
            <Link
              href="/mis-reservas"
              className="rounded-full px-4 py-2 text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Mis reservas
            </Link>
            {admin && (
              <Link
                href="/admin"
                className="rounded-full px-4 py-2 text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                Admin
              </Link>
            )}
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full px-4 py-2 text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="rounded-full px-4 py-2 text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Iniciar sesión
            </Link>
            <Link
              href="/registro"
              className="rounded-full bg-emerald-700 px-4 py-2 text-white transition-colors hover:bg-emerald-800"
            >
              Registrarse
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
