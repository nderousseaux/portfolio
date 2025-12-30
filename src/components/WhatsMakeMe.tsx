'use client';
import { useState, useEffect } from 'react';

interface WhatsMakeMeProps {
  skills: string[];
}

export default function WhatsMakeMe({ skills }: WhatsMakeMeProps) {
  const [isAbsolute, setIsAbsolute] = useState(false);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const checkWidth = () => {
      const shouldBeAbsolute = window.innerWidth >= 992;
      
      if (shouldBeAbsolute !== isAbsolute) {
        setOpacity(0);
        setTimeout(() => {
          setIsAbsolute(shouldBeAbsolute);
          setTimeout(() => setOpacity(1), 50);
        }, 600);
      }
    };

    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, [isAbsolute]);

  return (
    <div 
      className={`${isAbsolute ? 'absolute top-[32px] right-0 w-102/200' : 'inline'}`}
      style={{ 
        opacity,
        transition: 'opacity 0.6s ease, top 0.6s ease, right 0.6s ease, width 0.6s ease'
      }}
    >
      <section className="flex flex-col items-start">
        <h2>(What&#39;s make me)</h2>
        <br />
        {skills.map((skill, index) => (
          <p key={index}>{skill}</p>
        ))}
        <br />
      </section>
    </div>
  );
}
