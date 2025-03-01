import React, { useState, useEffect, useRef } from "react";

interface TypewriterEffectProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
  playSound?: boolean;
}

export function TypewriterEffect({
  text,
  speed = 50,
  className = "",
  onComplete,
  playSound = true,
}: TypewriterEffectProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    // Reset when text changes
    setDisplayedText("");
    setCurrentIndex(0);
  }, [text]);
  
  useEffect(() => {
    // Create audio element if it doesn't exist
    if (playSound && !audioRef.current) {
      audioRef.current = new Audio("/sounds/typewriter.mp3");
      audioRef.current.volume = 0.2;
    }
    
    // If we've reached the end of the text, call onComplete
    if (currentIndex >= text.length) {
      onComplete?.();
      return;
    }
    
    // Set up the timer for the typewriter effect
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
        
        // Play sound effect (with random pitch variation for realism)
        if (playSound && audioRef.current) {
          // Skip playing sound for spaces
          if (text[currentIndex] !== " ") {
            // Clone the audio to allow overlapping sounds
            const sound = audioRef.current.cloneNode() as HTMLAudioElement;
            sound.playbackRate = 0.9 + Math.random() * 0.2; // Random pitch between 0.9 and 1.1
            sound.play().catch(e => console.error("Error playing typewriter sound:", e));
          }
        }
      }
    }, speed);
    
    return () => clearTimeout(timer);
  }, [currentIndex, text, speed, onComplete, playSound]);
  
  return (
    <span className={className}>
      {displayedText}
      {currentIndex < text.length && (
        <span className="inline-block w-2 h-4 bg-current animate-blink" />
      )}
    </span>
  );
} 