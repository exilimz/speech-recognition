import { Loader2 } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent } from "@/components/ui/card";

export type LoadingType = "button" | "inline" | "full" | "overlay" | "card";

interface LoadingStateProps {
  type?: LoadingType;
  text?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingState({
  type = "inline",
  text,
  size = "md",
  className = "",
}: LoadingStateProps) {
  // Button loading state (used inside buttons)
  if (type === "button") {
    return <Loader2 className={`h-4 w-4 mr-2 animate-spin ${className}`} />;
  }

  // Inline loading state (used inline with text)
  if (type === "inline") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Spinner size={size} />
        {text && <span className="text-sm text-muted-foreground">{text}</span>}
      </div>
    );
  }

  // Full loading state (used for full page loading)
  if (type === "full") {
    return (
      <div className={`flex flex-col items-center justify-center min-h-[200px] ${className}`}>
        <Spinner size={size === "sm" ? "md" : size} />
        {text && (
          <p className="mt-4 text-sm sm:text-base text-muted-foreground text-center">
            {text}
          </p>
        )}
      </div>
    );
  }

  // Overlay loading state (used for overlaying content)
  if (type === "overlay") {
    return (
      <div className={`absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10 ${className}`}>
        <div className="flex flex-col items-center">
          <Spinner size={size} />
          {text && (
            <p className="mt-2 text-sm text-muted-foreground">{text}</p>
          )}
        </div>
      </div>
    );
  }

  // Card loading state (used inside cards)
  if (type === "card") {
    return (
      <Card className={`w-full ${className}`}>
        <CardContent className="flex flex-col items-center justify-center py-6">
          <Spinner size={size} />
          {text && (
            <p className="mt-4 text-sm text-muted-foreground">{text}</p>
          )}
        </CardContent>
      </Card>
    );
  }

  // Default fallback
  return <Spinner size={size} className={className} />;
} 