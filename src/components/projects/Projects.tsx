'use client';
import { getProjects } from '@/services/projectsService';
import { useState, useEffect } from 'react';
import type { Project } from '@/types';
import ScrambleLink from '@/components/effects/ScrambleLink';
import { useScramble } from '@/hooks/useScramble';
import GlitchImage from '@/components/effects/GlitchImage';

function ProjectItem({ project }: { project: Project }) {
  const title = useScramble(project.title);
  const category = useScramble(project.category);
  const year = useScramble(project.year);

  const handleMouseEnter = () => {
    title.startScramble();
    category.startScramble();
    year.startScramble();
  };

  const handleMouseLeave = () => {
    title.stopScramble();
    category.stopScramble();
    year.stopScramble();
  };

  return (
    <a 
      href={project.link || '#'}
      className="pt-4 mb-4 flex justify-between items-start border-t border-gray-600 hover:border-white transition-colors cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div>
        <h3 className="font-semibold">{title.displayText}</h3>
        <p className="text-gray-400 text-base">{category.displayText}</p>
      </div>
      <div className="flex items-center justify-between">
        <span className="">{year.displayText}</span>
      </div>
    </a>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [hoveredProject, setHoveredProject] = useState<number>(0);
  const [previousProject, setPreviousProject] = useState<number>(0);
  const [triggerGlitch, setTriggerGlitch] = useState(false);

  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  const handleProjectHover = (index: number) => {
    if (index !== hoveredProject) {
      setPreviousProject(hoveredProject);
      setHoveredProject(index);
      setTriggerGlitch(true);
      setTimeout(() => setTriggerGlitch(false), 50);
    } else {
      setTriggerGlitch(true);
      setTimeout(() => setTriggerGlitch(false), 50);
    }
  };

  return (
    <section className="flex">
      <div className='w-full relative overflow-hidden max-[992px]:opacity-0 max-[992px]:max-h-0 max-[992px]:w-0'>
        {projects[hoveredProject]?.imgUrl && (
          <GlitchImage
            src={`/${projects[hoveredProject].imgUrl}`}
            alt={projects[hoveredProject].title}
            width={380}
            height={380}
            className="object-cover"
            previousSrc={previousProject !== hoveredProject ? `/${projects[previousProject].imgUrl}` : undefined}
            previousAlt={projects[previousProject]?.title}
            triggerGlitch={triggerGlitch}
            glitchConfig={{
              enablePeriodic: true,
              enableHover: true,
              enableOnReveal: true,
              periodicMin: 3000,
              periodicMax: 5000,
              periodicIntensity: 'subtle',
              manualIntensity: 'normal',
            }}
          />
        )}
      </div>
      <div className="flex flex-col  w-full min-[992px]:min-w-102/200">
        {projects.map((project, index) => (
          <div 
            key={index}
            onMouseEnter={() => handleProjectHover(index)}
          >
            <ProjectItem project={project} />
          </div>
        ))}
        <ScrambleLink href="#" className="py-4 text-center border-t border-gray-600 hover:border-white transition-colors text-gray-400 hover:text-white text-base flex justify-center items-center">
          See more →
        </ScrambleLink>
      </div>
    </section>
  );
}
