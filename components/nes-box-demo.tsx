"use client";

import { Terminal, MessageSquare, Zap } from "lucide-react";
import { NesBox, NesBoxHeader, NesBoxTitle, NesBoxContent, NesBoxFooter, NesBoxIcon } from "@/components/ui/nes-box";

export function NesBoxDemo() {
  return (
    <div className="space-y-8 my-8">
      {/* Primary variant */}
      <NesBox>
        <NesBoxHeader>
          <NesBoxIcon>
            <MessageSquare className="h-6 w-6" />
          </NesBoxIcon>
          <NesBoxTitle>Primary NES Box</NesBoxTitle>
        </NesBoxHeader>
        <NesBoxContent>
          <p className="pixel-font text-sm">
            This is a primary NES-style dialogue box. It uses the card background color and has pixelated corners.
          </p>
        </NesBoxContent>
        <NesBoxFooter>
          <span className="text-xs">Press A to continue</span>
        </NesBoxFooter>
      </NesBox>

      {/* Secondary variant */}
      <NesBox variant="secondary">
        <NesBoxHeader>
          <NesBoxIcon>
            <Zap className="h-6 w-6" />
          </NesBoxIcon>
          <NesBoxTitle>Secondary NES Box</NesBoxTitle>
        </NesBoxHeader>
        <NesBoxContent>
          <p className="pixel-font text-sm">
            This is a secondary NES-style dialogue box. It uses the secondary background color for a different look.
          </p>
        </NesBoxContent>
        <NesBoxFooter>
          <span className="text-xs">Press B to go back</span>
        </NesBoxFooter>
      </NesBox>

      {/* Terminal variant */}
      <NesBox variant="terminal">
        <NesBoxHeader>
          <NesBoxIcon>
            <Terminal className="h-6 w-6" />
          </NesBoxIcon>
          <NesBoxTitle>Terminal NES Box</NesBoxTitle>
        </NesBoxHeader>
        <NesBoxContent>
          <p className="font-mono text-sm">
            &gt; This is a terminal-style NES box.<br />
            &gt; It mimics a command line interface.<br />
            &gt; Perfect for displaying code or system messages.
          </p>
        </NesBoxContent>
        <NesBoxFooter>
          <span className="text-xs">NERV System v1.0.1</span>
        </NesBoxFooter>
      </NesBox>
    </div>
  );
} 