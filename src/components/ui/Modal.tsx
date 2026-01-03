'use client';
import { useEffect, useCallback, ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  closeButtonText?: ReactNode;
  onCloseButtonHover?: {
    onEnter: () => void;
    onLeave: () => void;
  };
  enableKeyboardShortcuts?: boolean;
  onKeyboardCopy?: () => void;
}

const maxWidthClasses = {
  sm: 'min-[440px]:max-w-sm',
  md: 'min-[440px]:max-w-md',
  lg: 'min-[440px]:max-w-lg',
  xl: 'min-[440px]:max-w-xl',
  '2xl': 'min-[750px]:max-w-2xl',
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  maxWidth = 'md',
  closeButtonText = 'Close (ESC)',
  onCloseButtonHover,
  enableKeyboardShortcuts = true,
  onKeyboardCopy,
}: ModalProps) {
  
  // Handle keyboard events and body overflow
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      const handleKeyboard = (e: KeyboardEvent) => {
        if (enableKeyboardShortcuts) {
          if (e.key === 'Escape') {
            onClose();
          }
          if (onKeyboardCopy && (e.metaKey || e.ctrlKey) && e.key === 'c') {
            e.preventDefault();
            onKeyboardCopy();
          }
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
  }, [isOpen, onClose, enableKeyboardShortcuts, onKeyboardCopy]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={handleBackdropClick}
    >
      <div 
        className={`relative max-[440px]:w-auto max-[440px]:max-w-[calc(100%-32px)] min-[440px]:w-full ${maxWidthClasses[maxWidth]} bg-black border flex flex-col 
                   max-h-[90vh]
                   min-[810px]:p-8 min-[750px]:p-6 p-4
                   min-[810px]:gap-4 gap-3
                   max-[440px]:rounded`}
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="min-[750px]:text-2xl text-lg font-mono text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            onMouseEnter={onCloseButtonHover?.onEnter}
            onMouseLeave={onCloseButtonHover?.onLeave}
            className="text-gray-500 hover:text-white text-[11px] min-[750px]:text-xs font-mono ml-4 cursor-pointer whitespace-nowrap"
            aria-label="Close"
          >
            {closeButtonText}
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex justify-end items-center">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
