import Projects from '@/components/projects/Projects';
import WhatsMakeMe from '@/components/home/WhatsMakeMe';
import { getHomeData } from '@/services/homeService';
import { getProjects } from '@/services/projectsService';

export default async function Page() {
  const homeData = await getHomeData();
  const projects = await getProjects();
  return (
    <>
      <div className="inline lg:relative lg:-top-10 lg:left-0">
        <section className="max-w-full xs:max-w-content-xs sm-md:max-w-content-sm 2xl:max-w-content-lg">
          {/* Comment br when an item is add to nav */}
          <div className="hidden lg:block">
            <br />
            <br />
            <br />
            <br />
            <br />
          </div> 
          <p className="description-text">
            {homeData.description}
          </p>
          <br />
        </section>
      </div>
      <WhatsMakeMe skills={homeData.whatsmakeme} />

      <Projects projects={projects} />
      <div className="mt-4 inline lg:ml-[49%]">
        <section>
          <p className="description-text">
            To be honest, I&apos;m not really sure
            <br className="hidden xs:inline" /> the purpose of this website is.
            <br className="hidden xs:inline" /> If you dig a bit, maybe you&apos;ll find
            <br className="hidden xs:inline" /> something useful — who knows? In the
            <br className="hidden xs:inline" />
            meantime, it&apos;s just a nice place to 
            <br className="hidden xs:inline" /> feed my ego.
          </p>
          <br />
        </section>
      </div>
    </>
  );
}