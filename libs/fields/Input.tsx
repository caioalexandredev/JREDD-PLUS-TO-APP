// components/ui/Input.tsx
import { InputHTMLAttributes, forwardRef } from "react";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full bg-card border border-border rounded-md px-4 py-3.5 text-sm text-foreground transition-all focus:outline-none focus:border-ocean focus:ring-4 focus:ring-ocean/10 placeholder:text-muted-foreground placeholder:opacity-60 ${className}`}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";