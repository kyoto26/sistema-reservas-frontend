"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clearToken, isAdmin, isLoggedIn, subscribeToAuthChanges } from "@/lib/api";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

function getServerSnapshot() {
  return false;
}

export default function Header() {
  const router = useRouter();
  const { dict } = useLanguage();
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
    <header className="flex items-center justify-between border-b border-brand-violet/30 bg-brand-black px-6 py-4">
      <Link href="/" className="font-heading text-2xl text-white">
        {dict.header.brand}
      </Link>
      <nav className="flex items-center gap-3 text-sm font-medium">
        {loggedIn ? (
          <>
            <Link
              href="/mis-reservas"
              className="rounded-full px-4 py-2 text-zinc-300 transition-colors hover:bg-white/10"
            >
              {dict.header.nav.myReservations}
            </Link>
            {admin && (
              <Link
                href="/admin"
                className="rounded-full px-4 py-2 text-zinc-300 transition-colors hover:bg-white/10"
              >
                {dict.header.nav.admin}
              </Link>
            )}
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full px-4 py-2 text-zinc-300 transition-colors hover:bg-white/10"
            >
              {dict.header.nav.logout}
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="rounded-full px-4 py-2 text-zinc-300 transition-colors hover:bg-white/10"
            >
              {dict.header.nav.login}
            </Link>
            <Link
              href="/registro"
              className="rounded-full bg-brand-violet px-4 py-2 text-white transition-colors hover:bg-brand-violet/85"
            >
              {dict.header.nav.register}
            </Link>
          </>
        )}
        <LanguageSwitcher />
      </nav>
    </header>
  );
}
