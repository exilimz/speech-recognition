"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ApiErrorResponse } from "@/lib/types";

interface ApiErrorProps {
  error: ApiErrorResponse | Error | string;
  onRetry?: () => void;
}

export function ApiError({ error, onRetry }: ApiErrorProps) {
  // Extract error message based on error type
  const getErrorMessage = () => {
    if (typeof error === "string") {
      return error;
    } else if (error instanceof Error) {
      return error.message;
    } else if (typeof error === "object" && error !== null && "error" in error) {
      // Handle ApiErrorResponse type
      const apiError = error as ApiErrorResponse;
      if (typeof apiError.error === "object" && apiError.error !== null && "message" in apiError.error) {
        return apiError.error.message;
      }
      return String(apiError.error);
    }
    return "An unknown error occurred";
  };

  // Extract error code if available
  const getErrorCode = () => {
    if (typeof error === "object" && error !== null && "error" in error) {
      const apiError = error as ApiErrorResponse;
      if (typeof apiError.error === "object" && apiError.error !== null && "status" in apiError.error) {
        return apiError.error.status;
      }
    }
    return null;
  };

  const errorMessage = getErrorMessage();
  const errorCode = getErrorCode();

  // Determine if the error is related to API key
  const isApiKeyError = 
    errorMessage.includes("API key") || 
    errorMessage.includes("authentication") || 
    errorMessage.includes("unauthorized") ||
    errorCode === 401;

  // Determine if the error is related to rate limiting
  const isRateLimitError = 
    errorMessage.includes("rate limit") || 
    errorMessage.includes("too many requests") ||
    errorCode === 429;

  return (
    <Alert variant="destructive" className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>
        {isApiKeyError 
          ? "API Key Error" 
          : isRateLimitError 
            ? "Rate Limit Exceeded" 
            : "Transcription Error"}
      </AlertTitle>
      <AlertDescription className="flex flex-col gap-2">
        <p>{errorMessage}</p>
        
        {isApiKeyError && (
          <p className="text-sm">
            Please check that your ElevenLabs API key is correctly configured in the server environment.
          </p>
        )}
        
        {isRateLimitError && (
          <p className="text-sm">
            You have exceeded the rate limit for the ElevenLabs API. Please wait a moment before trying again.
          </p>
        )}
        
        {onRetry && (
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2 w-fit" 
            onClick={onRetry}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
} 