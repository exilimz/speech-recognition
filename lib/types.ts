/**
 * ElevenLabs API Types
 */

// Speech Recognition Request
export interface SpeechRecognitionRequest {
  audio: Blob;
  options?: SpeechRecognitionOptions;
}

export interface SpeechRecognitionOptions {
  language?: string; // Default is 'en' (English)
  transcriptionHint?: string; // Optional hint to improve transcription accuracy
  callbackUrl?: string; // Optional callback URL for async processing
}

// Speech Recognition Response
export interface SpeechRecognitionResponse {
  text: string;
  language: string;
  confidence: number;
  words?: WordTimestamp[];
  error?: string;
}

// Word-level timestamps (if detailed results are requested)
export interface WordTimestamp {
  word: string;
  start: number; // Start time in seconds
  end: number; // End time in seconds
  confidence: number;
}

// API Error Response
export interface ApiErrorResponse {
  error: {
    message: string;
    status: number;
    type: string;
  };
}

// Environment variables type
export interface EnvVariables {
  ELEVENLABS_API_KEY: string;
  ELEVENLABS_API_URL: string;
} 