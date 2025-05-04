import React from "react";

type Props = {
  onClick?: (event: React.MouseEvent) => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

const IconButton = ({
  onClick,
  children,
  className,
  disabled = false,
}: Props) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`text-[#222831] hover:text-[#393E46] transition-colors duration-200 ${className} ${
        disabled ? "opacity-50 cursor-default" : "cursor-pointer"
      }`}
    >
      {children}
    </button>
  );
};

export default IconButton;
