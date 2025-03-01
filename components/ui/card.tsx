import * as React from "react"

import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground relative border-4 border-foreground py-4 shadow-sm",
        // NES-style pixelated corners
        "before:content-[''] before:absolute before:top-[-4px] before:left-[-4px] before:w-[8px] before:h-[8px] before:bg-foreground before:z-[1] before:clip-path-[polygon(0_0,100%_0,0_100%)]",
        "after:content-[''] after:absolute after:top-[-4px] after:right-[-4px] after:w-[8px] after:h-[8px] after:bg-foreground after:z-[1] after:clip-path-[polygon(0_0,100%_0,100%_100%)]",
        "[&>:first-child]:before:content-[''] [&>:first-child]:before:absolute [&>:first-child]:before:bottom-[-4px] [&>:first-child]:before:left-[-4px] [&>:first-child]:before:w-[8px] [&>:first-child]:before:h-[8px] [&>:first-child]:before:bg-foreground [&>:first-child]:before:z-[1] [&>:first-child]:before:clip-path-[polygon(0_0,0_100%,100%_100%)]",
        "[&>:first-child]:after:content-[''] [&>:first-child]:after:absolute [&>:first-child]:after:bottom-[-4px] [&>:first-child]:after:right-[-4px] [&>:first-child]:after:w-[8px] [&>:first-child]:after:h-[8px] [&>:first-child]:after:bg-foreground [&>:first-child]:after:z-[1] [&>:first-child]:after:clip-path-[polygon(100%_0,0_100%,100%_100%)]",
        className
      )}
      style={{ imageRendering: 'pixelated' }}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col gap-1.5 px-4 border-b-2 border-foreground/30 pb-3", className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-bold pixel-font", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm pixel-font", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-4 py-3", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-4 pt-2 border-t-2 border-foreground/30 mt-1", className)}
      {...props}
    />
  )
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
