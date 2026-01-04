import type { Viewport } from "next";
import { metadata } from "@/../metadata";
import "@/globals.css";
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ResizeTransition from '@/utils/ResizeTransition';
import PageReveal from '@/components/effects/PageReveal';
import { getSocialLinks } from '@/services/socialsService';

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export { metadata };

export default async function RootLayout({
  children,
}: Readonly<{
children: React.ReactNode;
}>) {
  const navItems = [
    { label: 'Things I Made', href: '#', disabled: true },
    { label: 'Journey', href: '#', disabled: true },
    { label: 'Thoughts', href: '#', disabled: true },
  ];
  
  const externalLinks = [
    { label: 'MRS', href: '#', disabled: true },
    { label: 'Zia', href: '#', disabled: true },
  ];
  
  const socialLinks = await getSocialLinks();
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
          <PageReveal>
            <div className="w-full flex flex-col gap-6">
              <Nav navItems={navItems} externalLinks={externalLinks} />
              {children}
              <Footer socialLinks={socialLinks} />
            </div>
          </PageReveal>
      </body>
    </html>
  );
}