import { useState } from "react";
import { Mic, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAudioRecorder } from "@/hooks/use-audio-recorder";

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
  } = useAudioRecorder();

  const [showAlert, setShowAlert] = useState(false);

  // Calculate progress percentage (0-100) based on duration (0-10 seconds)
  const progressPercentage = Math.min((duration / 10) * 100, 100);

  const handleStartRecording = async () => {
    setShowAlert(false);
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
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex justify-center">
            {isRecording ? (
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-primary/20 animate-pulse" />
                <Mic className="h-16 w-16 text-primary" />
              </div>
            ) : (
              <Mic className="h-16 w-16 text-muted-foreground" />
            )}
          </div>

          {isRecording && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Recording</span>
                <span>{duration.toFixed(1)}s / 10s</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
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