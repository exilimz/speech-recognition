/**
 * AssemblyAI API Types
 */

// Speech Recognition Request
export interface SpeechRecognitionRequest {
  audio: Blob;
  options?: SpeechRecognitionOptions;
}

export interface SpeechRecognitionOptions {
  language_code?: string; // Default is 'en_us' (English US)
  punctuate?: boolean; // Whether to add punctuation
  format_text?: boolean; // Whether to format text with capitalization
  speaker_labels?: boolean; // Whether to identify different speakers
}

// Speech Recognition Response
export interface SpeechRecognitionResponse {
  text: string;
  audio_duration?: number;
  confidence?: number;
  words?: WordTimestamp[];
  error?: string;
}

// Word-level timestamps (if detailed results are requested)
export interface WordTimestamp {
  text: string;
  start: number; // Start time in milliseconds
  end: number; // End time in milliseconds
  confidence: number;
}

// API Error Response
export interface ApiErrorResponse {
  error: string;
  status_code?: number;
  type?: string;
}

// Environment variables type
export interface EnvVariables {
  ASSEMBLYAI_API_KEY: string;
} 