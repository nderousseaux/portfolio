'use client';
import { useEffect, useState, useCallback } from 'react';
import { useScramble } from '@/hooks/useScramble';
import Modal from '@/components/ui/Modal';

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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
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
          className={`font-mono text-[11px] min-[750px]:text-xs cursor-pointer ${
            copied
              ? 'text-green-400'
              : 'text-gray-500 hover:text-white'
          }`}
        >
          {copyText}
        </button>
      }
    >
      <pre className="text-[11px] min-[750px]:text-xs max-[440px]:text-[9px] text-gray-400 font-mono whitespace-pre-wrap break-all leading-relaxed max-[440px]:leading-normal m-0">
{pgpKey}
      </pre>
    </Modal>
  );
}
