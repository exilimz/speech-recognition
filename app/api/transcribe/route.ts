import { NextRequest, NextResponse } from "next/server";
import { transcribeAudio, validateApiKey, withRetry } from "@/lib/assemblyai";
import { SpeechRecognitionOptions } from "@/lib/types";

/**
 * API route for transcribing audio
 */
export async function POST(request: NextRequest) {
  // Check if API key is configured
  if (!validateApiKey()) {
    return NextResponse.json(
      { error: "API key is not configured" },
      { status: 500 }
    );
  }

  try {
    // Parse the multipart form data
    const formData = await request.formData();
    const audioFile = formData.get("audio") as File | null;

    // Validate the audio file
    if (!audioFile) {
      return NextResponse.json(
        { error: "No audio file provided" },
        { status: 400 }
      );
    }

    // Get optional parameters
    const language = formData.get("language_code") as string | null;
    const punctuate = formData.get("punctuate") === "true";
    const formatText = formData.get("format_text") === "true";
    const speakerLabels = formData.get("speaker_labels") === "true";

    // Create options object
    const options: SpeechRecognitionOptions = {};
    if (language) options.language_code = language;
    if (punctuate !== undefined) options.punctuate = punctuate;
    if (formatText !== undefined) options.format_text = formatText;
    if (speakerLabels !== undefined) options.speaker_labels = speakerLabels;

    // Convert File to Blob
    const audioBlob = new Blob([await audioFile.arrayBuffer()], {
      type: audioFile.type,
    });

    // Transcribe the audio with retry logic for rate limiting
    const result = await withRetry(() => transcribeAudio(audioBlob, options));

    // Return the transcription result
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in transcribe API route:", error);
    
    // Return appropriate error response
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}

// Set the maximum content length for the request (100MB)
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "100mb",
    },
  },
}; 