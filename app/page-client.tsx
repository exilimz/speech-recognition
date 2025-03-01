"use client";

import { useState } from "react";
import { AudioRecorder } from "@/components/audio-recorder";
import { AudioPlayer } from "@/components/audio-player";
import { TextDisplay } from "@/components/text-display";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Mic, Wand2 } from "lucide-react";

enum AppState {
  INITIAL = "initial",
  RECORDING = "recording",
  RECORDED = "recorded",
  TRANSCRIBING = "transcribing",
  TRANSCRIBED = "transcribed",
}

export function SpeechToTextClient() {
  const [appState, setAppState] = useState<AppState>(AppState.INITIAL);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [transcribedText, setTranscribedText] = useState<string | null>(null);

  // Handle when recording is complete
  const handleRecordingComplete = (blob: Blob) => {
    setAudioBlob(blob);
    setAudioUrl(URL.createObjectURL(blob));
    setAppState(AppState.RECORDED);
  };

  // Reset the recording
  const handleReset = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioBlob(null);
    setAudioUrl(null);
    setTranscribedText(null);
    setAppState(AppState.INITIAL);
  };

  // Transcribe the audio
  const handleTranscribe = async () => {
    if (!audioBlob) return;

    try {
      setAppState(AppState.TRANSCRIBING);

      // Create a FormData object to send the audio file
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.webm");

      // Send the audio to the API
      const response = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      setTranscribedText(data.text);
      setAppState(AppState.TRANSCRIBED);
    } catch (error) {
      console.error("Error transcribing audio:", error);
      // In a real app, you would handle this error properly
      setAppState(AppState.RECORDED);
    }
  };

  return (
    <div className="flex flex-col space-y-8 w-full max-w-2xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Speech-to-Text Converter</h1>
        <p className="text-muted-foreground">
          Record your voice and convert it to text using AI
        </p>
      </div>

      {/* Show recorder in initial state */}
      {appState === AppState.INITIAL && (
        <AudioRecorder onRecordingComplete={handleRecordingComplete} />
      )}

      {/* Show audio player after recording */}
      {(appState === AppState.RECORDED || appState === AppState.TRANSCRIBED) && (
        <AudioPlayer audioUrl={audioUrl} onReset={handleReset} />
      )}

      {/* Show transcribe button after recording */}
      {appState === AppState.RECORDED && (
        <div className="flex justify-center">
          <Button
            onClick={handleTranscribe}
            className="flex items-center gap-2"
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
            className="flex items-center gap-2"
          >
            <Mic className="h-5 w-5" />
            New Recording
          </Button>
        </div>
      )}
    </div>
  );
} 