'use client';
import ScrambleLink from '@/components/effects/ScrambleLink';
import Modal from '@/components/Modal';
import { useState, useCallback, useEffect } from 'react';
import { useScramble } from '@/hooks/useScramble';
import type { SocialLink } from '@/types';

interface FooterProps {
  socialLinks: SocialLink[];
}

export default function Footer({ socialLinks }: FooterProps) {
  const [isPGPModalOpen, setIsPGPModalOpen] = useState(false);
  const [pgpKey, setPgpKey] = useState('');
  const [copied, setCopied] = useState(false);
  const [hasScrambled, setHasScrambled] = useState(false);
  
  const { displayText: titleText, startScramble, stopScramble } = useScramble('PGP Public Key');
  const { displayText: closeText, startScramble: startCloseScramble, stopScramble: stopCloseScramble } = useScramble('Close (ESC)');
  const { displayText: copyText, startScramble: startCopyScramble, stopScramble: stopCopyScramble } = useScramble(copied ? 'Copied!' : 'Copy to clipboard (⌘C)');

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

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(pgpKey);
      setCopied(true);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [pgpKey]);

  // Scramble title only once when modal opens
  useEffect(() => {
    if (isPGPModalOpen && !hasScrambled) {
      startScramble();
      setHasScrambled(true);
    } else if (!isPGPModalOpen) {
      stopScramble();
      setHasScrambled(false);
      setCopied(false);
    }
  }, [isPGPModalOpen]);

  // Scramble copy text when copied state changes
  useEffect(() => {
    if (copied) {
      startCopyScramble();
    }
  }, [copied]);

  return (
    <>
      <footer className="w-full pt-4">
        <div className="flex flex-col md:flex-row justify-between items-center pt-4">
          <p className="text-gray-400 text-sm mb-2 md:mb-0">
            <ScrambleLink>
              Work with me ?
            </ScrambleLink>
          </p>
          <div className="w-16 border-t border-gray-600 mb-2 md:hidden"></div>
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
      
      <Modal
        isOpen={isPGPModalOpen}
        onClose={handleCloseModal}
        title={titleText}
        closeButtonText={closeText}
        onCloseButtonHover={{
          onEnter: startCloseScramble,
          onLeave: stopCloseScramble,
        }}
        maxWidth="2xl"
        onKeyboardCopy={handleCopy}
        footer={
          <button
            onClick={handleCopy}
            onMouseEnter={startCopyScramble}
            onMouseLeave={stopCopyScramble}
            className={`font-mono text-[11px] sm-md:text-xs cursor-pointer ${
              copied
                ? 'text-green-400'
                : 'text-gray-500 hover:text-white'
            }`}
          >
            {copyText}
          </button>
        }
      >
        <pre className="text-[11px] sm-md:text-xs max-xs:text-[9px] text-gray-400 font-mono whitespace-pre-wrap break-all leading-relaxed max-xs:leading-normal m-0">
{pgpKey}
        </pre>
      </Modal>
    </>
  );
}
