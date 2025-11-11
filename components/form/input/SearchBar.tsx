// components/ui/input/SearchBar.tsx
"use client";

import { Search } from "lucide-react";
import React from "react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
    searchTerm, 
    onSearchChange, 
    placeholder = "Search..." 
}) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        onClick={(e) => e.stopPropagation()}
        className="pl-9 pr-3 py-2 text-sm border rounded-lg bg-white dark:bg-slate-900 dark:text-gray-100 dark:border-white/10 focus:ring-2 focus:ring-primary/40 outline-none"
      />
    </div>
  );
};

export default SearchBar;