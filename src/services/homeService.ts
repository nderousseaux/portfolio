import type { HomeData } from '@/types';
import { homeData } from '@/data/home';

/**
 * Service pour récupérer les données de la page d'accueil
 * 
 * À terme, cette fonction effectuera un appel API externe
 * Pour l'instant, elle retourne les données locales
 */
export async function getHomeData(): Promise<HomeData> {
  // TODO: Remplacer par un appel API
  // const response = await fetch('/api/home');
  // return response.json();
  
  return homeData;
}
