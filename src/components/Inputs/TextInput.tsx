import React, { InputHTMLAttributes } from "react";

interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "prefix" | "suffix"> {
  label?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

const TextInput = ({ label, prefix, suffix, ...inputProps }: Props) => {
  return (
    <label htmlFor="Email" className="text-typography-foreground w-full">
      {label && <span className="text-base font-medium">{label}</span>}

      <div className="group flex gap-[8px] relative items-center mt-[8px] w-full py-[10px] px-[8px] rounded border-typography-foreground border-[1.5px] focus-within:border-transparent focus-within:outline-2 focus-within:outline-primary-600 focus-within:outline-offset-[-2px] box-border">
        {prefix && (
          <div className="w-[24px] h-[24px] text-typography-background">
            {prefix}
          </div>
        )}

        <input
          {...inputProps}
          className="text-base text-typography-foreground focus:outline-0 w-full font-medium placeholder-typotext-typography-background placeholder:text-base flex items-center"
        />

        {suffix && (
          <div className="w-[24px] h-[24px] text-typography-background">
            {suffix}
          </div>
        )}
      </div>
    </label>
  );
};

export default TextInput;
