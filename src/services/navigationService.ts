import type { NavItem } from '@/types';
import { navItems, externalLinks } from '@/data/navigation';

/**
 * Service pour récupérer les éléments de navigation
 * 
 * À terme, cette fonction effectuera un appel API externe
 * Pour l'instant, elle retourne les données locales
 */
export async function getNavItems(): Promise<NavItem[]> {
  // TODO: Remplacer par un appel API
  // const response = await fetch('/api/navigation/items');
  // return response.json();
  
  return navItems;
}

/**
 * Service pour récupérer les liens externes
 * 
 * À terme, cette fonction effectuera un appel API externe
 * Pour l'instant, elle retourne les données locales
 */
export async function getExternalLinks(): Promise<NavItem[]> {
  // TODO: Remplacer par un appel API
  // const response = await fetch('/api/navigation/external');
  // return response.json();
  
  return externalLinks;
}
