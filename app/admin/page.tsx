"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { isAdmin, subscribeToAuthChanges } from "@/lib/api";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import ReservationsTab from "./_components/ReservationsTab";
import CourtsTab from "./_components/CourtsTab";

function getServerSnapshot() {
  return false;
}

export default function AdminPage() {
  const router = useRouter();
  const { dict } = useLanguage();
  const admin = useSyncExternalStore(
    subscribeToAuthChanges,
    isAdmin,
    getServerSnapshot,
  );
  const TABS = [
    { key: "reservations", label: dict.admin.tabs.reservations },
    { key: "courts", label: dict.admin.tabs.courts },
  ] as const;
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("reservations");

  useEffect(() => {
    if (!admin) {
      router.replace("/");
    }
  }, [admin, router]);

  if (!admin) {
    return null;
  }

  return (
    <main className="flex-1 px-6 py-10">
      <h1 className="text-2xl font-semibold">{dict.admin.title}</h1>

      <div className="mt-6 flex gap-2 border-b border-zinc-200 dark:border-zinc-800">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`-mb-px border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
              tab === t.key
                ? "border-brand-violet text-brand-violet"
                : "border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "reservations" ? <ReservationsTab /> : <CourtsTab />}
    </main>
  );
}
