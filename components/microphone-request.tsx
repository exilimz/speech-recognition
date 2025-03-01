"use client";

import { useState, useEffect } from "react";
import { Mic, MicOff } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface MicrophoneRequestProps {
  children: React.ReactNode;
  onPermissionDenied: () => void;
}

export function MicrophoneRequest({ 
  children, 
  onPermissionDenied 
}: MicrophoneRequestProps) {
  const [permissionState, setPermissionState] = useState<
    "unknown" | "granted" | "denied" | "prompt"
  >("unknown");
  const router = useRouter();

  useEffect(() => {
    // Check if browser supports permissions API
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions
        .query({ name: "microphone" as PermissionName })
        .then((permissionStatus) => {
          setPermissionState(permissionStatus.state);

          // Listen for permission changes
          permissionStatus.onchange = () => {
            setPermissionState(permissionStatus.state);
            
            if (permissionStatus.state === "denied") {
              onPermissionDenied();
            }
          };
        })
        .catch((error) => {
          console.error("Error checking microphone permission:", error);
        });
    } else {
      // Fallback for browsers that don't support permissions API
      // We'll check when the user tries to record
      setPermissionState("prompt");
    }
  }, [onPermissionDenied]);

  const requestMicrophoneAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Stop all tracks immediately after getting permission
      stream.getTracks().forEach((track) => track.stop());
      setPermissionState("granted");
    } catch (error) {
      console.error("Error requesting microphone access:", error);
      setPermissionState("denied");
      onPermissionDenied();
    }
  };

  if (permissionState === "unknown") {
    return (
      <div className="flex items-center justify-center min-h-[150px] sm:min-h-[200px]">
        <p className="text-sm sm:text-base text-muted-foreground">Checking microphone access...</p>
      </div>
    );
  }

  if (permissionState === "denied") {
    return (
      <Alert variant="destructive">
        <MicOff className="h-4 w-4" />
        <AlertTitle className="text-sm sm:text-base">Microphone Access Denied</AlertTitle>
        <AlertDescription className="text-xs sm:text-sm">
          This application requires microphone access to record audio.
          Please enable microphone access in your browser settings.
        </AlertDescription>
        <div className="mt-3 sm:mt-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => router.push("/microphone-denied")}
            className="text-xs sm:text-sm"
          >
            How to Enable Microphone
          </Button>
        </div>
      </Alert>
    );
  }

  if (permissionState === "prompt") {
    return (
      <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4 p-4 sm:p-6 border rounded-lg">
        <Mic className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
        <h2 className="text-lg sm:text-xl font-semibold">Microphone Access Required</h2>
        <p className="text-center text-xs sm:text-sm text-muted-foreground max-w-xs sm:max-w-sm">
          This application needs access to your microphone to record audio for transcription.
        </p>
        <Button onClick={requestMicrophoneAccess} className="w-full sm:w-auto">
          Allow Microphone Access
        </Button>
      </div>
    );
  }

  // If permission is granted, render children
  return <>{children}</>;
} 