import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAudioPlayer } from "@/hooks/use-audio-player";

interface AudioPlayerProps {
  audioUrl: string | null;
  onReset: () => void;
}

export function AudioPlayer({ audioUrl, onReset }: AudioPlayerProps) {
  const {
    isPlaying,
    currentTime,
    duration,
    progress,
    toggle,
    stop,
  } = useAudioPlayer({ audioUrl });

  // Format time as mm:ss
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (!audioUrl) {
    return null;
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-4 sm:pt-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-xs sm:text-sm">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="flex justify-center space-x-3 sm:space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                stop();
                onReset();
              }}
              className="rounded-full h-10 w-10 sm:h-12 sm:w-12"
            >
              <RotateCcw className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button
              variant="default"
              size="icon"
              onClick={toggle}
              className="rounded-full h-10 w-10 sm:h-12 sm:w-12"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <Play className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 