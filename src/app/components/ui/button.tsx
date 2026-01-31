import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg transition-shadow",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 shadow-md",
        outline:
          "border bg-background text-foreground hover:bg-secondary hover:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 transition-colors",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm",
        ghost:
          "hover:bg-accent/10 hover:text-accent-foreground dark:hover:bg-accent/20 transition-colors",
        link: "text-primary underline-offset-4 hover:underline",
        accent:
          "bg-warm-amber text-white hover:bg-warm-amber/90 shadow-md hover:shadow-lg transition-shadow",
      },
      size: {
        default: "h-11 px-6 py-2.5 has-[>svg]:px-5 rounded-[10px]",
        sm: "h-9 gap-1.5 px-3.5 has-[>svg]:px-3 rounded-lg",
        lg: "h-12 px-8 has-[>svg]:px-6 rounded-[12px]",
        icon: "size-10 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      style={{ borderRadius: 'inherit' }}
      {...props}
    />
  );
}

export { Button, buttonVariants };