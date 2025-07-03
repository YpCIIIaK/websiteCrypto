import React from "react";

export function Button({ children, className = "", ...props }) {
  // Если кнопка только с иконкой (h-8 w-8 p-0), не добавлять gap и уменьшить padding
  const isIconButton = className.includes("h-8") && className.includes("w-8") && className.includes("p-0");
  return (
    <button
      className={
        isIconButton
          ? `flex items-center justify-center gap-0 p-0 m-0 min-w-[2rem] min-h-[2rem] w-8 h-8 bg-transparent border-none shadow-none rounded-none ${className}`
          : `px-5 py-1.5 rounded-md font-normal text-base flex items-center justify-center gap-2 transition-all duration-200 shadow-sm bg-[#176b3a] text-[#f3f6f4] hover:bg-[#124d2a] border border-success ${className}`
      }
      {...props}
    >
      {children}
    </button>
  );
}
export default Button; 