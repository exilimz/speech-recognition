"use client";

import Link from "next/link";
import { ArrowLeft, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function MicrophoneDeniedPage() {
  return (
    <div className="container max-w-4xl py-12">
      <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>
      
      <div className="flex flex-col items-center mb-8">
        <Mic className="h-12 w-12 text-primary mb-4" />
        <h1 className="text-3xl font-bold tracking-tight">Enable Microphone Access</h1>
        <p className="text-muted-foreground mt-2 text-center max-w-xl">
          This application requires microphone access to record audio for transcription.
          Follow the instructions below to enable microphone access in your browser.
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Chrome</CardTitle>
            <CardDescription>Enable microphone access in Google Chrome</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <ol className="list-decimal pl-5 space-y-2">
              <li>Click the lock icon (or info icon) in the address bar</li>
              <li>Find &quot;Microphone&quot; in the site settings</li>
              <li>Change the permission from &quot;Block&quot; to &quot;Allow&quot;</li>
              <li>Refresh the page</li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Firefox</CardTitle>
            <CardDescription>Enable microphone access in Mozilla Firefox</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <ol className="list-decimal pl-5 space-y-2">
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
          <CardHeader>
            <CardTitle>Safari</CardTitle>
            <CardDescription>Enable microphone access in Safari</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <ol className="list-decimal pl-5 space-y-2">
              <li>Click Safari in the menu bar</li>
              <li>Select &quot;Settings for This Website&quot; (or Preferences {`>`} Websites)</li>
              <li>Find &quot;Microphone&quot; in the list</li>
              <li>Change the permission to &quot;Allow&quot;</li>
              <li>Refresh the page</li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Edge</CardTitle>
            <CardDescription>Enable microphone access in Microsoft Edge</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <ol className="list-decimal pl-5 space-y-2">
              <li>Click the lock icon in the address bar</li>
              <li>Find &quot;Microphone&quot; in the site permissions</li>
              <li>Change the setting to &quot;Allow&quot;</li>
              <li>Refresh the page</li>
            </ol>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 flex justify-center">
        <Button asChild>
          <Link href="/">
            Try Again
          </Link>
        </Button>
      </div>
    </div>
  );
} 