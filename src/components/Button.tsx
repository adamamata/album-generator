import React, { ButtonHTMLAttributes } from 'react';

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button 
            {...props}
            className="bg-blue-400 hover:bg-blue-500 px-4 py-2 rounded"
        >
            {props.children}
        </button>
    )
} 