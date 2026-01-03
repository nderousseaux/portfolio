'use client';
import { useEffect, useState, useCallback } from 'react';
import { useScramble } from '@/hooks/useScramble';

interface PGPModalProps {
  isOpen: boolean;
  onClose: () => void;
  pgpKey: string;
}

export default function PGPModal({ isOpen, onClose, pgpKey }: PGPModalProps) {
  const [copied, setCopied] = useState(false);
  const [hasScrambled, setHasScrambled] = useState(false);
  const { displayText: titleText, startScramble, stopScramble } = useScramble('PGP Public Key');
  const { displayText: closeText, startScramble: startCloseScramble, stopScramble: stopCloseScramble } = useScramble('Close (ESC)');
  const { displayText: copyText, startScramble: startCopyScramble, stopScramble: stopCopyScramble } = useScramble(copied ? 'Copied!' : 'Copy to clipboard (⌘C)');

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
    if (isOpen && !hasScrambled) {
      startScramble();
      setHasScrambled(true);
    } else if (!isOpen) {
      stopScramble();
      setHasScrambled(false);
      setCopied(false);
    }
  }, [isOpen]);

  // Scramble copy text when copied state changes
  useEffect(() => {
    if (copied) {
      startCopyScramble();
    }
  }, [copied]);

  // Handle keyboard events and body overflow
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      const handleKeyboard = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
        if ((e.metaKey || e.ctrlKey) && e.key === 'c') {
          e.preventDefault();
          handleCopy();
        }
      };
      
      window.addEventListener('keydown', handleKeyboard);
      
      return () => {
        window.removeEventListener('keydown', handleKeyboard);
        document.body.style.overflow = 'unset';
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, onClose, handleCopy]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 
                 p-4"
      onClick={handleBackdropClick}
    >
      <div 
        className="relative max-[440px]:w-auto max-[440px]:max-w-[calc(100%-32px)] min-[440px]:w-full min-[440px]:max-w-md min-[750px]:max-w-2xl bg-black border flex flex-col 
                   max-h-[90vh]
                   min-[810px]:p-8 min-[750px]:p-6 p-4
                   min-[810px]:gap-4 gap-3
                   max-[440px]:rounded"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="min-[750px]:text-2xl text-lg font-mono text-white">
            {titleText}
          </h2>
          <button
            onClick={onClose}
            onMouseEnter={startCloseScramble}
            onMouseLeave={stopCloseScramble}
            className="text-gray-500 hover:text-white text-[11px] min-[750px]:text-xs font-mono ml-4 cursor-pointer whitespace-nowrap"
            aria-label="Close"
          >
            {closeText}
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <pre className="text-[11px] min-[750px]:text-xs max-[440px]:text-[9px] text-gray-400 font-mono whitespace-pre-wrap break-all leading-relaxed max-[440px]:leading-normal m-0">
{pgpKey}
          </pre>
        </div>

        {/* Footer */}
        <div className="flex justify-end items-center">
          <button
            onClick={handleCopy}
            onMouseEnter={startCopyScramble}
            onMouseLeave={stopCopyScramble}
            className={`font-mono text-[11px] min-[750px]:text-xs cursor-pointer ${
              copied
                ? 'text-green-400'
                : 'text-gray-500 hover:text-white'
            }`}
          >
            {copyText}
          </button>
        </div>
      </div>
    </div>
  );
}
