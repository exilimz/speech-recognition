import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingState } from "@/components/loading-state";

interface TextDisplayProps {
  text: string | null;
  isLoading: boolean;
}

export function TextDisplay({ text, isLoading }: TextDisplayProps) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="pb-2 sm:pb-4">
        <CardTitle className="flex items-center justify-between text-base sm:text-lg">
          <span>Transcription</span>
          {isLoading && <LoadingState type="inline" size="sm" />}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-24 sm:h-32 relative">
            <LoadingState 
              type="overlay" 
              text="Converting speech to text..." 
              size="md"
              className="rounded-md"
            />
          </div>
        ) : text ? (
          <div className="prose prose-mint max-w-none">
            <p className="whitespace-pre-wrap break-words text-sm sm:text-base">{text}</p>
          </div>
        ) : (
          <div className="h-24 sm:h-32 flex items-center justify-center text-sm sm:text-base text-muted-foreground">
            Record audio to see transcription here
          </div>
        )}
      </CardContent>
    </Card>
  );
} 