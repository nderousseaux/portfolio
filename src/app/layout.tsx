import type { Viewport } from "next";
import { metadata } from "@/../metadata";
import "@/style/globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export { metadata };

// {/* "
//       bg-black text-white font-mono 
//       leading-6 tracking-tight
//       sm:m-8 m-4
//       text-md 2xl:text-lg
//       flex justify-center
//       "> */}

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
      min-[1420px]:max-w-[1400px]
      min-[1200px]:max-w-[1180px]
      min-[992px]:max-w-[1020px]
      max-w-[794px]
      mx-auto

      min-[1420px]:text-[20px]
      min-[1420px]:leading-[28px]
      
      min-[750px]:text-[18px]
      min-[750px]:leading-[24px]


      text-[16px]
      leading-[21px]
      font-weight-[400]
      tracking-tight
      

      min-[750px]:mt-[31px]
      mt-[21px]
      mb-[20px]

      min-[810px]:px-[10px]
      px-[20px]
      ">
          {children}
      </body>
    </html>
  );
}