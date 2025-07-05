import React from "react";

type Props = {
  label: string;
  errorMessage?: string;
  children: React.ReactNode;
};

const FormControl = ({ label, errorMessage, children }: Props) => {
  return (
    <label htmlFor="Email" className="text-typography-foreground w-full">
      <span className="text-base font-medium">{label}</span>
      {children}

      {errorMessage && (
        <p className="text-xs text-red-500 mt-[8px] font-light">{errorMessage}</p>
      )}
    </label>
  );
};

export default FormControl;
