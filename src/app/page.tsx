import Projects from '@/components/projects/Projects';
import WhatsMakeMe from '@/components/home/WhatsMakeMe';
import { getHomeData } from '@/services/homeService';
import { getProjects } from '@/services/projectsService';

export default async function Page() {
  const homeData = await getHomeData();
  const projects = await getProjects();
  return (
    <>
      <div className="inline min-[992px]:relative min-[992px]:top-[-40px] min-[992px]:left-0">
        <section className="max-w-full min-[1420px]:max-w-[31rem] min-[750px]:max-w-[28rem] min-[440px]:max-w-[24.5rem]">
          <p className="description-text">
            {homeData.description}
          </p>
          <br />
        </section>
        {/* <section>
          <p className="description-text">
            Hello, I&apos;m Nathanaël. I write code and
            <br className="hidden min-[440px]:inline" /> manage cloud systems.
            Currently working 
            <br className="hidden min-[440px]:inline" /> as a cloud engineer at the University of
            <br className="hidden min-[440px]:inline" /> Strasbourg, teaching part-time and 
            <br className="hidden min-[440px]:inline" />
            developing web projects as an independent
            <br className="hidden min-[440px]:inline" /> software engineer.
          </p>
          <br />
        </section> */}

      </div>
      <WhatsMakeMe skills={homeData.whatsmakeme} />

      <Projects projects={projects} />
      <div className="mt-4 inline min-[992px]:ml-[49%]">
        <section>
          <p className="description-text">
            To be honest, I&apos;m not really sure
            <br className="hidden min-[440px]:inline" /> the purpose of this website is.
            <br className="hidden min-[440px]:inline" /> If you dig a bit, maybe you&apos;ll find
            <br className="hidden min-[440px]:inline" /> something useful — who knows? In the
            <br className="hidden min-[440px]:inline" />
            meantime, it&apos;s just a nice place to 
            <br className="hidden min-[440px]:inline" /> feed my ego.
          </p>
          <br />
        </section>
      </div>
    </>
  );
}