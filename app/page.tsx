import { SpeechToTextClient } from "./page-client";
import { SiteHeader } from "@/components/site-header";
import { BrowserCheck } from "@/components/browser-check";
import { MicrophoneRequest } from "@/components/microphone-request";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-grow p-6 md:p-12 bg-background">
        <div className="container mx-auto py-8">
          <BrowserCheck>
            <MicrophoneRequest onPermissionDenied={() => {}}>
              <SpeechToTextClient />
            </MicrophoneRequest>
          </BrowserCheck>
        </div>
      </main>
      <footer className="py-6 border-t border-border bg-muted/30">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>Speech-to-Text Converter using ElevenLabs API</p>
          <p className="mt-1">© {new Date().getFullYear()} - Built with Next.js and shadcn/ui</p>
        </div>
      </footer>
    </div>
  );
}
