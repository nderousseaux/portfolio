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
        bg-black antialiased text-white font-mono
        w-full mx-auto
        max-w-192-5 lg:max-w-255 xl:max-w-295 2xl:max-w-350
        text-[16px] leading-5-25 sm-md:text-[18px] sm-md:leading-6 2xl:text-[20px] 2xl:leading-7
        font-normal tracking-tight
        mt-5-25 sm-md:mt-7-75 mb-5
        px-5 md:px-2-5
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