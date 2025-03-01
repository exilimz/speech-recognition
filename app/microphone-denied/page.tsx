"use client";

import Link from "next/link";
import { ArrowLeft, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function MicrophoneDeniedPage() {
  return (
    <div className="container max-w-4xl py-6 sm:py-12 px-4">
      <Link href="/" className="flex items-center text-xs sm:text-sm text-muted-foreground hover:text-foreground mb-6 sm:mb-8">
        <ArrowLeft className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
        Back to Home
      </Link>
      
      <div className="flex flex-col items-center mb-6 sm:mb-8">
        <Mic className="h-10 w-10 sm:h-12 sm:w-12 text-primary mb-3 sm:mb-4" />
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Enable Microphone Access</h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-2 text-center max-w-xs sm:max-w-xl">
          This application requires microphone access to record audio for transcription.
          Follow the instructions below to enable microphone access in your browser.
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6">
        <Card>
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">Chrome</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Enable microphone access in Google Chrome</CardDescription>
          </CardHeader>
          <CardContent className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
            <ol className="list-decimal pl-4 sm:pl-5 space-y-1 sm:space-y-2">
              <li>Click the lock icon (or info icon) in the address bar</li>
              <li>Find &quot;Microphone&quot; in the site settings</li>
              <li>Change the permission from &quot;Block&quot; to &quot;Allow&quot;</li>
              <li>Refresh the page</li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">Firefox</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Enable microphone access in Mozilla Firefox</CardDescription>
          </CardHeader>
          <CardContent className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
            <ol className="list-decimal pl-4 sm:pl-5 space-y-1 sm:space-y-2">
              <li>Click the lock icon in the address bar</li>
              <li>Click on &quot;Connection Secure&quot;</li>
              <li>Click &quot;More Information&quot;</li>
              <li>Go to &quot;Permissions&quot; tab</li>
              <li>Find &quot;Use the Microphone&quot; and remove the current setting</li>
              <li>Refresh the page</li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">Safari</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Enable microphone access in Safari</CardDescription>
          </CardHeader>
          <CardContent className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
            <ol className="list-decimal pl-4 sm:pl-5 space-y-1 sm:space-y-2">
              <li>Click Safari in the menu bar</li>
              <li>Select &quot;Settings for This Website&quot; (or Preferences {`>`} Websites)</li>
              <li>Find &quot;Microphone&quot; in the list</li>
              <li>Change the permission to &quot;Allow&quot;</li>
              <li>Refresh the page</li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">Edge</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Enable microphone access in Microsoft Edge</CardDescription>
          </CardHeader>
          <CardContent className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
            <ol className="list-decimal pl-4 sm:pl-5 space-y-1 sm:space-y-2">
              <li>Click the lock icon in the address bar</li>
              <li>Find &quot;Microphone&quot; in the site permissions</li>
              <li>Change the setting to &quot;Allow&quot;</li>
              <li>Refresh the page</li>
            </ol>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 sm:mt-8 flex justify-center">
        <Button asChild className="w-full sm:w-auto text-xs sm:text-sm">
          <Link href="/">
            Try Again
          </Link>
        </Button>
      </div>
    </div>
  );
} 