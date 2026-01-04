export interface Project {
  title: string;
  category: string;
  year: string;
  link: string;
  imgUrl?: string;
}

export interface HomeData {
  description: string;
  whatsmakeme: string[];
}

export interface SocialLink {
  label: string;
  href: string;
  external?: boolean;
  isPgp?: boolean;
  pgpKey?: string;
}

export interface NavItem {
  label: string;
  href: string;
  disabled?: boolean;
}
