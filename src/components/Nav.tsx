'use client';
import { getNavItems, getExternalLinks } from '@/services/navigationService';
import ScrambleLink from '@/components/effects/ScrambleLink';
import GlitchImage from '@/components/effects/GlitchImage';
import { useEffect, useState } from 'react';

export default function Nav() {
  const [navItems, setNavItems] = useState<any[]>([]);
  const [externalLinks, setExternalLinks] = useState<any[]>([]);

  useEffect(() => {
    getNavItems().then(setNavItems);
    getExternalLinks().then(setExternalLinks);
  }, []);

  return (
    <nav className="w-full flex justify-between items-start">
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
      <div className="text-end">
        <p>
          <ScrambleLink href="#">(Home)</ScrambleLink>
        </p>
        <br />
        {navItems.map((item, index) => (
          <p key={index}>
            <ScrambleLink href={item.href}>{item.label}</ScrambleLink>
          </p>
        ))}
        <br />
        {externalLinks.map((item, index) => (
          <p key={index}>
            <ScrambleLink href={item.href}>{item.label}</ScrambleLink>
          </p>
        ))}
        <br />
      </div>
    </nav>
  );
}
