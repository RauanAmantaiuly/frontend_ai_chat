import * as React from "react";
import { IMaskInput } from "react-imask";

import { cn } from "@/lib/utils";

export interface MaskedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mask?: string;
  value: string;
  onChangeValue: (value: string) => void;
}

export const MaskedInput = React.forwardRef<HTMLInputElement, MaskedInputProps>(
  ({ mask, value, onChangeValue, className, ...props }, ref) => {
    if (!mask) {
      return (
        <input
          {...props}
          ref={ref}
          value={value}
          onChange={(e) => onChangeValue(e.target.value)}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2",
            "text-sm ring-offset-background placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
        />
      );
    }

    return (
      <IMaskInput
        {...props}
        mask={mask}
        value={value}
        unmask={false}
        inputRef={ref}
        onAccept={(val) => onChangeValue(val)}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2",
          "text-sm ring-offset-background placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
      />
    );
  }
);

MaskedInput.displayName = "MaskedInput";
