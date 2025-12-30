'use client';
import { useEffect } from 'react';

export default function ResizeTransition() {
  useEffect(() => {
    // Force enable transitions after mount
    document.body.style.cssText = '';
  }, []);

  return null;
}
