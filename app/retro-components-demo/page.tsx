"use client";

import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { NesBox, NesBoxHeader, NesBoxTitle, NesBoxContent, NesBoxFooter } from "@/components/ui/nes-box";
import { RetroButton } from "@/components/ui/retro-button";
import { TypewriterEffect } from "@/components/typewriter-effect";
import { AudioRecorder } from "@/components/audio-recorder";
import { AudioPlayer } from "@/components/audio-player";
import { RecordingTimer } from "@/components/recording-timer";
import { PixelIcon } from "@/components/ui/pixel-icon";
import { MessageSquare, Terminal, Headphones, Mic, Zap } from "lucide-react";

export default function RetroComponentsDemo() {
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [currentText, setCurrentText] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [demoTimer, setDemoTimer] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  
  const handleRecordingComplete = (blob: Blob) => {
    setAudioBlob(blob);
    const url = URL.createObjectURL(blob);
    setAudioUrl(url);
  };
  
  const handleReset = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioBlob(null);
    setAudioUrl(null);
  };
  
  const handleStartTyping = () => {
    const demoText = "Welcome to NERV Speech Recognition System. This is a demonstration of our retro-styled components with Evangelion-inspired design.";
    setCurrentText("");
    setIsTyping(true);
    setTimeout(() => {
      setCurrentText(demoText);
    }, 500);
  };
  
  const handleTypewriterComplete = () => {
    setIsTyping(false);
  };
  
  const startTimer = () => {
    setDemoTimer(0);
    setTimerRunning(true);
    
    const interval = setInterval(() => {
      setDemoTimer(prev => {
        const newValue = prev + 0.1;
        if (newValue >= 10) {
          clearInterval(interval);
          setTimerRunning(false);
          return 10;
        }
        return newValue;
      });
    }, 100);
    
    return () => clearInterval(interval);
  };
  
  const resetTimer = () => {
    setDemoTimer(0);
    setTimerRunning(false);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-grow p-4 sm:p-6 md:p-12 bg-background">
        <div className="container mx-auto py-4 sm:py-8">
          <h1 className="text-2xl font-bold mb-6 pixel-font">NERV Retro Components Demo</h1>
          <p className="mb-8 text-sm">
            This page demonstrates all the retro-styled components created for the NERV Speech Recognition System.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Pixel Icons Section */}
            <div>
              <h2 className="text-xl font-bold mb-4 pixel-font">Pixel Art Icons</h2>
              <NesBox className="w-full">
                <NesBoxHeader>
                  <NesBoxTitle className="text-sm sm:text-base">
                    <span className="pixel-font">CUSTOM ICONS</span>
                  </NesBoxTitle>
                </NesBoxHeader>
                <NesBoxContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col items-center">
                      <div className="h-16 w-16 flex items-center justify-center">
                        <PixelIcon name="microphone" size="lg" className="text-primary" />
                      </div>
                      <span className="text-xs mt-2">Microphone</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="h-16 w-16 flex items-center justify-center">
                        <PixelIcon name="play" size="lg" className="text-primary" />
                      </div>
                      <span className="text-xs mt-2">Play</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="h-16 w-16 flex items-center justify-center">
                        <PixelIcon name="pause" size="lg" className="text-primary" />
                      </div>
                      <span className="text-xs mt-2">Pause</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="h-16 w-16 flex items-center justify-center">
                        <PixelIcon name="stop" size="lg" className="text-destructive" />
                      </div>
                      <span className="text-xs mt-2">Stop</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="h-16 w-16 flex items-center justify-center">
                        <PixelIcon name="reset" size="lg" className="text-secondary" />
                      </div>
                      <span className="text-xs mt-2">Reset</span>
                    </div>
                  </div>
                </NesBoxContent>
              </NesBox>
            </div>
            
            {/* Recording Timer Section */}
            <div>
              <h2 className="text-xl font-bold mb-4 pixel-font">Recording Timer</h2>
              <NesBox className="w-full">
                <NesBoxHeader>
                  <div className="mr-3">
                    <Zap className="h-5 w-5" />
                  </div>
                  <NesBoxTitle className="text-sm sm:text-base">
                    <span className="pixel-font">TIMER DEMO</span>
                  </NesBoxTitle>
                </NesBoxHeader>
                <NesBoxContent>
                  <div className="flex flex-col items-center space-y-6 py-4">
                    <RecordingTimer duration={demoTimer} maxDuration={10} />
                    
                    <div className="flex space-x-4">
                      <RetroButton
                        variant="default"
                        onClick={startTimer}
                        disabled={timerRunning}
                      >
                        Start Timer
                      </RetroButton>
                      <RetroButton
                        variant="outline"
                        onClick={resetTimer}
                        disabled={timerRunning && demoTimer < 10}
                      >
                        Reset
                      </RetroButton>
                    </div>
                  </div>
                </NesBoxContent>
                <NesBoxFooter className="text-xs">
                  <span className="pixel-font">
                    {timerRunning ? "TIMER RUNNING..." : "TIMER READY"}
                  </span>
                </NesBoxFooter>
              </NesBox>
            </div>
            
            {/* Typewriter Effect Section */}
            <div>
              <h2 className="text-xl font-bold mb-4 pixel-font">Typewriter Effect</h2>
              <NesBox variant="terminal">
                <NesBoxHeader>
                  <div className="mr-3">
                    <Terminal className="h-5 w-5" />
                  </div>
                  <NesBoxTitle className="text-sm sm:text-base">
                    <span className="pixel-font">TYPEWRITER DEMO</span>
                  </NesBoxTitle>
                </NesBoxHeader>
                <NesBoxContent>
                  <div className="h-48 flex flex-col items-center justify-center space-y-4">
                    {currentText ? (
                      <p className="whitespace-pre-wrap break-words text-sm">
                        <TypewriterEffect 
                          text={currentText} 
                          speed={30}
                          className="pixel-font text-[#33ff33]"
                          onComplete={handleTypewriterComplete}
                        />
                      </p>
                    ) : (
                      <div className="text-xs sm:text-sm pixel-font text-[#33ff33] text-center">
                        Press the button below to start the typewriter effect demo
                      </div>
                    )}
                    
                    <RetroButton
                      variant="terminal"
                      onClick={handleStartTyping}
                      disabled={isTyping}
                    >
                      {isTyping ? "Typing..." : "Start Typing"}
                    </RetroButton>
                  </div>
                </NesBoxContent>
                <NesBoxFooter className="text-xs">
                  <span className="pixel-font text-[#33ff33]">
                    {isTyping ? "TYPING..." : "READY"}
                  </span>
                </NesBoxFooter>
              </NesBox>
            </div>
            
            {/* Audio Controls Section */}
            <div>
              <h2 className="text-xl font-bold mb-4 pixel-font">Audio Controls</h2>
              <div className="space-y-6">
                <AudioRecorder onRecordingComplete={handleRecordingComplete} />
                
                {audioUrl && (
                  <AudioPlayer audioUrl={audioUrl} onReset={handleReset} />
                )}
              </div>
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