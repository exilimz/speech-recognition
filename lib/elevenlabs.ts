import {
  SpeechRecognitionOptions,
  SpeechRecognitionResponse,
  ApiErrorResponse,
} from "./types";

/**
 * ElevenLabs API client for speech recognition
 */

// Base URL for ElevenLabs API
const ELEVENLABS_API_URL = process.env.ELEVENLABS_API_URL || "https://api.elevenlabs.io/v1";

// API key for authentication
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

/**
 * Validates that the API key is present
 */
export function validateApiKey(): boolean {
  return !!ELEVENLABS_API_KEY;
}

/**
 * Converts audio blob to base64 string
 */
export async function audioToBase64(audioBlob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove the data URL prefix (e.g., "data:audio/webm;base64,")
      const base64Data = base64String.split(",")[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(audioBlob);
  });
}

/**
 * Transcribes audio using ElevenLabs API
 */
export async function transcribeAudio(
  audioBlob: Blob,
  options: SpeechRecognitionOptions = {}
): Promise<SpeechRecognitionResponse> {
  if (!validateApiKey()) {
    throw new Error("ElevenLabs API key is missing");
  }

  try {
    // Create form data for the API request
    const formData = new FormData();
    formData.append("audio", audioBlob);
    
    // Add optional parameters if provided
    if (options.language) {
      formData.append("language", options.language);
    }
    
    if (options.transcriptionHint) {
      formData.append("transcription_hint", options.transcriptionHint);
    }

    // Make the API request
    const response = await fetch(`${ELEVENLABS_API_URL}/speech-recognition`, {
      method: "POST",
      headers: {
        "xi-api-key": ELEVENLABS_API_KEY,
        // Don't set Content-Type header when using FormData
      },
      body: formData,
    });

    // Handle API errors
    if (!response.ok) {
      const errorData = await response.json() as ApiErrorResponse;
      throw new Error(
        errorData.error?.message || `API error: ${response.status}`
      );
    }

    // Parse and return the response
    const data = await response.json() as SpeechRecognitionResponse;
    return data;
  } catch (error) {
    console.error("Error transcribing audio:", error);
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
        error.message.includes("rate limit") &&
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