import type { Metadata } from "next";
import { Ma_Shan_Zheng, Space_Grotesk } from "next/font/google";
import Header from "./_components/Header";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { getServerLanguage } from "@/lib/i18n/getServerLanguage";
import { dictionaries } from "@/lib/i18n/translations";
import "./globals.css";

const maShanZheng = Ma_Shan_Zheng({
  variable: "--font-heading-src",
  weight: "400",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-body-src",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const language = await getServerLanguage();
  const dict = dictionaries[language];
  return {
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const language = await getServerLanguage();

  return (
    <html
      lang={language}
      className={`${maShanZheng.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider initialLanguage={language}>
          <Header />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
