import type { SocialLink } from '@/types';
import { promises as fs } from 'fs';
import path from 'path';
import yaml from 'js-yaml';

interface MeYaml {
  socials: {
    email: string;
    website?: string;
    github: string;
    leetcode: string;
    linkedin: string;
  };
}

/**
 * Service pour récupérer les liens de réseaux sociaux
 * Charge les données depuis le fichier YAML me.yaml et la clé PGP depuis pgp.pub
 */
export async function getSocialLinks(): Promise<SocialLink[]> {
  const yamlPath = path.join(process.cwd(), 'src', 'data', 'me.yaml');
  const fileContents = await fs.readFile(yamlPath, 'utf8');
  const data = yaml.load(fileContents) as MeYaml;
  
  // Charger la clé PGP depuis le fichier pgp.pub
  const pgpPath = path.join(process.cwd(), 'src', 'data', 'pgp.pub');
  const pgpKey = await fs.readFile(pgpPath, 'utf8');
  
  return [
    { label: 'Email', href: `mailto:${data.socials.email}` },
    { label: 'GitHub', href: data.socials.github, external: true },
    { label: 'LeetCode', href: data.socials.leetcode, external: true },
    { label: 'LinkedIn', href: data.socials.linkedin, external: true },
    { 
      label: 'PGP', 
      href: '#', 
      isPgp: true,
      pgpKey: pgpKey.trim()
    },
  ];
}
