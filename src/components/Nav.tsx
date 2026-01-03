'use client';
import { getNavItems, getExternalLinks } from '@/services/navigationService';
import ScrambleLink from '@/components/effects/ScrambleLink';
import GlitchImage from '@/components/effects/GlitchImage';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Nav() {
  const [navItems, setNavItems] = useState<any[]>([]);
  const [externalLinks, setExternalLinks] = useState<any[]>([]);

  useEffect(() => {
    getNavItems().then(setNavItems);
    getExternalLinks().then(setExternalLinks);
  }, []);

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
