import React, { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
}

const PrimaryButton = ({
  children,
  fullWidth = false,
  className = "",
  ...props
}: Props) => {
  return (
    <button
      {...props}
      className={`
        text-white bg-primary-600 hover:bg-primary-700 
        hover:outline-2 transition-colors duration-200
        px-4 py-2.5 rounded-md text-base font-medium 
        flex justify-center items-center shadow-lg
        ${fullWidth ? "w-full" : "w-auto"}
        ${props.disabled ? "opacity-50 cursor-default" : "cursor-pointer"}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
