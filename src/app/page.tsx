import Description from '@/components/Description';
import Footer from '@/components/Footer';
import Logo from '@/components/Logo';
import Nav from '@/components/Nav';
import WhatIAm from '@/components/WhatIAm';
import Projects from '@/components/Projects';
import TextEnd from '@/components/TextEnd';


// export default function Page() {
//   return (
//     <div className="w-full md:max-w-3xl lg:max-w-6xl lg:w-full flex flex-col gap-16">
//       <header className="w-full flex justify-between items-start -mb-8">
//         <Logo />
//         <Nav />
//       </header>
//       <div className="lg:-translate-y-16">
//         <Description />
//       </div>
//       <div className='lg:absolute lg:top-6 lg:right-0 lg:w-11/20'>
//         <WhatIAm />
//       </div>
//       <div className="lg:ml-[45%]">
//       <Projects />
//       <TextEnd />
//       </div>
//       <Footer />
//     </div>
//   );
// }

export default function Page() {
  return (
    <div className="w-full flex flex-col gap-6">
      <nav className="w-full flex justify-between items-start">
        <Logo />
        <Nav />
      </nav>
      <div className="inline min-[992px]:relative min-[992px]:top-[-40px] min-[992px]:left-0">
        <Description />
      </div>
      <div className="inline min-[992px]:absolute min-[992px]:top-[32px] min-[992px]:right-0 min-[992px]:w-102/200">
        <WhatIAm />
      </div>

      <Projects />
      <div className="mt-4 inline min-[992px]:ml-[49%]">
        <TextEnd />
      </div>
      <Footer />

    </div>
  );
}