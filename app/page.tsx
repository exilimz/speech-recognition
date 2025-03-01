import { SpeechToTextClient } from "./page-client";
import { SiteHeader } from "@/components/site-header";
import { BrowserCheck } from "@/components/browser-check";
import { MicrophoneRequest } from "@/components/microphone-request";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-grow p-4 sm:p-6 md:p-8 bg-background">
        <div className="container mx-auto py-4 sm:py-6">
          {/* NERV Header Banner */}
          <div className="mb-6 sm:mb-8">
            <div className="w-full border-4 border-primary bg-secondary text-secondary-foreground p-3 sm:p-4">
              <h1 className="text-xl sm:text-2xl font-bold pixel-font tracking-tight">NERV SPEECH RECOGNITION SYSTEM</h1>
              <p className="text-xs sm:text-sm mt-1 pixel-font opacity-80">VERSION 2.0 - EVANGELION INTERFACE</p>
            </div>
            <div className="w-full h-2 bg-primary"></div>
            <div className="w-full h-1 bg-accent mt-1"></div>
          </div>
          
          <BrowserCheck>
            <MicrophoneRequest>
              <SpeechToTextClient />
            </MicrophoneRequest>
          </BrowserCheck>
        </div>
      </main>
      <footer className="py-4 sm:py-6 border-t-4 border-primary bg-muted/30">
        <div className="container mx-auto text-center text-xs sm:text-sm text-muted-foreground px-4">
          <p className="pixel-font">NERV SPEECH RECOGNITION SYSTEM</p>
          <p className="mt-1 pixel-font">© {new Date().getFullYear()} - FOR INTERNAL USE ONLY</p>
        </div>
      </footer>
    </div>
  );
}
