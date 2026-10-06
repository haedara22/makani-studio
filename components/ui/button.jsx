import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center py-[10px] px-[10px] justify-center gap-2 whitespace-nowrap rounded-[10px] text-base font-semibold transition-colors ring-offset-white",
  {
    variants: {
      variant: {
        default:
          "bg-accent-Default text-primary hover:text-accent-hover",
          primary: "bg-primary text-white",
          outline: "border border-accent-Default bg-transparent text-accent-Default hover:bg-accent-Default hover:text-primary",
      size: {
        default: "h-[44px] px-6",
        md: "h-[48px] rounded-md px-6",
        lg: "h-[56px] px-8 text-sm uppercase tracking-[2px]  ",
      },
    },
  },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
