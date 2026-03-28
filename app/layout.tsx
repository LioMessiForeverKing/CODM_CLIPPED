import type { Metadata } from "next";
import { Barlow_Condensed, Inter, JetBrains_Mono } from "next/font/google";
import { ConvexClientProvider } from "@/lib/providers";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-data",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Clipped — CODM Loadout Leaderboard",
  description:
    "Discover, build, and rank the best Call of Duty: Mobile loadouts by season. Real weapon stats, community-voted builds.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-bg text-white font-body antialiased min-h-screen">
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
