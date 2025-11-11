"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, Variants } from "framer-motion";

interface Option {
  value: string;
  text: string;
  selected?: boolean;
  label?: string;
}

interface MultiSelectProps {
  label?: string;
  options: Option[];
  placeholder?: string;
  defaultSelected?: string[];
  onChange?: (selected: string[]) => void;
  disabled?: boolean;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  options,
  placeholder,
  defaultSelected = [],
  onChange,
  disabled = false,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(defaultSelected);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedOptions(defaultSelected);
  }, [defaultSelected]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (optionValue: string) => {
    const isCurrentlySelected = selectedOptions.includes(optionValue);

    const newSelectedOptions = isCurrentlySelected
      ? selectedOptions.filter((value) => value !== optionValue)
      : [...selectedOptions, optionValue];

    setSelectedOptions(newSelectedOptions);
    if (onChange) onChange(newSelectedOptions);
  };

  const removeOption = (value: string) => {
    const newSelectedOptions = selectedOptions.filter((opt) => opt !== value);
    setSelectedOptions(newSelectedOptions);
    if (onChange) onChange(newSelectedOptions);
  };

  const selectedOptionsDetails = useMemo(() => {
    return selectedOptions.map(value => {
      const option = options.find(opt => opt.value === value);
      return { value, text: option?.text || "" };
    }).filter(detail => detail.text);
  }, [selectedOptions, options]);

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
    <div className="w-full" ref={containerRef}>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          {label}
        </label>
      )}

      <div className="relative z-20 inline-block w-full">
        <div className="relative flex flex-col items-center">
          <div onClick={toggleDropdown} className={`w-full ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}>
            <div 
                className={`flex h-11 border py-1.5 pl-3 pr-3 shadow-theme-xs outline-hidden transition 
                ${isOpen ? "rounded-t-lg rounded-b-none" : "rounded-lg"}
                ${disabled
                    ? "bg-gray-100 border-gray-300 dark:bg-gray-800 dark:border-gray-700 opacity-70"
                    : "bg-white border-gray-300 focus:border-brand-300 focus:shadow-focus-ring dark:border-gray-700 dark:bg-gray-900 dark:focus:border-brand-300"
                }
            `}>
              <div className="flex flex-wrap flex-auto gap-2">
                {selectedOptionsDetails.length > 0 ? (
                  selectedOptionsDetails.map((detail, index) => (
                    <div
                      key={detail.value}
                      className="group flex items-center justify-center 
                         rounded-full  
                         border-[0.7px] border-transparent bg-gray-100 py-1 pl-2.5 pr-2 text-sm text-gray-800 hover:border-gray-200 dark:bg-gray-800 dark:text-white/90 dark:hover:border-gray-800"
                    >
                      <span className="flex-initial max-w-full">{detail.text}</span>
                      <div className="flex flex-row-reverse flex-auto">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            removeOption(detail.value);
                          }}
                          className="pl-2 text-gray-500 cursor-pointer group-hover:text-gray-400 dark:text-gray-400"
                          disabled={disabled}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <span className="text-gray-400 dark:text-gray-400 truncate self-center">
                    {placeholder || ""}
                  </span>
                )}
              </div>
              <div className="flex items-center py-1 pl-1 pr-1 w-7">
                <button
                  type="button"
                  onClick={toggleDropdown}
                  className={`w-5 h-5 text-gray-700 outline-hidden focus:outline-hidden dark:text-gray-400 ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
                  disabled={disabled}
                >
                  <svg
                    className={`stroke-current transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.79175 7.39551L10.0001 12.6038L15.2084 7.39551"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <motion.div 
            initial={false}
            animate={isOpen ? "visible" : "hidden"}
            variants={dropdownVariants}
            style={{ originY: 0 }}
            className="absolute left-0 z-40 w-full overflow-y-auto bg-white rounded-b-lg rounded-t-none shadow-sm top-[100%] -mt-px max-h-select dark:bg-gray-900 border border-gray-300 dark:border-gray-700"
          >
            <div className="flex flex-col">
              {options.length > 0 ? (
                options.map((option, index) => {
                  const isSelected = selectedOptions.includes(option.value);
                  return (
                    <div key={option.value || index}>
                      <div
                        className={`hover:bg-primary/5 w-full cursor-pointer 
                              ${index < options.length - 1 ? "border-b border-gray-200 dark:border-gray-800" : ""}`
                        }
                        onClick={() => handleSelect(option.value)}
                      >
                        <div
                          className={`relative flex w-full items-center p-2 pl-2 
                              ${isSelected ? "bg-primary/10 dark:bg-primary/20" : ""}`
                          }
                        >
                          <div className="mx-2 leading-6 text-gray-800 dark:text-white/90">
                            {option.text}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="p-3 text-sm text-gray-500 dark:text-gray-400 text-center">
                  No options available.
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MultiSelect;