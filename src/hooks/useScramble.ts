import { useState, useEffect, useRef } from 'react';

export const useScramble = (text: string) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const frameRef = useRef(0);
  const iterationRef = useRef(0);

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';

  useEffect(() => {
    if (isScrambling) {
      const interval = setInterval(() => {
        setDisplayText((current) =>
          current
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              
              if (index < iterationRef.current) {
                return text[index];
              }

              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join('')
        );

        if (iterationRef.current >= text.length) {
          clearInterval(interval);
          setIsScrambling(false);
          iterationRef.current = 0;
        }

        iterationRef.current += 1 / 3;
      }, 30);

      return () => clearInterval(interval);
    } else {
      setDisplayText(text);
    }
  }, [isScrambling, text]);

  const startScramble = () => {
    iterationRef.current = 0;
    setIsScrambling(true);
  };

  const stopScramble = () => {
    setIsScrambling(false);
    setDisplayText(text);
  };

  return { displayText, startScramble, stopScramble };
};
