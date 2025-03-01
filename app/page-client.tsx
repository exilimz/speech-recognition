"use client";

import { useState } from "react";
import { AudioRecorder } from "@/components/audio-recorder";
import { AudioPlayer } from "@/components/audio-player";
import { TextDisplay } from "@/components/text-display";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Mic, Wand2, Clock } from "lucide-react";
import { ApiError } from "@/components/api-error";
import { ApiErrorResponse } from "@/lib/types";

enum AppState {
  INITIAL = "initial",
  RECORDING = "recording",
  RECORDED = "recorded",
  TRANSCRIBING = "transcribing",
  TRANSCRIBED = "transcribed",
  ERROR = "error",
}

export function SpeechToTextClient() {
  const [appState, setAppState] = useState<AppState>(AppState.INITIAL);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [transcribedText, setTranscribedText] = useState<string | null>(null);
  const [error, setError] = useState<ApiErrorResponse | Error | string | null>(null);

  // Handle when recording is complete
  const handleRecordingComplete = (blob: Blob) => {
    setAudioBlob(blob);
    setAudioUrl(URL.createObjectURL(blob));
    setAppState(AppState.RECORDED);
    // Clear any previous errors
    setError(null);
  };

  // Reset the recording
  const handleReset = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioBlob(null);
    setAudioUrl(null);
    setTranscribedText(null);
    setError(null);
    setAppState(AppState.INITIAL);
  };

  // Transcribe the audio
  const handleTranscribe = async () => {
    if (!audioBlob) return;

    try {
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
        return;
      }

      const data = await response.json();
      setTranscribedText(data.text);
      setAppState(AppState.TRANSCRIBED);
    } catch (error) {
      console.error("Error transcribing audio:", error);
      setError(error instanceof Error ? error : "Failed to transcribe audio. Please try again.");
      setAppState(AppState.ERROR);
    }
  };

  // Retry transcription after an error
  const handleRetry = () => {
    if (audioBlob) {
      handleTranscribe();
    } else {
      setAppState(AppState.INITIAL);
    }
  };

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
          >
            <Wand2 className="h-5 w-5" />
            Transcribe Audio
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
          >
            <Mic className="h-5 w-5" />
            New Recording
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
          >
            <Wand2 className="h-5 w-5" />
            Retry Transcription
          </Button>
        </div>
      )}
    </div>
  );
} 