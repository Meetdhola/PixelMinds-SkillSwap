import React from 'react'
export function Button({ type = 'button', className = '', children, ...props }) {
    return (
      <button
        type={type}
        className={`w-full text-lg py-4 font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition duration-300 ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }