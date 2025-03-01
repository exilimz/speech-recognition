"use client";

import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function BrowserCheck({ children }: { children: React.ReactNode }) {
  const [isCompatible, setIsCompatible] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check for Web Audio API support
    const hasAudioContext = typeof window !== "undefined" && 
      (window.AudioContext || (window as any).webkitAudioContext);
    
    // Check for MediaRecorder API support
    const hasMediaRecorder = typeof window !== "undefined" && 
      typeof window.MediaRecorder !== "undefined";
    
    // Check for getUserMedia support
    const hasGetUserMedia = typeof navigator !== "undefined" && 
      navigator.mediaDevices && 'getUserMedia' in navigator.mediaDevices;
    
    // Set compatibility status
    setIsCompatible(hasAudioContext && hasMediaRecorder && hasGetUserMedia);
    
    // Redirect to not-supported page if browser is incompatible
    if (hasAudioContext === false || hasMediaRecorder === false || hasGetUserMedia === false) {
      router.push("/not-supported");
    }
  }, [router]);

  // Show loading state while checking compatibility
  if (isCompatible === null) {
    return (
      <div className="flex items-center justify-center min-h-[150px] sm:min-h-[200px]">
        <p className="text-sm sm:text-base text-muted-foreground">Checking browser compatibility...</p>
      </div>
    );
  }

  // Show error if browser is incompatible
  if (isCompatible === false) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle className="text-sm sm:text-base">Browser Not Supported</AlertTitle>
        <AlertDescription className="text-xs sm:text-sm">
          Your browser doesn't support the required features for audio recording.
          Please use a modern browser like Chrome, Firefox, or Edge.
        </AlertDescription>
        <div className="mt-3 sm:mt-4">
          <Button 
            variant="outline"
            size="sm"
            onClick={() => router.push("/not-supported")}
            className="text-xs sm:text-sm"
          >
            More Information
          </Button>
        </div>
      </Alert>
    );
  }

  // Render children if browser is compatible
  return <>{children}</>;
} 