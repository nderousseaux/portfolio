import type { HomeData } from '@/types';
import { promises as fs } from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { geocodeCity } from './geocodingService';

interface MeYaml {
  short_pres: string;
  interests: string[];
  actual_location: string;
}

/**
 * Service pour récupérer les données de la page d'accueil
 * Charge les données depuis le fichier YAML me.yaml
 */
export async function getHomeData(): Promise<HomeData> {
  const yamlPath = path.join(process.cwd(), 'src', 'data', 'me.yaml');
  const fileContents = await fs.readFile(yamlPath, 'utf8');
  const data = yaml.load(fileContents) as MeYaml;
  
  // Geocoder la ville pour obtenir les coordonnées
  const coordinates = await geocodeCity(data.actual_location);
  
  return {
    description: data.short_pres,
    whatsmakeme: data.interests,
    location: {
      name: data.actual_location,
      coordinates,
    },
  };
}
