import React from 'react';

interface ButtonProps {
  onClick: (label: string) => void;
  label: string;
  variant?: 'number' | 'operator' | 'special';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, label, variant = 'number', className = '' }) => {
  const baseStyle = "flex items-center justify-center text-3xl font-semibold rounded-full h-20 w-20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900";
  
  let variantStyle = '';
  switch(variant) {
    case 'operator':
      variantStyle = "bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-400";
      break;
    case 'special':
      variantStyle = "bg-gray-400 text-black hover:bg-gray-500 focus:ring-gray-300";
      break;
    case 'number':
    default:
      variantStyle = "bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-500";
      break;
  }

  return (
    <button
      onClick={() => onClick(label)}
      className={`${baseStyle} ${variantStyle} ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
