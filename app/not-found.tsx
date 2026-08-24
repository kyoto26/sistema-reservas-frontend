"use client";

import Link from "next/link";
import PitchDiagram from "./_components/PitchDiagram";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function NotFound() {
  const { dict } = useLanguage();

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 bg-brand-black px-6 py-16 text-center text-white">
      <PitchDiagram lengthM={105} widthM={68} className="w-56 opacity-40" />
      <p className="text-7xl font-bold tracking-tight text-brand-violet sm:text-8xl">
        {dict.notFound.code}
      </p>
      <h1 className="font-heading text-3xl sm:text-4xl">{dict.notFound.title}</h1>
      <p className="max-w-sm text-zinc-400">{dict.notFound.message}</p>
      <Link
        href="/"
        className="mt-2 rounded-full bg-brand-violet px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-violet/85"
      >
        {dict.notFound.backButton}
      </Link>
    </main>
  );
}
