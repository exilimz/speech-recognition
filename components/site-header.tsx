import { PixelIcon } from "@/components/ui/pixel-icon";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b-4 border-primary bg-background/95 backdrop-blur">
      <div className="container flex h-14 sm:h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* NERV Logo */}
          <div className="relative h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center bg-primary text-primary-foreground">
            <div className="absolute inset-0 border-2 border-foreground" style={{ clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }}></div>
            <span className="text-xs sm:text-sm font-bold pixel-font mt-1">NERV</span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-bold pixel-font leading-tight">NERV</span>
            <span className="text-xs sm:text-sm pixel-font leading-tight text-muted-foreground">SPEECH RECOGNITION</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center text-xs pixel-font text-muted-foreground mr-2">
            <span>SYSTEM STATUS: OPERATIONAL</span>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
} 