"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const CONTACT_EMAIL = "kyoto2617@gmail.com";

export default function Footer() {
  const { dict } = useLanguage();

  return (
    <footer className="border-t border-brand-violet/30 bg-brand-black px-6 py-4 text-xs text-zinc-400">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3">
        <span>{dict.footer.tagline}</span>
        <nav className="flex flex-wrap items-center gap-4">
          <Link href="/privacidad" className="transition-colors hover:text-white">
            {dict.footer.privacyLink}
          </Link>
          <Link href="/terminos" className="transition-colors hover:text-white">
            {dict.footer.termsLink}
          </Link>
          <a href={`mailto:${CONTACT_EMAIL}`} className="transition-colors hover:text-white">
            {CONTACT_EMAIL}
          </a>
        </nav>
      </div>
    </footer>
  );
}
