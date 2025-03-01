import { SiteHeader } from "@/components/site-header";
import { NesBoxDemo } from "@/components/nes-box-demo";

export default function NesDemo() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-grow p-4 sm:p-6 md:p-12 bg-background">
        <div className="container mx-auto py-4 sm:py-8">
          <h1 className="text-2xl font-bold mb-6 pixel-font">NES-Style Dialogue Box Demo</h1>
          <p className="mb-8 text-sm">
            This page demonstrates the NES-style dialogue box component that will be used for displaying transcriptions.
          </p>
          <NesBoxDemo />
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