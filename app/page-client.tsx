"use client";

import { useState, useCallback } from "react";
import { AudioRecorder } from "@/components/audio-recorder";
import { AudioPlayer } from "@/components/audio-player";
import { TextDisplay } from "@/components/text-display";
import { Button } from "@/components/ui/button";
import { Mic, Wand2, Clock } from "lucide-react";
import { ApiError } from "@/components/api-error";
import { ApiErrorResponse } from "@/lib/types";
import { LoadingState } from "@/components/loading-state";

enum AppState {
  INITIAL = "initial",
  RECORDING = "recording",
  RECORDED = "recorded",
  TRANSCRIBING = "transcribing",
  TRANSCRIBED = "transcribed",
  ERROR = "error",
  LOADING = "loading",
}

export function SpeechToTextClient() {
  const [appState, setAppState] = useState<AppState>(AppState.INITIAL);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [transcribedText, setTranscribedText] = useState<string | null>(null);
  const [error, setError] = useState<ApiErrorResponse | Error | string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  // Simulate initialization process (checking permissions, loading resources, etc.)
  useState(() => {
    // In a real app, this would be actual initialization logic
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  });

  // Handle when recording is complete
  const handleRecordingComplete = (blob: Blob) => {
    setAppState(AppState.LOADING);
    
    // Simulate processing the audio blob
    setTimeout(() => {
      setAudioBlob(blob);
      setAudioUrl(URL.createObjectURL(blob));
      setAppState(AppState.RECORDED);
      // Clear any previous errors
      setError(null);
    }, 500);
  };

  // Reset the recording
  const handleReset = useCallback(() => {
    setIsResetting(true);
    setAppState(AppState.LOADING);
    
    // Simulate cleanup
    setTimeout(() => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
      setAudioBlob(null);
      setAudioUrl(null);
      setTranscribedText(null);
      setError(null);
      setAppState(AppState.INITIAL);
      setIsResetting(false);
    }, 300);
  }, [audioUrl]);

  // Transcribe the audio
  const handleTranscribe = useCallback(async () => {
    if (!audioBlob) return;

    try {
      setIsTranscribing(true);
      setAppState(AppState.TRANSCRIBING);
      setError(null);

      // Create a FormData object to send the audio file
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.webm");

      // Send the audio to the API
      const response = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData);
        setAppState(AppState.ERROR);
        setIsTranscribing(false);
        return;
      }

      const data = await response.json();
      setTranscribedText(data.text);
      setAppState(AppState.TRANSCRIBED);
      setIsTranscribing(false);
    } catch (error) {
      console.error("Error transcribing audio:", error);
      setError(error instanceof Error ? error : "Failed to transcribe audio. Please try again.");
      setAppState(AppState.ERROR);
      setIsTranscribing(false);
    }
  }, [audioBlob]);

  // Retry transcription after an error
  const handleRetry = useCallback(() => {
    setIsRetrying(true);
    
    setTimeout(() => {
      if (audioBlob) {
        handleTranscribe();
      } else {
        setAppState(AppState.INITIAL);
      }
      setIsRetrying(false);
    }, 300);
  }, [audioBlob, handleTranscribe]);

  // Show initial loading state
  if (isInitializing) {
    return (
      <div className="flex flex-col space-y-6 sm:space-y-8 w-full max-w-2xl mx-auto">
        <LoadingState 
          type="full" 
          text="Initializing application..." 
          size="lg" 
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-6 sm:space-y-8 w-full max-w-2xl mx-auto">
      <div className="text-center px-2">
        <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Speech-to-Text Converter</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Record your voice and convert it to text using AI
        </p>
        <div className="flex items-center justify-center mt-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          <span>Maximum recording time: 10 seconds</span>
        </div>
      </div>

      {/* Show error message if there's an error */}
      {appState === AppState.ERROR && error && (
        <ApiError error={error} onRetry={handleRetry} />
      )}

      {/* Show loading state */}
      {appState === AppState.LOADING && (
        <LoadingState 
          type="card" 
          text="Processing audio..." 
          size="md" 
        />
      )}

      {/* Show recorder in initial state */}
      {appState === AppState.INITIAL && (
        <AudioRecorder onRecordingComplete={handleRecordingComplete} />
      )}

      {/* Show audio player after recording */}
      {(appState === AppState.RECORDED || appState === AppState.TRANSCRIBED || appState === AppState.ERROR) && audioUrl && (
        <AudioPlayer audioUrl={audioUrl} onReset={handleReset} />
      )}

      {/* Show transcribe button after recording */}
      {appState === AppState.RECORDED && (
        <div className="flex justify-center">
          <Button
            onClick={handleTranscribe}
            className="flex items-center gap-2 w-full sm:w-auto"
            size="lg"
            disabled={isTranscribing}
          >
            {isTranscribing ? (
              <LoadingState type="button" />
            ) : (
              <Wand2 className="h-5 w-5" />
            )}
            {isTranscribing ? "Transcribing..." : "Transcribe Audio"}
          </Button>
        </div>
      )}

      {/* Show text display when transcribing or transcribed */}
      {(appState === AppState.TRANSCRIBING || appState === AppState.TRANSCRIBED) && (
        <TextDisplay
          text={transcribedText}
          isLoading={appState === AppState.TRANSCRIBING}
        />
      )}

      {/* Show new recording button after transcription */}
      {appState === AppState.TRANSCRIBED && (
        <div className="flex justify-center">
          <Button
            onClick={handleReset}
            variant="outline"
            className="flex items-center gap-2 w-full sm:w-auto"
            disabled={isResetting}
          >
            {isResetting ? (
              <LoadingState type="button" />
            ) : (
              <Mic className="h-5 w-5" />
            )}
            {isResetting ? "Resetting..." : "New Recording"}
          </Button>
        </div>
      )}

      {/* Show retry button in error state if no error component is shown */}
      {appState === AppState.ERROR && !error && (
        <div className="flex justify-center">
          <Button
            onClick={handleRetry}
            variant="outline"
            className="flex items-center gap-2 w-full sm:w-auto"
            disabled={isRetrying}
          >
            {isRetrying ? (
              <LoadingState type="button" />
            ) : (
              <Wand2 className="h-5 w-5" />
            )}
            {isRetrying ? "Retrying..." : "Retry Transcription"}
          </Button>
        </div>
      )}
    </div>
  );
} 