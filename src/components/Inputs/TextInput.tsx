import React, { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";

interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "prefix" | "suffix"> {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

const TextInput = forwardRef<HTMLInputElement, Props>(
  ({ prefix, suffix, ...inputProps }, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <div className="group flex gap-[8px] relative items-center mt-[8px] w-full py-[10px] px-[8px] rounded border-typography-foreground border-[1.5px] focus-within:border-transparent focus-within:outline-2 focus-within:outline-primary-600 focus-within:outline-offset-[-2px] box-border">
        {prefix && (
          <div className="w-[24px] h-[24px] text-typography-background">
            {prefix}
          </div>
        )}

        <input
          ref={ref}
          {...inputProps}
          className="text-base text-typography-foreground focus:outline-0 w-full font-medium placeholder-typotext-typography-background placeholder:text-base flex items-center"
        />

        {suffix && (
          <div className="w-[24px] h-[24px] text-typography-background">
            {suffix}
          </div>
        )}
      </div>
    );
  }
);

TextInput.displayName = "TextInput"; // required for forwardRef
export default TextInput;
