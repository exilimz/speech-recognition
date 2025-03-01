import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const retroButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-none text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 pixel-font border-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] active:translate-x-[2px] active:translate-y-[2px]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground border-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground border-foreground hover:bg-destructive/90",
        outline: "bg-background text-foreground border-foreground hover:bg-accent/10",
        secondary: "bg-secondary text-secondary-foreground border-foreground hover:bg-secondary/80",
        ghost: "border-transparent shadow-none hover:bg-accent/10 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline border-transparent shadow-none",
        terminal: "bg-black text-[#33ff33] border-[#33ff33] hover:bg-black/90",
      },
      size: {
        default: "h-12 px-4 py-2",
        sm: "h-10 rounded-none px-3 text-xs",
        lg: "h-14 rounded-none px-8 text-base",
        icon: "h-12 w-12 p-0",
        "icon-sm": "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface RetroButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof retroButtonVariants> {
  asChild?: boolean;
}

const RetroButton = React.forwardRef<HTMLButtonElement, RetroButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(retroButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
RetroButton.displayName = "RetroButton";

export { RetroButton, retroButtonVariants }; 