import type { Metadata } from "next";
import { getHomeData } from "@/services/homeService";

// Métadonnées statiques de base
const staticKeywords = [
  "Nathanaël Derousseaux",
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "web development",
  "portfolio",
  "freelance developer",
  "independent developer",
  "mobile development",
  "Strasbourg",
  "France",
];

/**
 * Génère les métadonnées de manière dynamique
 * Charge la description et les intérêts depuis me.yaml
 */
export async function generateMetadata(): Promise<Metadata> {
  const { description, whatsmakeme } = await getHomeData();
  
  // Combine les keywords statiques avec les intérêts dynamiques
  const keywords = [...staticKeywords, ...whatsmakeme];
  
  return {
    title: "Nathanaël Derousseaux",
    description,
    keywords,
    authors: [{ name: "Nathanaël Derousseaux" }],
    openGraph: {
      title: "Nathanaël Derousseaux",
      description,
      type: "website",
      locale: "fr_FR",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}