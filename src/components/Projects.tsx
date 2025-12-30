'use client';
import { projects } from '@/data/projects';
import { useState } from 'react';
import Image from 'next/image';

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section className="flex">
      <div className='w-full relative overflow-hidden max-[991px]:hidden'>
        {hoveredProject !== null && projects[hoveredProject].imgUrl && (
          <Image
            src={`/${projects[hoveredProject].imgUrl}`}
            alt={projects[hoveredProject].title}
            width={380}
            height={380}
            className="object-cover"
          />
        )}
      </div>
      <div className="flex flex-col divide-y divide-gray-600 w-full min-[992px]:min-w-102/200">
        {projects.map((project, index) => (
          <div 
            key={index} 
            className="py-4 first:pt-0 flex justify-between items-start"
            onMouseEnter={() => setHoveredProject(index)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            <div>
              <h3 className="font-semibold">{project.title}</h3>
              <p className="text-gray-400 text-base">{project.category}</p>
            </div>
            <div className="flex items-center justify-between">
              <span className="">{project.year}</span>
            </div>
          </div>
        ))}
        <div className="py-3 text-center">
          <a href="#" className="text-gray-400 hover:text-white text-base transition-colors">
            See more →
          </a>
        </div>
      </div>
    </section>
  );
}
