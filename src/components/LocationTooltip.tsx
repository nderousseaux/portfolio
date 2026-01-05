'use client';
import { useState, useRef, useCallback } from 'react';
import { useScramble } from '@/hooks/useScramble';
import dynamic from 'next/dynamic';

// Dynamically import the map component to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import('./LocationMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-black/50 flex items-center justify-center">
      <span className="text-xs text-gray-500 font-mono">Loading map...</span>
    </div>
  ),
});

interface LocationTooltipProps {
  location: {
    name: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
}

export default function LocationTooltip({ location }: LocationTooltipProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLSpanElement>(null);
  
  // Format coordinates as GPS style
  const formatCoord = (coord: number, isLat: boolean) => {
    const direction = isLat 
      ? (coord >= 0 ? 'N' : 'S')
      : (coord >= 0 ? 'E' : 'W');
    const absCoord = Math.abs(coord);
    const degrees = Math.floor(absCoord);
    const minutes = Math.floor((absCoord - degrees) * 60);
    const seconds = ((absCoord - degrees - minutes / 60) * 3600).toFixed(1);
    return `${degrees}°${minutes}'${seconds}"${direction}`;
  };
  
  const coordsText = `${formatCoord(location.coordinates.lat, true)} ${formatCoord(location.coordinates.lng, false)}`;
  const { displayText, startScramble, stopScramble } = useScramble(coordsText);

  // Use callback for smoother mouse tracking
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseEnter = () => {
    setIsHovering(true);
    startScramble();
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    stopScramble();
  };

  // Calculate tooltip position to stay within viewport
  const getTooltipPosition = () => {
    const tooltipWidth = 280;
    const tooltipHeight = 200;
    const offset = 15;
    
    let x = mousePos.x + offset;
    let y = mousePos.y + offset;
    
    // Prevent tooltip from going off-screen
    if (typeof window !== 'undefined') {
      if (x + tooltipWidth > window.innerWidth - 20) {
        x = mousePos.x - tooltipWidth - offset;
      }
      if (y + tooltipHeight > window.innerHeight - 20) {
        y = mousePos.y - tooltipHeight - offset;
      }
    }
    
    return { x, y };
  };

  const tooltipPos = getTooltipPosition();

  return (
    <>
      <span
        ref={containerRef}
        className="cursor-crosshair text-gray-400 hover:text-white transition-colors inline-block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        [{displayText}]
      </span>

      {isHovering && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y,
          }}
        >
          <div className="w-[280px] h-[180px] border border-white/30 bg-black overflow-hidden">
            {/* Map header */}
            <div className="h-6 bg-black border-b border-white/20 flex items-center px-2">
              <span className="text-[10px] text-gray-400 font-mono truncate">
                Currently at: {location.name}
              </span>
            </div>
            
            {/* Map container */}
            <div className="h-[154px] relative">
              <MapComponent
                lat={location.coordinates.lat - 0.012}
                lng={location.coordinates.lng}
              />
              
              {/* Crosshair overlay - properly centered */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Vertical line top */}
                <div 
                  className="absolute bg-white/70"
                  style={{
                    width: '1px',
                    height: '8px',
                    left: '50%',
                    top: 'calc(50% - 12px)',
                    transform: 'translateX(-50%)',
                  }}
                />
                {/* Vertical line bottom */}
                <div 
                  className="absolute bg-white/70"
                  style={{
                    width: '1px',
                    height: '8px',
                    left: '50%',
                    top: 'calc(50% + 4px)',
                    transform: 'translateX(-50%)',
                  }}
                />
                {/* Horizontal line left */}
                <div 
                  className="absolute bg-white/70"
                  style={{
                    width: '8px',
                    height: '1px',
                    left: 'calc(50% - 12px)',
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                />
                {/* Horizontal line right */}
                <div 
                  className="absolute bg-white/70"
                  style={{
                    width: '8px',
                    height: '1px',
                    left: 'calc(50% + 4px)',
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                />
                {/* Center dot */}
                <div 
                  className="absolute w-2 h-2 rounded-full bg-white border border-black"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              </div>
              
              {/* Scanline effect */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-10"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
