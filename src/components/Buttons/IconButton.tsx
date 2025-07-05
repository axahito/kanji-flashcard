import React, { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
}

const IconButton = ({
  children,
  fullWidth = false,
  className = "",
  ...props
}: Props) => {
  return (
    <button
      {...props}
      className={`text-typography-foreground hover:text-typography-hover transition-colors duration-200 flex gap-[4px] items-center ${className} ${
        props.disabled ? "opacity-50 cursor-default" : "cursor-pointer"
      } ${fullWidth ? "w-full" : "w-auto"}`}
    >
      {children}
    </button>
  );
};

export default IconButton;
