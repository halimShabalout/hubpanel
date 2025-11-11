import React, { ReactNode } from "react";


interface ButtonProps {
  children: ReactNode;
  size?: "sm" | "md" | "icon"; 
  variant?: "primary" | "outline" | "ghost";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "submit" | "button" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  children,
  size = "md",
  variant = "primary", 
  startIcon,
  endIcon,
  onClick,
  className = "",
  disabled = false,
}) => {
  const sizeClasses = {
    sm: "px-4 py-3 text-sm",
    md: "px-5 py-3.5 text-sm",
    icon: "p-2 h-9 w-9",
  };

  // Variant Classes
  const variantClasses = {
    primary:
      "bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300",
    outline:
      "bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300",
    ghost:
      "bg-transparent text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800",
  };

  // Logic to prevent rendering children or icons inside 'icon' sized button
  const isIconOnly = size === "icon" && !children;

  return (
    <button
      className={`inline-flex items-center justify-center font-medium gap-2 rounded-lg transition ${className} ${
        sizeClasses[size]
      } ${variantClasses[variant]} ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {/* For icon-only buttons, we typically center the content without gap or text */}
      {isIconOnly ? (
        <span className="flex items-center justify-center">{startIcon || endIcon || children}</span>
      ) : (
        <>
          {startIcon && <span className="flex items-center">{startIcon}</span>}
          {children}
          {endIcon && <span className="flex items-center">{endIcon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
