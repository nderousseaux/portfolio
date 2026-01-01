'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './PageReveal.module.css';

export default function PageReveal({ children }: { children: React.ReactNode }) {
  const [isRevealing, setIsRevealing] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [revealedChars, setRevealedChars] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const totalCharsRef = useRef(0);
  const allTextNodesRef = useRef<{ node: Text; originalText: string; startIndex: number }[]>([]);
  const allBordersRef = useRef<{ element: HTMLElement; startIndex: number }[]>([]);
  const allImagesRef = useRef<{ element: HTMLElement; startIndex: number }[]>([]);
  const projectImageRevealedRef = useRef(false);
  const projectsSectionIndexRef = useRef(-1);

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';

  useEffect(() => {
    if (!contentRef.current) return;

    const collectTextNodes = () => {
      if (!contentRef.current) return;

      // Collecter tous les nœuds de texte
      const walker = document.createTreeWalker(
        contentRef.current,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node) => {
            if (node.textContent?.trim()) {
              return NodeFilter.FILTER_ACCEPT;
            }
            return NodeFilter.FILTER_REJECT;
          }
        }
      );

      const textNodes: { node: Text; originalText: string; startIndex: number }[] = [];
      const borders: { element: HTMLElement; startIndex: number }[] = [];
      const images: { element: HTMLElement; startIndex: number }[] = [];
      let currentIndex = 0;
      let node;
      let projectsSectionIndex = -1;

      while ((node = walker.nextNode())) {
        const textNode = node as Text;
        const originalText = textNode.textContent || '';
        
        // Détecter si nous sommes dans la section projets
        let parent = textNode.parentElement;
        let isInProjectsSection = false;
        
        while (parent && parent !== contentRef.current) {
          // Chercher une section qui contient des projets (par classe ou élément)
          if (parent.tagName === 'SECTION' && parent.querySelector('img')) {
            isInProjectsSection = true;
            if (projectsSectionIndex === -1) {
              projectsSectionIndex = currentIndex;
            }
          }
          
          const styles = window.getComputedStyle(parent);
          
          // Gérer les bordures
          if (styles.borderTopWidth !== '0px' || 
              styles.borderBottomWidth !== '0px' ||
              styles.borderLeftWidth !== '0px' ||
              styles.borderRightWidth !== '0px') {
            // Vérifier si cet élément n'est pas déjà enregistré
            if (!borders.find(b => b.element === parent)) {
              borders.push({
                element: parent,
                startIndex: currentIndex
              });
              // Cacher initialement les bordures
              parent.style.borderColor = 'transparent';
            }
          }
          
          parent = parent.parentElement;
        }
        
        textNodes.push({
          node: textNode,
          originalText,
          startIndex: currentIndex
        });
        currentIndex += originalText.length;
      }

      // Collecter les images avec l'index de la section projets
      const allImgs = contentRef.current.querySelectorAll('img');
      allImgs.forEach((img) => {
        // Vérifier si l'image est dans le nav
        let parent = img.parentElement;
        let isInNav = false;
        let isInGlitchContainer = false;
        while (parent && parent !== contentRef.current) {
          if (parent.tagName === 'NAV') {
            isInNav = true;
          }
          if (parent.classList.contains('glitch-container')) {
            isInGlitchContainer = true;
          }
          parent = parent.parentElement;
        }
        
        // Si l'image est dans un glitch-container, on cache le container, pas l'image
        if (isInGlitchContainer) {
          let glitchContainer = img.parentElement;
          while (glitchContainer && !glitchContainer.classList.contains('glitch-container')) {
            glitchContainer = glitchContainer.parentElement;
          }
          if (glitchContainer && !images.find(i => i.element === glitchContainer)) {
            images.push({
              element: glitchContainer as HTMLElement,
              startIndex: isInNav ? 0 : (projectsSectionIndex >= 0 ? projectsSectionIndex : 0)
            });
            (glitchContainer as HTMLElement).style.opacity = '0';
          }
        } else {
          images.push({
            element: img as HTMLElement,
            startIndex: isInNav ? 0 : (projectsSectionIndex >= 0 ? projectsSectionIndex : 0)
          });
          (img as HTMLElement).style.opacity = '0';
        }
      });

      allTextNodesRef.current = textNodes;
      allBordersRef.current = borders;
      allImagesRef.current = images;
      totalCharsRef.current = currentIndex;
      projectsSectionIndexRef.current = projectsSectionIndex;
    };

    const startAnimation = () => {
      setIsReady(true);
      // Animation
      const duration = 5000; // 2 secondes
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentCharCount = Math.floor(progress * totalCharsRef.current);
        
        setRevealedChars(currentCharCount);

        // Mettre à jour les nœuds de texte
        allTextNodesRef.current.forEach(({ node, originalText, startIndex }) => {
          const endIndex = startIndex + originalText.length;
          
          let newText = '';
          for (let i = 0; i < originalText.length; i++) {
            const charIndex = startIndex + i;
            
            if (charIndex < currentCharCount) {
              // Caractère révélé
              newText += originalText[i];
            } else if (charIndex < currentCharCount + 20) {
              // Zone de scramble
              if (originalText[i] === ' ' || originalText[i] === '\n') {
                newText += originalText[i];
           

        // Mettre à jour les images
        allImagesRef.current.forEach(({ element, startIndex }) => {
          if (currentCharCount >= startIndex) {
            element.style.opacity = '1';
          }
        });   } else {
                newText += characters[Math.floor(Math.random() * characters.length)];
              }
            } else {
              // Pas encore visible
              newText += ' ';
            }
          }
          
          node.textContent = newText;
        });

        // Mettre à jour les bordures
        allBordersRef.current.forEach(({ element, startIndex }) => {
          if (currentCharCount >= startIndex) {
            element.style.borderColor = '';
          }
        });

        // Mettre à jour les images
        allImagesRef.current.forEach(({ element, startIndex }) => {
          if (currentCharCount >= startIndex) {
            // Déclencher l'événement pour l'image des projets AVANT de la rendre visible
            if (!projectImageRevealedRef.current && 
                element.classList.contains('glitch-container') && 
                startIndex === projectsSectionIndexRef.current) {
              projectImageRevealedRef.current = true;
              window.dispatchEvent(new Event('project-image-revealed'));
            }
            
            element.style.opacity = '1';
          }
        });

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setIsRevealing(false);
          // Restaurer le texte original
          allTextNodesRef.current.forEach(({ node, originalText }) => {
            node.textContent = originalText;
          });
          // Restaurer les bordures
          allBordersRef.current.forEach(({ element }) => {
            element.style.borderColor = '';
          });
          // Les images gardent leur opacity: 1
        }
      };

      animate();
    };

    // Attendre que tout soit chargé, puis collecter et animer
    const timeout = setTimeout(() => {
      collectTextNodes();
      // Petit délai supplémentaire pour être sûr que tout est bien là
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          collectTextNodes(); // Re-collecter au cas où
          startAnimation();
        });
      });
    }, 200);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div ref={contentRef} style={{ opacity: isReady ? 1 : 0 }} className={styles.pageRevealContainer}>
      {children}
    </div>
  );
}
