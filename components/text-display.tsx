import { LoadingState } from "@/components/loading-state";
import { NesBox, NesBoxHeader, NesBoxTitle, NesBoxContent, NesBoxFooter } from "@/components/ui/nes-box";
import { TypewriterEffect } from "@/components/typewriter-effect";
import { MessageSquare } from "lucide-react";

interface TextDisplayProps {
  text: string | null;
  isLoading: boolean;
}

export function TextDisplay({ text, isLoading }: TextDisplayProps) {
  // Choose the appropriate NES box variant
  const boxVariant = text ? "terminal" : "primary";
  
  return (
    <NesBox 
      variant={boxVariant}
      className="w-full max-w-md mx-auto"
    >
      <NesBoxHeader>
        <div className="mr-3">
          <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6" />
        </div>
        <NesBoxTitle className="text-sm sm:text-base flex items-center justify-between w-full">
          <span className="pixel-font">NERV TRANSCRIPTION</span>
          {isLoading && <LoadingState type="inline" size="sm" />}
        </NesBoxTitle>
      </NesBoxHeader>
      
      <NesBoxContent>
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
          <div className="max-w-none">
            <p className="whitespace-pre-wrap break-words text-sm sm:text-base font-mono">
              <TypewriterEffect 
                text={text} 
                speed={30}
                className="pixel-font"
              />
            </p>
          </div>
        ) : (
          <div className="h-24 sm:h-32 flex items-center justify-center text-xs sm:text-sm pixel-font">
            Record audio to see transcription here
          </div>
        )}
      </NesBoxContent>
      
      <NesBoxFooter className="text-xs">
        {text ? (
          <span>Press A to continue</span>
        ) : (
          <span>NERV System v1.0.1</span>
        )}
      </NesBoxFooter>
    </NesBox>
  );
} 