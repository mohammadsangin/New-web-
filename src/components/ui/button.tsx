"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4AA8FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070D] disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[#4AA8FF] text-[#05070D] font-bold hover:bg-[#7CF7FF] btn-glow",
        outline:
          "border border-white/20 bg-white/5 text-[#F4F7FB] hover:bg-white/10 hover:border-white/35",
        ghost:
          "text-[rgba(244,247,251,0.68)] hover:text-[#F4F7FB] hover:bg-white/6",
        link:
          "text-[#4AA8FF] underline-offset-4 hover:underline p-0 h-auto",
        secondary:
          "bg-white/8 border border-white/14 text-[#F4F7FB] hover:bg-white/14 hover:border-white/22",
      },
      size: {
        default: "h-11 px-7 py-2",
        sm: "h-9 px-5 text-xs",
        lg: "h-13 px-9 text-base",
        xl: "h-14 px-10 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
