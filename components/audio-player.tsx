import { Play, Pause, RotateCcw, Headphones } from "lucide-react";
import { RetroButton } from "@/components/ui/retro-button";
import { NesBox, NesBoxHeader, NesBoxTitle, NesBoxContent, NesBoxFooter } from "@/components/ui/nes-box";
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
    <NesBox variant="secondary" className="w-full max-w-md mx-auto">
      <NesBoxHeader>
        <div className="mr-3">
          <Headphones className="h-5 w-5 sm:h-6 sm:w-6" />
        </div>
        <NesBoxTitle className="text-sm sm:text-base">
          <span className="pixel-font">AUDIO PLAYBACK</span>
        </NesBoxTitle>
      </NesBoxHeader>
      
      <NesBoxContent className="pt-2 sm:pt-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-xs sm:text-sm pixel-font">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            
            {/* Custom progress bar with NES styling */}
            <div className="h-4 w-full bg-background border-2 border-foreground relative">
              <div 
                className="h-full bg-primary" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex justify-center space-x-3 sm:space-x-4">
            <RetroButton
              variant="outline"
              size="icon-sm"
              onClick={() => {
                stop();
                onReset();
              }}
            >
              <RotateCcw className="h-4 w-4" />
            </RetroButton>
            
            <RetroButton
              variant={isPlaying ? "secondary" : "default"}
              size="icon"
              onClick={toggle}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </RetroButton>
          </div>
        </div>
      </NesBoxContent>
      
      <NesBoxFooter className="text-xs">
        <span className="pixel-font">
          {isPlaying ? "Now Playing" : "Ready to Play"}
        </span>
      </NesBoxFooter>
    </NesBox>
  );
} 