import { projects } from '@/data/projects';

export default function Projects() {
  return (
    <section>
      <div className="flex flex-col divide-y divide-gray-600">
        {projects.map((project, index) => (
          <div key={index} className="py-4 first:pt-0 flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p className="text-gray-400">{project.category}</p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg">{project.year}</span>
            </div>
          </div>
        ))}
        <div className="py-4 text-center">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            See more →
          </a>
        </div>
      </div>
    </section>
  );
}
