'use client';
import ScrambleLink from '@/components/effects/ScrambleLink';
import GlitchImage from '@/components/effects/GlitchImage';
import Link from 'next/link';
import type { NavItem } from '@/types';

const navItems: NavItem[] = [
  // { label: 'Things I Made', href: '#', disabled: true },
  // { label: 'Journey', href: '#', disabled: true },
  // { label: 'Thoughts', href: '#', disabled: true },
];

const externalLinks: NavItem[] = [
  // { label: 'MRS', href: '#', disabled: true },
  // { label: 'Zia', href: '#', disabled: true },
];

export default function Nav() {

  return (
    <nav className="w-full flex justify-between items-start">
      <Link href="/">
        <GlitchImage
          src="/logo.png"
          alt="Logo"
          width={75}
          height={75}
          glitchConfig={{
            enableHover: true,
            enableOnReveal: true,
            manualIntensity: 'subtle',
          }}
        />
      </Link>
      <div className="text-end">
        <p>
          <ScrambleLink href="/">(Home)</ScrambleLink>
        </p>
        <br />
        {navItems.map((item, index) => (
          <p key={index} className={item.disabled ? 'line-through' : ''}>
            <ScrambleLink href={item.href}>{item.label}</ScrambleLink>
          </p>
        ))}
        <br />
        {externalLinks.map((item, index) => (
          <p key={index} className={item.disabled ? 'line-through' : ''}>
            <ScrambleLink href={item.href}>{`${item.label} >`}</ScrambleLink>
          </p>
        ))}
        <br />
      </div>
    </nav>
  );
}
