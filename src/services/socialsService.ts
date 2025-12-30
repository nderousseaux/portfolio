import type { SocialLink } from '@/types';
import { socialLinks } from '@/data/socials';

/**
 * Service pour récupérer les liens de réseaux sociaux
 * 
 * À terme, cette fonction effectuera un appel API externe
 * Pour l'instant, elle retourne les données locales
 */
export async function getSocialLinks(): Promise<SocialLink[]> {
  // TODO: Remplacer par un appel API
  // const response = await fetch('/api/socials');
  // return response.json();
  
  return socialLinks;
}
