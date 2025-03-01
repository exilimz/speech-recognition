"use client";

import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { TextDisplay } from "@/components/text-display";
import { Button } from "@/components/ui/button";

export default function TextDisplayDemo() {
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState<string | null>(null);
  
  const sampleTexts = [
    "Welcome to NERV Speech Recognition System. All systems operational.",
    "The Angel has been detected. Initiating defense protocols.",
    "EVA Unit-01 has been activated. Synchronization rate at 85%.",
    "Pattern blue detected. Target is approaching Tokyo-3."
  ];
  
  const handleShowText = (index: number) => {
    setIsLoading(true);
    
    // Simulate loading delay
    setTimeout(() => {
      setText(sampleTexts[index]);
      setIsLoading(false);
    }, 1500);
  };
  
  const handleClear = () => {
    setText(null);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-grow p-4 sm:p-6 md:p-12 bg-background">
        <div className="container mx-auto py-4 sm:py-8">
          <h1 className="text-2xl font-bold mb-6 pixel-font">Text Display Demo</h1>
          <p className="mb-8 text-sm">
            This page demonstrates the updated text display component with NES-style dialogue box and typewriter effect.
          </p>
          
          <div className="mb-8">
            <TextDisplay text={text} isLoading={isLoading} />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {sampleTexts.map((_, index) => (
              <Button 
                key={index}
                onClick={() => handleShowText(index)}
                disabled={isLoading}
                variant="outline"
                className="pixel-font text-xs sm:text-sm"
              >
                Show Sample Text {index + 1}
              </Button>
            ))}
          </div>
          
          <Button 
            onClick={handleClear}
            disabled={isLoading || !text}
            variant="destructive"
            className="pixel-font text-xs sm:text-sm"
          >
            Clear Text
          </Button>
        </div>
      </main>
      <footer className="py-4 sm:py-6 border-t border-border bg-muted/30">
        <div className="container mx-auto text-center text-xs sm:text-sm text-muted-foreground px-4">
          <p>NERV Speech Recognition System</p>
          <p className="mt-1">© {new Date().getFullYear()} - Built with Next.js and shadcn/ui</p>
        </div>
      </footer>
    </div>
  );
} 