import React from 'react';
import { cn } from '@/lib/utils';

export type PixelIconType = 'microphone' | 'play' | 'pause' | 'stop' | 'reset';

interface PixelIconProps extends React.SVGAttributes<SVGElement> {
  name: PixelIconType;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function PixelIcon({ 
  name, 
  size = 'md', 
  className, 
  ...props 
}: PixelIconProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <svg
      className={cn(sizeClasses[size], className)}
      {...props}
    >
      <use href={`/pixel-icons/${name}.svg#icon`} />
    </svg>
  );
} 