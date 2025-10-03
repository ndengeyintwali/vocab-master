import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 outline-none focus:ring-4 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-1 focus:ring-blue-500/20 active:translate-y-0",
        destructive: "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/40 hover:-translate-y-1 focus:ring-red-500/20",
        outline: "bg-gray-800/80 backdrop-blur-sm text-white border border-gray-700 hover:bg-gray-700/90 hover:border-gray-600 hover:-translate-y-1 focus:ring-gray-500/20",
        secondary: "bg-gray-800/80 backdrop-blur-sm text-white border border-gray-700 hover:bg-gray-700/90 hover:border-gray-600 hover:-translate-y-1 focus:ring-gray-500/20",
        ghost: "bg-transparent text-gray-400 hover:bg-gray-800/50 hover:text-white",
        link: "text-blue-400 underline-offset-4 hover:underline hover:text-blue-300",
      },
      size: {
        default: "px-6 py-3 text-sm min-h-[44px]",
        sm: "px-4 py-2 text-sm min-h-[40px]",
        lg: "px-8 py-4 text-base min-h-[52px]",
        icon: "w-11 h-11 p-0",
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
      {...props}
    />
  );
}

export { Button, buttonVariants };
