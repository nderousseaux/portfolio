import type { Viewport } from "next";
import { metadata } from "@/../metadata";
import "@/style/globals.css";
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ResizeTransition from '@/components/ResizeTransition';

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
      <body className="
      bg-black
      antialiased
      text-white font-mono

      w-full
      min-[1420px]:max-w-350
      min-[1200px]:max-w-295
      min-[992px]:max-w-255
      max-w-192.5
      mx-auto

      min-[1420px]:text-[20px]
      min-[1420px]:leading-7
      
      min-[750px]:text-[18px]
      min-[750px]:leading-6

      text-[16px]
      leading-5.25
      font-weight-[400]
      tracking-tight
      

      min-[750px]:mt-7.75
      mt-5.25
      mb-5

      min-[810px]:px-2.5
      px-5
      ">
          <ResizeTransition />
          <div className="w-full flex flex-col gap-6">
            <Nav />
            {children}
            <Footer />
          </div>
      </body>
    </html>
  );
}