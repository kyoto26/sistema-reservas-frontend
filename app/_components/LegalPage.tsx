"use client";

import type { ReactNode } from "react";

const CONTACT_EMAIL = "kyoto2617@gmail.com";

function withMailtoLink(text: string): ReactNode {
  if (!text.includes(CONTACT_EMAIL)) return text;
  const [before, after] = text.split(CONTACT_EMAIL);
  return (
    <>
      {before}
      <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand-violet underline">
        {CONTACT_EMAIL}
      </a>
      {after}
    </>
  );
}

export default function LegalPage({
  title,
  sections,
}: {
  title: string;
  sections: { heading: string; body: string }[];
}) {
  return (
    <main className="flex-1 px-6 py-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <div className="mt-8 space-y-8">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-lg font-semibold">{section.heading}</h2>
              <p className="mt-2 leading-relaxed text-zinc-500">
                {withMailtoLink(section.body)}
              </p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
