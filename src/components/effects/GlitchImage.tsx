'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './GlitchImage.module.css';

export interface GlitchImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  
  // Configuration du glitch
  glitchConfig?: {
    // Modes d'activation
    enablePeriodic?: boolean;
    enableHover?: boolean;
    enableOnReveal?: boolean;
    
    // Périodicité (en millisecondes)
    periodicMin?: number; // Minimum delay
    periodicMax?: number; // Maximum delay
    
    // Puissance du glitch
    periodicIntensity?: 'normal' | 'subtle'; // Intensité pour les glitches périodiques
    manualIntensity?: 'normal' | 'subtle'; // Intensité pour hover/trigger/reveal
  };
  
  // Image précédente pour l'effet de transition
  previousSrc?: string;
  previousAlt?: string;
  
  // Callback externe pour déclencher le glitch
  onGlitchTrigger?: () => void;
  triggerGlitch?: boolean;
}

export default function GlitchImage({
  src,
  alt,
  width,
  height,
  className = '',
  glitchConfig = {},
  previousSrc,
  previousAlt,
  onGlitchTrigger,
  triggerGlitch = false,
}: GlitchImageProps) {
  const {
    enablePeriodic = false,
    enableHover = false,
    enableOnReveal = false,
    periodicMin = 3000,
    periodicMax = 5000,
    periodicIntensity = 'subtle',
    manualIntensity = 'normal',
  } = glitchConfig;

  const [isGlitching, setIsGlitching] = useState(false);
  const [isSubtle, setIsSubtle] = useState(false);
  const glitchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fonction pour déclencher un glitch
  const triggerGlitchEffect = (subtle: boolean = false) => {
    setIsSubtle(subtle);
    setIsGlitching(true);
    setTimeout(() => {
      setIsGlitching(false);
      setIsSubtle(false);
    }, 400);
    if (onGlitchTrigger) {
      onGlitchTrigger();
    }
  };

  // Glitch périodique
  useEffect(() => {
    if (!enablePeriodic) return;

    const scheduleNextGlitch = (): NodeJS.Timeout => {
      const delay = Math.random() * (periodicMax - periodicMin) + periodicMin;
      return setTimeout(() => {
        triggerGlitchEffect(periodicIntensity === 'subtle');
        // Planifier le prochain glitch
        glitchTimeoutRef.current = scheduleNextGlitch();
      }, delay);
    };

    glitchTimeoutRef.current = scheduleNextGlitch();

    return () => {
      if (glitchTimeoutRef.current) {
        clearTimeout(glitchTimeoutRef.current);
      }
    };
  }, [enablePeriodic, periodicMin, periodicMax, periodicIntensity]);

  // Glitch au reveal
  useEffect(() => {
    if (!enableOnReveal) return;

    const handleImageReveal = () => {
      triggerGlitchEffect(manualIntensity === 'subtle');
    };

    window.addEventListener('project-image-revealed', handleImageReveal);

    return () => {
      window.removeEventListener('project-image-revealed', handleImageReveal);
    };
  }, [enableOnReveal]);

  // Glitch externe déclenché par prop
  useEffect(() => {
    if (triggerGlitch) {
      triggerGlitchEffect(manualIntensity === 'subtle');
    }
  }, [triggerGlitch]);

  // Reset du timer périodique
  const resetPeriodicTimer = () => {
    if (!enablePeriodic) return;

    if (glitchTimeoutRef.current) {
      clearTimeout(glitchTimeoutRef.current);
    }

    const scheduleNextGlitch = (): NodeJS.Timeout => {
      const delay = Math.random() * (periodicMax - periodicMin) + periodicMin;
      return setTimeout(() => {
        triggerGlitchEffect(periodicIntensity === 'subtle');
        glitchTimeoutRef.current = scheduleNextGlitch();
      }, delay);
    };

    glitchTimeoutRef.current = scheduleNextGlitch();
  };

  // Handler pour le hover
  const handleHover = () => {
    if (!enableHover) return;
    triggerGlitchEffect(manualIntensity === 'subtle');
    resetPeriodicTimer();
  };

  return (
    <div
      className={`${styles.glitchContainer} ${isGlitching ? styles.active : ''} ${isSubtle ? styles.subtle : ''} glitch-container`}
      onMouseEnter={handleHover}
      style={{ width, height }}
    >
      {/* Ancienne image pendant le glitch */}
      {isGlitching && previousSrc && (
        <>
          <Image
            src={previousSrc}
            alt={previousAlt || alt}
            width={width}
            height={height}
            className={`${styles.glitchImg} ${styles.glitchOld1} ${className}`}
          />
          <Image
            src={previousSrc}
            alt={previousAlt || alt}
            width={width}
            height={height}
            className={`${styles.glitchImg} ${styles.glitchOld2} ${className}`}
          />
        </>
      )}
      {/* Image principale */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`${styles.glitchImg} ${styles.glitchImg1} ${className}`}
      />
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`${styles.glitchImg} ${styles.glitchImg2} ${className}`}
      />
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`${styles.glitchImg} ${styles.glitchImg3} ${className}`}
      />
    </div>
  );
}
