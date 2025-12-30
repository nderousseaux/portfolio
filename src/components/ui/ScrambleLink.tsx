'use client';
import { useScramble } from '@/hooks/useScramble';
import type { AnchorHTMLAttributes } from 'react';

interface ScrambleLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: string;
}

export default function ScrambleLink({ children, ...props }: ScrambleLinkProps) {
  const { displayText, startScramble, stopScramble } = useScramble(children);

  return (
    <a
      {...props}
      onMouseEnter={startScramble}
      onMouseLeave={stopScramble}
    >
      {displayText}
    </a>
  );
}
