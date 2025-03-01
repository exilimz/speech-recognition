import { useState, useEffect } from "react";
import { Mic, Square } from "lucide-react";
import { RetroButton } from "@/components/ui/retro-button";
import { NesBox, NesBoxHeader, NesBoxTitle, NesBoxContent, NesBoxFooter } from "@/components/ui/nes-box";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAudioRecorder } from "@/hooks/use-audio-recorder";
import { RecordingTimer } from "@/components/recording-timer";

interface AudioRecorderProps {
  onRecordingComplete: (blob: Blob) => void;
}

export function AudioRecorder({ onRecordingComplete }: AudioRecorderProps) {
  const {
    isRecording,
    audioBlob,
    duration,
    startRecording,
    stopRecording,
    error,
  } = useAudioRecorder({ maxDuration: 10 });

  const [showAlert, setShowAlert] = useState(false);
  const [isNearLimit, setIsNearLimit] = useState(false);

  // Check if we're approaching the time limit
  useEffect(() => {
    if (isRecording) {
      setIsNearLimit(duration > 8); // Show warning when less than 2 seconds remain
      
      // Auto-stop at exactly 10 seconds
      if (duration >= 10) {
        stopRecording();
      }
    } else {
      setIsNearLimit(false);
    }
  }, [duration, isRecording, stopRecording]);

  // Move the callback to useEffect to avoid calling during render
  useEffect(() => {
    // When recording is complete and we have a blob, call the callback
    if (audioBlob && !isRecording) {
      onRecordingComplete(audioBlob);
    }
  }, [audioBlob, isRecording, onRecordingComplete]);

  const handleStartRecording = async () => {
    setShowAlert(false);
    setIsNearLimit(false);
    await startRecording();
  };

  const handleStopRecording = () => {
    stopRecording();
  };

  return (
    <NesBox className="w-full max-w-md mx-auto">
      <NesBoxHeader>
        <div className="mr-3">
          <Mic className="h-5 w-5 sm:h-6 sm:w-6" />
        </div>
        <NesBoxTitle className="text-sm sm:text-base">
          <span className="pixel-font">AUDIO RECORDER</span>
        </NesBoxTitle>
      </NesBoxHeader>
      
      <NesBoxContent className="pt-2 sm:pt-4">
        <div className="space-y-4">
          <div className="flex justify-center">
            {isRecording ? (
              <div className="relative">
                <div className={`absolute -inset-1 ${isNearLimit ? 'bg-destructive/20 animate-pulse' : 'bg-primary/20 animate-pulse'}`} />
                <Mic className={`h-12 sm:h-16 w-12 sm:w-16 ${isNearLimit ? 'text-destructive' : 'text-primary'}`} />
              </div>
            ) : (
              <Mic className="h-12 sm:h-16 w-12 sm:w-16 text-muted-foreground" />
            )}
          </div>

          {isRecording && (
            <div className="flex justify-center">
              <RecordingTimer duration={duration} maxDuration={10} />
            </div>
          )}

          <div className="flex justify-center">
            {isRecording ? (
              <RetroButton
                variant="destructive"
                size="icon"
                onClick={handleStopRecording}
              >
                <Square className="h-5 w-5" />
              </RetroButton>
            ) : (
              <RetroButton
                variant="default"
                size="icon"
                onClick={handleStartRecording}
              >
                <Mic className="h-5 w-5" />
              </RetroButton>
            )}
          </div>

          {isNearLimit && isRecording && (
            <Alert className="bg-amber-500/10 text-amber-500 border-amber-500/20">
              <AlertDescription className="text-xs pixel-font">
                Recording will automatically stop in {(10 - duration).toFixed(1)} seconds
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertDescription className="text-xs pixel-font">{error}</AlertDescription>
            </Alert>
          )}
        </div>
      </NesBoxContent>
      
      <NesBoxFooter className="text-xs">
        <span className="pixel-font">
          {isRecording ? "Press STOP when finished" : "Press MIC to start recording"}
        </span>
      </NesBoxFooter>
    </NesBox>
  );
} 