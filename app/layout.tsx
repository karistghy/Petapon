import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Petapon ♡ community gachapon",
  description: "A tiny retro community-powered photo gachapon.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}