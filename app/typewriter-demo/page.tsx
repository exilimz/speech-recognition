"use client";

import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { NesBox, NesBoxHeader, NesBoxTitle, NesBoxContent, NesBoxFooter } from "@/components/ui/nes-box";
import { TypewriterEffect } from "@/components/typewriter-effect";
import { RetroButton } from "@/components/ui/retro-button";
import { MessageSquare, Terminal } from "lucide-react";

export default function TypewriterDemo() {
  const [currentText, setCurrentText] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  
  const demoTexts = [
    "Welcome to NERV Speech Recognition System.",
    "The year is 2015. The Angels are approaching Tokyo-3.",
    "All systems operational. Evangelion Unit-01 ready for launch.",
    "The fate of destruction is also the joy of rebirth.",
  ];
  
  const handleStartTyping = (text: string) => {
    setCurrentText("");
    setIsTyping(true);
    setTimeout(() => {
      setCurrentText(text);
    }, 500);
  };
  
  const handleTypewriterComplete = () => {
    setIsTyping(false);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-grow p-4 sm:p-6 md:p-12 bg-background">
        <div className="container mx-auto py-4 sm:py-8">
          <h1 className="text-2xl font-bold mb-6 pixel-font">Typewriter Effect Demo</h1>
          <p className="mb-8 text-sm">
            This page demonstrates the typewriter text animation effect with sound.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-xl font-bold mb-4 pixel-font">Demo Controls</h2>
              <NesBox className="w-full">
                <NesBoxHeader>
                  <NesBoxTitle className="text-sm sm:text-base">
                    <span className="pixel-font">SELECT TEXT</span>
                  </NesBoxTitle>
                </NesBoxHeader>
                <NesBoxContent>
                  <div className="space-y-3">
                    {demoTexts.map((text, index) => (
                      <RetroButton
                        key={index}
                        variant="default"
                        className="w-full justify-start text-left"
                        disabled={isTyping}
                        onClick={() => handleStartTyping(text)}
                      >
                        Text {index + 1}
                      </RetroButton>
                    ))}
                    
                    <div className="flex items-center mt-4">
                      <RetroButton
                        variant={soundEnabled ? "default" : "outline"}
                        className="mr-2"
                        onClick={() => setSoundEnabled(!soundEnabled)}
                      >
                        {soundEnabled ? "Sound ON" : "Sound OFF"}
                      </RetroButton>
                    </div>
                  </div>
                </NesBoxContent>
              </NesBox>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-4 pixel-font">Typewriter Output</h2>
              <NesBox variant="terminal">
                <NesBoxHeader>
                  <div className="mr-3">
                    <Terminal className="h-5 w-5" />
                  </div>
                  <NesBoxTitle className="text-sm sm:text-base">
                    <span className="pixel-font">NERV TERMINAL</span>
                  </NesBoxTitle>
                </NesBoxHeader>
                <NesBoxContent>
                  <div className="h-48 flex items-center justify-center">
                    {currentText ? (
                      <p className="whitespace-pre-wrap break-words text-sm sm:text-base">
                        <TypewriterEffect 
                          text={currentText} 
                          speed={40}
                          className="pixel-font text-[#33ff33]"
                          onComplete={handleTypewriterComplete}
                          playSound={soundEnabled}
                        />
                      </p>
                    ) : (
                      <div className="text-xs sm:text-sm pixel-font text-[#33ff33]">
                        Select a text to begin typing...
                      </div>
                    )}
                  </div>
                </NesBoxContent>
                <NesBoxFooter className="text-xs">
                  <span className="pixel-font text-[#33ff33]">
                    {isTyping ? "TYPING..." : "READY"}
                  </span>
                </NesBoxFooter>
              </NesBox>
            </div>
          </div>
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