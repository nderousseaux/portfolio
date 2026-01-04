'use client';
import ScrambleLink from '@/components/effects/ScrambleLink';
import GlitchImage from '@/components/effects/GlitchImage';
import Link from 'next/link';
import type { NavItem } from '@/types';

interface NavProps {
  navItems?: NavItem[];
  externalLinks?: NavItem[];
}

export default function Nav({ navItems = [], externalLinks = [] }: NavProps) {

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
        {navItems.length > 0 && (
          <>
            <br />
            {navItems.map((item, index) => (
              <p key={index} className={item.disabled ? 'line-through' : ''}>
                <ScrambleLink href={item.href}>{item.label}</ScrambleLink>
              </p>
            ))}
          </>
        )}
        {externalLinks.length > 0 && (
          <>
            <br />
            {externalLinks.map((item, index) => (
              <p key={index} className={item.disabled ? 'line-through' : ''}>
                <ScrambleLink href={item.href}>{`${item.label} >`}</ScrambleLink>
              </p>
            ))}
          </>
        )}
        <br />
      </div>
    </nav>
  );
}
