import Link from "next/link";
import { AlertTriangle, Chrome, Globe, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotSupportedPage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-4 sm:p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-2 sm:pb-4">
          <div className="flex justify-center mb-2 sm:mb-4">
            <AlertTriangle className="h-10 w-10 sm:h-12 sm:w-12 text-destructive" />
          </div>
          <CardTitle className="text-xl sm:text-2xl">Browser Not Supported</CardTitle>
          <CardDescription className="text-xs sm:text-sm mt-1 sm:mt-2">
            Your browser doesn't support the required features for this application.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
          <p>
            The Speech-to-Text Converter requires the following browser features:
          </p>
          <ul className="list-disc pl-5 sm:pl-6 space-y-1 sm:space-y-2">
            <li>Web Audio API</li>
            <li>MediaRecorder API</li>
            <li>getUserMedia API</li>
          </ul>
          <p className="mt-2 sm:mt-4">
            Please use one of the following modern browsers:
          </p>
          <div className="flex justify-center space-x-4 sm:space-x-6 mt-2 sm:mt-4">
            <div className="flex flex-col items-center">
              <Chrome className="h-8 w-8 sm:h-10 sm:w-10 mb-1 sm:mb-2" />
              <span>Chrome</span>
            </div>
            <div className="flex flex-col items-center">
              <Globe className="h-8 w-8 sm:h-10 sm:w-10 mb-1 sm:mb-2" />
              <span>Firefox</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center pt-2 sm:pt-4">
          <Link href="/" passHref>
            <Button variant="outline" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
              Back to Home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
} 