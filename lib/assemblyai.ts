import { AssemblyAI } from 'assemblyai';
import {
  SpeechRecognitionOptions,
  SpeechRecognitionResponse,
  ApiErrorResponse,
} from "./types";

/**
 * AssemblyAI API client for speech recognition
 */

// API key for authentication
const ASSEMBLYAI_API_KEY = process.env.ASSEMBLYAI_API_KEY || "57f3950ce37543a7b73414c48a66df75";

/**
 * Validates that the API key is present
 */
export function validateApiKey(): boolean {
  return !!ASSEMBLYAI_API_KEY;
}

/**
 * Converts audio blob to a temporary URL for AssemblyAI
 */
export async function uploadAudioToTemporaryUrl(audioBlob: Blob): Promise<string> {
  // Initialize AssemblyAI client
  const client = new AssemblyAI({
    apiKey: ASSEMBLYAI_API_KEY
  });

  // Create a file from the blob
  const file = new File([audioBlob], "recording.webm", { type: audioBlob.type });

  try {
    // Upload the file to get a temporary URL
    const uploadResponse = await client.files.upload(file);
    console.log("Upload response:", uploadResponse);
    
    // According to AssemblyAI docs, the upload response should directly be the URL string
    if (typeof uploadResponse === 'string') {
      return uploadResponse;
    } 
    
    // Handle object response with proper type assertion
    const responseObj = uploadResponse as Record<string, unknown>;
    
    if (responseObj && 'upload_url' in responseObj) {
      return responseObj.upload_url as string;
    } 
    
    if (responseObj && 'url' in responseObj) {
      return responseObj.url as string;
    }
    
    throw new Error("Invalid upload response format from AssemblyAI");
  } catch (error) {
    console.error("Error uploading audio:", error);
    throw error;
  }
}

/**
 * Transcribes audio using AssemblyAI API
 */
export async function transcribeAudio(
  audioBlob: Blob,
  options: SpeechRecognitionOptions = {}
): Promise<SpeechRecognitionResponse> {
  if (!validateApiKey()) {
    throw new Error("AssemblyAI API key is missing");
  }

  try {
    // Initialize AssemblyAI client
    const client = new AssemblyAI({
      apiKey: ASSEMBLYAI_API_KEY
    });

    // Upload the audio to get a temporary URL
    const audioUrl = await uploadAudioToTemporaryUrl(audioBlob);
    console.log("Audio URL for transcription:", audioUrl);

    // Configure transcription options according to AssemblyAI SDK
    const transcriptionParams = {
      audio_url: audioUrl,
      ...(options.language_code && { language_code: options.language_code }),
      ...(options.punctuate !== undefined && { punctuate: options.punctuate }),
      ...(options.format_text !== undefined && { format_text: options.format_text }),
      ...(options.speaker_labels !== undefined && { speaker_labels: options.speaker_labels })
    };

    console.log("Transcription params:", transcriptionParams);

    // Transcribe the audio
    const transcript = await client.transcripts.transcribe({
      audio_url: audioUrl,
      ...(options.language_code && { language_code: options.language_code }),
      ...(options.punctuate !== undefined && { punctuate: options.punctuate }),
      ...(options.format_text !== undefined && { format_text: options.format_text }),
      ...(options.speaker_labels !== undefined && { speaker_labels: options.speaker_labels })
    });
    
    console.log("Transcription response:", transcript);

    // Map the response to our standardized format
    const response: SpeechRecognitionResponse = {
      text: transcript.text || "",
      audio_duration: transcript.audio_duration ?? undefined,
      confidence: transcript.confidence ?? undefined,
      words: transcript.words?.map(word => ({
        text: word.text,
        start: word.start,
        end: word.end,
        confidence: word.confidence
      }))
    };

    return response;
  } catch (error) {
    console.error("Error transcribing audio:", error);
    
    // Format the error response
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    
    throw error;
  }
}

/**
 * Handles API rate limiting by implementing exponential backoff
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  initialDelay = 1000
): Promise<T> {
  let retries = 0;
  
  while (true) {
    try {
      return await fn();
    } catch (error) {
      if (
        error instanceof Error &&
        (error.message.includes("rate limit") || error.message.includes("too many requests")) &&
        retries < maxRetries
      ) {
        // Calculate delay with exponential backoff
        const delay = initialDelay * Math.pow(2, retries);
        console.log(`Rate limited. Retrying in ${delay}ms...`);
        
        // Wait before retrying
        await new Promise((resolve) => setTimeout(resolve, delay));
        retries++;
      } else {
        throw error;
      }
    }
  }
} 