import Description from '@/components/Description';
import Footer from '@/components/Footer';
import Logo from '@/components/Logo';
import Nav from '@/components/Nav';
import Projects from '@/components/Projects';
import TextEnd from '@/components/TextEnd';
import WhatIAm from '@/components/WhatIAm';

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col gap-16">
      <header className="w-full flex justify-between items-start">
        <Logo />
        <Nav />
      </header>
      <Description />
      <WhatIAm />
      <Projects />
      <TextEnd />
      <Footer />
    </div>
  );
}