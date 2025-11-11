"use client";

import React from "react";


interface Props {
    title: string;
}

const LoadingComponent: React.FC<Props> = ({title}) => {
    return (
        <div className="flex justify-center items-center py-10">
            <p className="text-gray-600 dark:text-gray-300">{`Loading ${title}...`}</p>
        </div>
    );
}

export default LoadingComponent;