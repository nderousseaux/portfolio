import type { Project } from '@/types';
import { promises as fs } from 'fs';
import path from 'path';
import yaml from 'js-yaml';

/**
 * Service pour récupérer la liste des projets
 * Charge les données depuis le fichier YAML projects.yaml
 */
export async function getProjects(): Promise<Project[]> {
  const yamlPath = path.join(process.cwd(), 'src', 'data', 'projects.yaml');
  const fileContents = await fs.readFile(yamlPath, 'utf8');
  const projects = yaml.load(fileContents) as Project[];
  
  return projects;
}

/**
 * Service pour récupérer un projet par son titre
 * Charge les données depuis le fichier YAML et filtre par titre
 */
export async function getProjectByTitle(title: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find(project => project.title === title);
}
