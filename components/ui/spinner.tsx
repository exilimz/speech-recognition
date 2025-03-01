import { cn } from "@/lib/utils";

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
}

export function Spinner({ size = "md", className, ...props }: SpinnerProps) {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-t-transparent",
        {
          "h-4 w-4 border-2": size === "sm",
          "h-6 w-6 border-2": size === "md",
          "h-8 w-8 border-4": size === "lg",
        },
        "border-primary",
        className
      )}
      {...props}
    >
      <span className="sr-only">Loading</span>
    </div>
  );
} 