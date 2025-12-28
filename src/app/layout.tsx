import type { Viewport } from "next";
import { metadata } from "@/../metadata";
import "@/style/globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export { metadata };


export default function RootLayout({
  children,
}: Readonly<{
children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="bg-black text-white font-mono leading-normal tracking-tight antialiased overflow-x-hidden m-4">
          {children}
      </body>
    </html>
  );
}