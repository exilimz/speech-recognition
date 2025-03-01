import { Clock } from "lucide-react";
import { PixelIcon } from "@/components/ui/pixel-icon";

interface RecordingTimerProps {
  duration: number;
  maxDuration: number;
}

export function RecordingTimer({ duration, maxDuration = 10 }: RecordingTimerProps) {
  // Calculate remaining time
  const remainingTime = Math.max(maxDuration - duration, 0);
  const remainingTimeFormatted = remainingTime.toFixed(1);
  
  // Calculate progress percentage (0-100)
  const progressPercentage = (duration / maxDuration) * 100;
  
  // Determine color based on remaining time
  const getTimerColor = () => {
    if (remainingTime <= 3) return "text-destructive";
    if (remainingTime <= 5) return "text-amber-500";
    return "text-primary";
  };

  // Calculate the number of filled blocks (out of 10)
  const totalBlocks = 10;
  const filledBlocks = Math.floor((progressPercentage / 100) * totalBlocks);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center space-y-2">
        {/* Retro progress bar */}
        <div className="w-full flex items-center justify-center space-x-1">
          {Array.from({ length: totalBlocks }).map((_, index) => (
            <div
              key={index}
              className={`h-4 w-4 border-2 border-foreground ${
                index < filledBlocks 
                  ? index >= totalBlocks - 3 
                    ? 'bg-destructive' 
                    : index >= totalBlocks - 5 
                      ? 'bg-amber-500' 
                      : 'bg-primary'
                  : 'bg-transparent'
              }`}
              style={{ imageRendering: 'pixelated' }}
            />
          ))}
        </div>
        
        {/* Timer text */}
        <div className="flex items-center justify-center">
          <span className={`text-sm sm:text-base font-medium pixel-font ${getTimerColor()}`}>
            {remainingTimeFormatted}s
          </span>
        </div>
      </div>
      
      <div className="flex items-center mt-2 text-xs pixel-font text-muted-foreground">
        <Clock className="h-3 w-3 mr-1" />
        <span>MAX {maxDuration}s</span>
      </div>
    </div>
  );
} 