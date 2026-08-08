import type { Metadata } from "next";
import { Ma_Shan_Zheng, Space_Grotesk } from "next/font/google";
import Header from "./_components/Header";
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

export const metadata: Metadata = {
  title: "Sistema de Reservas",
  description: "Reservá canchas en línea",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${maShanZheng.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
      </body>
    </html>
  );
}
