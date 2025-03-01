"use client";

import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { RetroButton } from "@/components/ui/retro-button";
import { AudioRecorder } from "@/components/audio-recorder";
import { AudioPlayer } from "@/components/audio-player";
import { NesBox, NesBoxHeader, NesBoxTitle, NesBoxContent } from "@/components/ui/nes-box";
import { Play, Pause, RotateCcw, Mic, Square, Zap, Terminal } from "lucide-react";

export default function RetroControlsDemo() {
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  
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
  
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-grow p-4 sm:p-6 md:p-12 bg-background">
        <div className="container mx-auto py-4 sm:py-8">
          <h1 className="text-2xl font-bold mb-6 pixel-font">Retro Controls Demo</h1>
          <p className="mb-8 text-sm">
            This page demonstrates the retro-styled buttons and updated audio controls with NES-style UI.
          </p>
          
          <div className="mb-8">
            <NesBox className="w-full max-w-3xl mx-auto mb-8">
              <NesBoxHeader>
                <NesBoxTitle className="text-sm sm:text-base">
                  <span className="pixel-font">RETRO BUTTON VARIANTS</span>
                </NesBoxTitle>
              </NesBoxHeader>
              <NesBoxContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex flex-col items-center gap-2">
                    <RetroButton variant="default">
                      Default
                    </RetroButton>
                    <span className="text-xs">Default</span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <RetroButton variant="secondary">
                      Secondary
                    </RetroButton>
                    <span className="text-xs">Secondary</span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <RetroButton variant="destructive">
                      Destructive
                    </RetroButton>
                    <span className="text-xs">Destructive</span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <RetroButton variant="outline">
                      Outline
                    </RetroButton>
                    <span className="text-xs">Outline</span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <RetroButton variant="ghost">
                      Ghost
                    </RetroButton>
                    <span className="text-xs">Ghost</span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <RetroButton variant="terminal">
                      Terminal
                    </RetroButton>
                    <span className="text-xs">Terminal</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="flex flex-col items-center gap-2">
                    <RetroButton variant="default" size="icon">
                      <Play className="h-5 w-5" />
                    </RetroButton>
                    <span className="text-xs">Icon</span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <RetroButton variant="secondary" size="icon">
                      <Pause className="h-5 w-5" />
                    </RetroButton>
                    <span className="text-xs">Icon</span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <RetroButton variant="destructive" size="icon">
                      <Square className="h-5 w-5" />
                    </RetroButton>
                    <span className="text-xs">Icon</span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <RetroButton variant="outline" size="icon">
                      <RotateCcw className="h-5 w-5" />
                    </RetroButton>
                    <span className="text-xs">Icon</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <RetroButton variant="default" size="sm">
                      Small
                    </RetroButton>
                    <span className="text-xs">Small</span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <RetroButton variant="default">
                      Default
                    </RetroButton>
                    <span className="text-xs">Default</span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <RetroButton variant="default" size="lg">
                      Large
                    </RetroButton>
                    <span className="text-xs">Large</span>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <RetroButton variant="default" size="icon-sm">
                      <Zap className="h-4 w-4" />
                    </RetroButton>
                    <span className="text-xs">Icon SM</span>
                  </div>
                </div>
              </NesBoxContent>
            </NesBox>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h2 className="text-xl font-bold mb-4 pixel-font">Audio Recorder</h2>
                <AudioRecorder onRecordingComplete={handleRecordingComplete} />
              </div>
              
              {audioUrl && (
                <div>
                  <h2 className="text-xl font-bold mb-4 pixel-font">Audio Player</h2>
                  <AudioPlayer audioUrl={audioUrl} onReset={handleReset} />
                </div>
              )}
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