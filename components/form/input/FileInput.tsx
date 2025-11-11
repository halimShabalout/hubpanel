import React, { FC, InputHTMLAttributes } from "react";

interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  placeholder?: string;
  fileName?: string; 
}

const FileInput: FC<FileInputProps> = ({ className, onChange, placeholder, fileName, ...rest }) => {

  const displayFileName = fileName && fileName !== "No file chosen" ? fileName : (placeholder || "No file chosen");
  
  return (
    <div className={`relative h-11 w-full flex items-center rounded-lg border border-gray-300 bg-transparent text-sm text-gray-500 shadow-theme-xs dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 ${className}`}>
      <input
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
        onChange={onChange}
        {...rest}
        placeholder="" 
      />

      <div className="absolute inset-0 flex items-center w-full h-full overflow-hidden">
        <div className="flex-shrink-0 cursor-pointer rounded-lg border-r border-solid border-gray-200 bg-gray-50 py-3 pl-3.5 pr-3 text-sm text-gray-700 hover:bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400">
          {placeholder || "Choose File"} 
        </div>

        <div className="truncate pl-2 pr-2 text-gray-700 dark:text-gray-300">
          {displayFileName}
        </div>
      </div>
    </div>
  );
};

export default FileInput;