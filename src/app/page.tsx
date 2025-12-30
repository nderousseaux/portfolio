import Projects from '@/components/Projects';
import { getHomeData } from '@/services/homeService';

export default async function Page() {
  const homeData = await getHomeData();
  return (
    <>
      <div className="inline min-[992px]:relative min-[992px]:top-[-40px] min-[992px]:left-0">
        <section>
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
        </section>
      </div>
      <div className="inline min-[992px]:absolute min-[992px]:top-[32px] min-[992px]:right-0 min-[992px]:w-102/200">
        <section className="flex flex-col items-start">
          <h2>(What&#39;s make me)</h2>
          <br />
          {homeData.whatsmakeme.map((skill, index) => (
            <p key={index}>{skill}</p>
          ))}
          <br />
        </section>
      </div>

      <Projects />
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