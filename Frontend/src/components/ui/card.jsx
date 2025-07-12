import React from 'react'
export function Card({ className = '', children }) {
    return (
      <div className={`rounded-2xl bg-white/80 backdrop-blur-md shadow-xl ${className}`}>
        {children}
      </div>
    );
  }
  
  export function CardContent({ className = '', children }) {
    return <div className={`p-8 space-y-6 ${className}`}>{children}</div>;
  }