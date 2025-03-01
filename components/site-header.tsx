import { Headphones } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
      <div className="container flex h-12 sm:h-16 items-center justify-between px-4">
        <div className="flex items-center gap-1 sm:gap-2">
          <Headphones className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          <span className="text-sm sm:text-base font-semibold">Speech-to-Text</span>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
} 