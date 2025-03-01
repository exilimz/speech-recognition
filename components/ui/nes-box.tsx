import * as React from "react";
import { cn } from "@/lib/utils";

interface NesBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary" | "terminal";
  border?: boolean;
}

function NesBox({
  className,
  variant = "primary",
  border = true,
  ...props
}: NesBoxProps) {
  return (
    <div
      data-slot="nes-box"
      className={cn(
        "relative font-mono p-4 overflow-hidden",
        border && "border-4 border-foreground",
        {
          "bg-card text-card-foreground": variant === "primary",
          "bg-secondary text-secondary-foreground": variant === "secondary",
          "bg-black text-[#33ff33]": variant === "terminal",
        },
        // NES-style pixelated corners
        border && "nes-box",
        className
      )}
      {...props}
    />
  );
}

interface NesBoxHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

function NesBoxHeader({ className, ...props }: NesBoxHeaderProps) {
  return (
    <div
      data-slot="nes-box-header"
      className={cn("flex items-center mb-4 pixel-font", className)}
      {...props}
    />
  );
}

interface NesBoxTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

function NesBoxTitle({ className, ...props }: NesBoxTitleProps) {
  return (
    <h3
      data-slot="nes-box-title"
      className={cn("text-lg font-bold tracking-wide pixel-font", className)}
      {...props}
    />
  );
}

interface NesBoxContentProps extends React.HTMLAttributes<HTMLDivElement> {}

function NesBoxContent({ className, ...props }: NesBoxContentProps) {
  return (
    <div
      data-slot="nes-box-content"
      className={cn("space-y-2", className)}
      {...props}
    />
  );
}

interface NesBoxFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

function NesBoxFooter({ className, ...props }: NesBoxFooterProps) {
  return (
    <div
      data-slot="nes-box-footer"
      className={cn("flex items-center justify-end mt-4 pt-2 border-t-2 border-foreground/30 pixel-font", className)}
      {...props}
    />
  );
}

interface NesBoxIconProps extends React.HTMLAttributes<HTMLDivElement> {}

function NesBoxIcon({ className, ...props }: NesBoxIconProps) {
  return (
    <div
      data-slot="nes-box-icon"
      className={cn("flex-shrink-0 mr-3", className)}
      {...props}
    />
  );
}

export { NesBox, NesBoxHeader, NesBoxTitle, NesBoxContent, NesBoxFooter, NesBoxIcon }; 