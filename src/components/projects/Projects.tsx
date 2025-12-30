'use client';
import { getProjects } from '@/services/projectsService';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { Project } from '@/types';
import ScrambleLink from '@/components/ui/ScrambleLink';
import { useScramble } from '@/hooks/useScramble';

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
    <div 
      className="py-4 mt-4 first:pt-0 first:mt-0 flex justify-between items-start"
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
    </div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [hoveredProject, setHoveredProject] = useState<number>(0);
  const [previousProject, setPreviousProject] = useState<number>(0);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    getProjects().then(setProjects);
    
    // Écouter l'événement de révélation de l'image
    const handleImageReveal = () => {
      setIsGlitching(true);
      setTimeout(() => {
        setIsGlitching(false);
      }, 400);
    };
    
    window.addEventListener('project-image-revealed', handleImageReveal);
    
    return () => {
      window.removeEventListener('project-image-revealed', handleImageReveal);
    };
  }, []);

  const handleProjectHover = (index: number) => {
    if (index !== hoveredProject) {
      setPreviousProject(hoveredProject);
      setIsGlitching(true);
      setTimeout(() => {
        setHoveredProject(index);
      }, 150);
      setTimeout(() => {
        setIsGlitching(false);
      }, 400);
    }
  };

  return (
    <section className="flex">
      <div className='w-full relative overflow-hidden max-[992px]:opacity-0 max-[992px]:max-h-0 max-[992px]:w-0'>
        {projects[hoveredProject]?.imgUrl && (
          <div className={`glitch-container ${isGlitching ? 'active' : ''}`}>
            {/* Ancienne image pendant le glitch */}
            {isGlitching && projects[previousProject]?.imgUrl && (
              <>
                <Image
                  src={`/${projects[previousProject].imgUrl}`}
                  alt={projects[previousProject].title}
                  width={380}
                  height={380}
                  className="glitch-img glitch-old-1 object-cover"
                />
                <Image
                  src={`/${projects[previousProject].imgUrl}`}
                  alt={projects[previousProject].title}
                  width={380}
                  height={380}
                  className="glitch-img glitch-old-2 object-cover"
                />
              </>
            )}
            {/* Nouvelle image */}
            <Image
              src={`/${projects[hoveredProject].imgUrl}`}
              alt={projects[hoveredProject].title}
              width={380}
              height={380}
              className="glitch-img glitch-img-1 object-cover"
            />
            <Image
              src={`/${projects[hoveredProject].imgUrl}`}
              alt={projects[hoveredProject].title}
              width={380}
              height={380}
              className="glitch-img glitch-img-2 object-cover"
            />
            <Image
              src={`/${projects[hoveredProject].imgUrl}`}
              alt={projects[hoveredProject].title}
              width={380}
              height={380}
              className="glitch-img glitch-img-3 object-cover"
            />
          </div>
        )}
      </div>
      <div className="flex flex-col divide-y divide-gray-600 w-full min-[992px]:min-w-102/200 border-t border-gray-600">
        {projects.map((project, index) => (
          <div 
            key={index}
            className='mt-4'
            onMouseEnter={() => handleProjectHover(index)}
            onMouseLeave={() => handleProjectHover(index)}
          >
            <ProjectItem project={project} />
          </div>
        ))}
        <div className="py-3 text-center">
          <ScrambleLink href="#" className="text-gray-400 hover:text-white text-base transition-colors">
            See more →
          </ScrambleLink>
        </div>
      </div>
    </section>
  );
}
