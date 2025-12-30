import type { Project } from '@/types';
import { projects } from '@/data/projects';

/**
 * Service pour récupérer la liste des projets
 * 
 * À terme, cette fonction effectuera un appel API externe
 * Pour l'instant, elle retourne les données locales
 */
export async function getProjects(): Promise<Project[]> {
  // TODO: Remplacer par un appel API
  // const response = await fetch('/api/projects');
  // return response.json();
  
  return projects;
}

/**
 * Service pour récupérer un projet par son titre
 * 
 * À terme, cette fonction effectuera un appel API externe
 * Pour l'instant, elle filtre les données locales
 */
export async function getProjectByTitle(title: string): Promise<Project | undefined> {
  // TODO: Remplacer par un appel API
  // const response = await fetch(`/api/projects/${encodeURIComponent(title)}`);
  // return response.json();
  
  return projects.find(project => project.title === title);
}
