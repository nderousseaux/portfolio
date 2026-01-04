'use client';
import ScrambleLink from '@/components/effects/ScrambleLink';
import PGPModal from '@/components/PGPModal';
import { useState, useCallback } from 'react';
import type { SocialLink } from '@/types';

interface FooterProps {
  socialLinks: SocialLink[];
}

export default function Footer({ socialLinks }: FooterProps) {
  const [isPGPModalOpen, setIsPGPModalOpen] = useState(false);
  const [pgpKey, setPgpKey] = useState('');

  const handleCloseModal = useCallback(() => {
    setIsPGPModalOpen(false);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: SocialLink) => {
    if (link.isPgp) {
      e.preventDefault();
      setPgpKey(link.pgpKey || '');
      setIsPGPModalOpen(true);
    }
  };

  return (
    <>
      <footer className="w-full pt-4">
        <div className="flex flex-col md:flex-row justify-between items-center pt-4">
          <p className="text-gray-400 text-sm mb-2 md:mb-0">
            Work with me ?
          </p>
          <div className="flex space-x-4">
            {socialLinks.map((link, index) => (
              <ScrambleLink
                key={index}
                href={link.href}
                target={link.external ? '_blank' : '_self'}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="text-gray-400 hover:text-white text-sm transition-colors"
                onClick={(e) => handleLinkClick(e, link)}
              >
                {link.label}
              </ScrambleLink>
            ))}
          </div>
        </div>
      </footer>
      
      <PGPModal 
        isOpen={isPGPModalOpen} 
        onClose={handleCloseModal}
        pgpKey={pgpKey}
      />
    </>
  );
}
