"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { ChevronDownIcon } from "@/icons";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  id?: string;
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  label?: string;
  labelClassName?: string;
}

const Select: React.FC<SelectProps> = ({
  id,
  options,
  placeholder,
  onChange,
  className = "",
  value = "",
  label,
  labelClassName = "",
  required = false,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  const displayText = options.find((opt) => opt.value === value)?.label || placeholder || "";

  const dropdownVariants: Variants = { 
    hidden: { 
      opacity: 0, 
      y: -10,
      scaleY: 0.95,
      transition: { 
        duration: 0.2, 
        ease: [0.4, 0.0, 0.2, 1] 
      },
      transitionEnd: { display: "none" }
    },
    visible: {
      opacity: 1,
      y: 0,
      scaleY: 1,
      transition: { 
        duration: 0.2, 
        ease: [0.4, 0.0, 0.2, 1] 
      },
      display: "block"
    }
  };


  return (
    <div className="w-full relative" ref={containerRef}>
      {label && (
        <label
          htmlFor={id}
          className={`block text-sm font-medium text-gray-700 dark:text-white ${labelClassName} ${labelClassName?.includes("mb-") ? "" : "mb-2"}`}
        >
          {label}
        </label>
      )}
      <div
        className={`flex h-11 w-full items-center justify-between border border-gray-300 bg-white px-3 py-1 shadow-theme-xs cursor-pointer dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 ${className} 
          ${isOpen ? "rounded-t-lg rounded-b-none" : "rounded-lg"}
          ${disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className={`${value ? "text-gray-800 dark:text-white/90" : "text-gray-400 dark:text-gray-400"} truncate`}>
          {displayText || ""}
        </span>
        <ChevronDownIcon />
      </div>

      <motion.div 
        initial={false}
        animate={isOpen ? "visible" : "hidden"}
        variants={dropdownVariants}
        style={{ originY: 0 }}
        className="absolute z-40 w-full max-h-60 overflow-y-auto bg-white shadow-sm top-[100%] -mt-px rounded-b-lg rounded-t-none border border-gray-300 dark:bg-gray-900 dark:border-gray-700"
      >
        {options.map((option, index) => (
          <div
            key={option.value}
            className={`cursor-pointer px-3 py-2 hover:bg-primary/5 ${
              index < options.length - 1 ? "border-b border-gray-200 dark:border-gray-800" : ""
            }`}
            onClick={() => handleSelect(option.value)}
          >
            <span className="text-gray-800 dark:text-white/90">{option.label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Select