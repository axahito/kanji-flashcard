import React from "react";

type Props = {
  onClick?: (event: React.MouseEvent) => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

const PrimaryButton = ({
  onClick,
  children,
  className,
  disabled = false,
}: Props) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`text-[#D8D8D8] bg-[#3E3232] hover:text-[#D8D8D8] hover:bg-[#503C3C] transition-colors duration-200 ${className} ${
        disabled ? "opacity-50 cursor-default" : "cursor-pointer"
      } px-[10px] py-[6px] rounded-md text-base font-sans font-medium flex justify-center items-center shadow-lg`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
