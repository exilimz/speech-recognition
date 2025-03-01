import Link from "next/link";
import { AlertTriangle, Chrome, Globe, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotSupportedPage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <AlertTriangle className="h-12 w-12 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Browser Not Supported</CardTitle>
          <CardDescription>
            Your browser doesn't support the required features for this application.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            The Speech-to-Text Converter requires the following browser features:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Web Audio API</li>
            <li>MediaRecorder API</li>
            <li>getUserMedia API</li>
          </ul>
          <p className="mt-4">
            Please use one of the following modern browsers:
          </p>
          <div className="flex justify-center space-x-6 mt-4">
            <div className="flex flex-col items-center">
              <Chrome className="h-10 w-10 mb-2" />
              <span>Chrome</span>
            </div>
            <div className="flex flex-col items-center">
              <Globe className="h-10 w-10 mb-2" />
              <span>Firefox</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/" passHref>
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
} 