import { Clock } from "lucide-react";

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
  
  // Calculate the circle's circumference and stroke-dashoffset for small and large screens
  const smallRadius = 20;
  const largeRadius = 24;
  const smallCircumference = 2 * Math.PI * smallRadius;
  const largeCircumference = 2 * Math.PI * largeRadius;
  const smallDashOffset = smallCircumference * (1 - progressPercentage / 100);
  const largeDashOffset = largeCircumference * (1 - progressPercentage / 100);
  
  // Determine color based on remaining time
  const getTimerColor = () => {
    if (remainingTime <= 3) return "text-destructive";
    if (remainingTime <= 5) return "text-amber-500";
    return "text-primary";
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center">
        {/* Mobile version */}
        <svg width="56" height="56" className="transform -rotate-90 sm:hidden">
          <circle
            cx="28"
            cy="28"
            r={smallRadius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="3"
            className="text-muted/20"
          />
          <circle
            cx="28"
            cy="28"
            r={smallRadius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray={smallCircumference}
            strokeDashoffset={smallDashOffset}
            strokeLinecap="round"
            className={getTimerColor()}
          />
        </svg>
        
        {/* Desktop version */}
        <svg width="64" height="64" className="transform -rotate-90 hidden sm:block">
          <circle
            cx="32"
            cy="32"
            r={largeRadius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="4"
            className="text-muted/20"
          />
          <circle
            cx="32"
            cy="32"
            r={largeRadius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="4"
            strokeDasharray={largeCircumference}
            strokeDashoffset={largeDashOffset}
            strokeLinecap="round"
            className={getTimerColor()}
          />
        </svg>
        
        {/* Timer text in the center */}
        <div className="absolute flex flex-col items-center justify-center">
          <span className={`text-xs sm:text-sm font-medium ${getTimerColor()}`}>
            {remainingTimeFormatted}s
          </span>
        </div>
      </div>
      
      <div className="flex items-center mt-1 sm:mt-2 text-xs text-muted-foreground">
        <Clock className="h-3 w-3 mr-1" />
        <span>Max {maxDuration}s</span>
      </div>
    </div>
  );
} 