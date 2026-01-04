'use client';
import { useEffect, ReactNode } from 'react';

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
  sm: 'xs:max-w-sm',
  md: 'xs:max-w-md',
  lg: 'xs:max-w-lg',
  xl: 'xs:max-w-xl',
  '2xl': 'sm-md:max-w-2xl',
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
        className={`
          relative max-h-[90vh] bg-black border flex flex-col
          max-xs:w-full max-xs:h-full max-xs:rounded-none
          xs:w-full xs:max-w-lg xs:rounded ${maxWidthClasses[maxWidth]}
          p-4 sm-md:p-6 md:p-8
          gap-3 md:gap-4
        `}
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg sm-md:text-2xl font-mono text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            onMouseEnter={onCloseButtonHover?.onEnter}
            onMouseLeave={onCloseButtonHover?.onLeave}
            className="text-gray-500 hover:text-white text-[11px] sm-md:text-xs font-mono ml-4 cursor-pointer whitespace-nowrap"
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
