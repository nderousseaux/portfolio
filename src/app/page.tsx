import Projects from '@/app/Projects';
import { getHomeData } from '@/services/homeService';
import { getProjects } from '@/services/projectsService';
import LocationTooltip from '@/components/LocationTooltip';

export default async function Page() {
  const homeData = await getHomeData();
  const projects = await getProjects();
  return (
    <>
      <div className="inline lg:relative lg:-top-10 lg:left-0">
        <section className="">
          {/* Comment br when an item is add to nav */}
          <div className="hidden lg:block">
            <br />
            <br />
            <br />
            <br />
            <br />
          </div> 
          <div className="max-w-full xs:max-w-content-xs sm-md:max-w-content-sm 2xl:max-w-content-lg">
            <p className="description-text">
              {homeData.description}
            </p>
          </div>
          <span className="text-sm text-gray-500 block pt-3 text-right md:text-left">
            <LocationTooltip location={homeData.location} />
          </span>
          <br />
        </section>
      </div>
      <div 
        className="inline lg:absolute lg:top-8 lg:right-0 lg:w-[51%] lg:pointer-events-none"
      >
        <section className="flex flex-col items-start">
          <h2 className="lg:pointer-events-auto">(What&#39;s make me)</h2>
          <br />
          {homeData.whatsmakeme.map((skill, index) => (
            <p key={index} className="lg:pointer-events-auto">{skill}</p>
          ))}
          <br />
        </section>
      </div>

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