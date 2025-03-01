import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

interface TextDisplayProps {
  text: string | null;
  isLoading: boolean;
}

export function TextDisplay({ text, isLoading }: TextDisplayProps) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Transcription</span>
          {isLoading && <Spinner size="sm" />}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-32 flex items-center justify-center text-muted-foreground">
            Converting speech to text...
          </div>
        ) : text ? (
          <div className="prose prose-mint max-w-none">
            <p className="whitespace-pre-wrap break-words">{text}</p>
          </div>
        ) : (
          <div className="h-32 flex items-center justify-center text-muted-foreground">
            Record audio to see transcription here
          </div>
        )}
      </CardContent>
    </Card>
  );
} 