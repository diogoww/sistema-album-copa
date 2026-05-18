import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "h-11 w-full rounded-xl border bg-transparent px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-brand-blue",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
