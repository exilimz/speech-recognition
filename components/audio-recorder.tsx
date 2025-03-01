import { useState, useEffect } from "react";
import { Mic, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

  const handleStartRecording = async () => {
    setShowAlert(false);
    setIsNearLimit(false);
    await startRecording();
  };

  const handleStopRecording = () => {
    stopRecording();
  };

  // When recording is complete and we have a blob, call the callback
  if (audioBlob && !isRecording) {
    onRecordingComplete(audioBlob);
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-4 sm:pt-6">
        <div className="space-y-4">
          <div className="flex justify-center">
            {isRecording ? (
              <div className="relative">
                <div className={`absolute -inset-1 rounded-full ${isNearLimit ? 'bg-destructive/20 animate-pulse' : 'bg-primary/20 animate-pulse'}`} />
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
              <Button
                variant="destructive"
                size="lg"
                onClick={handleStopRecording}
                className="rounded-full w-12 h-12 p-0"
              >
                <Square className="h-5 w-5" />
              </Button>
            ) : (
              <Button
                variant="default"
                size="lg"
                onClick={handleStartRecording}
                className="rounded-full w-12 h-12 p-0"
              >
                <Mic className="h-5 w-5" />
              </Button>
            )}
          </div>

          {isNearLimit && isRecording && (
            <Alert className="bg-amber-500/10 text-amber-500 border-amber-500/20">
              <AlertDescription className="text-xs">
                Recording will automatically stop in {(10 - duration).toFixed(1)} seconds
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 