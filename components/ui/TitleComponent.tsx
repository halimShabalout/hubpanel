"use client";

import React from "react";


interface Props {
    title: string;
    className?: string;
}

const TitleComponent: React.FC<Props> = ({ title, className }) => {
    return (
        <h3 className={`text-lg font-semibold text-gray-800 dark:text-white/90 ${className}`}>
            {title}
        </h3>
    );
}

export default TitleComponent;