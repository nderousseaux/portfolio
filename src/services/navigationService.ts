import type { NavItem } from '@/types';

/**
 * Éléments de navigation principaux (en dur)
 */
const navItems: NavItem[] = [
  { label: 'Things I Made', href: '#', disabled: true },
  { label: 'Journey', href: '#', disabled: true },
  { label: 'Thoughts', href: '#', disabled: true },
];

/**
 * Liens externes (en dur)
 */
const externalLinks: NavItem[] = [
  { label: 'MRS', href: '#', disabled: true },
  { label: 'Zia', href: '#', disabled: true },
];

/**
 * Service pour récupérer les éléments de navigation
 */
export async function getNavItems(): Promise<NavItem[]> {
  return navItems;
}

/**
 * Service pour récupérer les liens externes
 */
export async function getExternalLinks(): Promise<NavItem[]> {
  return externalLinks;
}
