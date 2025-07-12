import React from 'react'
export function Input({ className = '', ...props }) {
    return (
      <input
        className={`w-full px-4 py-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ${className}`}
        {...props}
      />
    );
  }