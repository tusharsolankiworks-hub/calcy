import React from 'react';

interface DisplayProps {
  currentValue: string;
  previousValue: string;
  operation: string | null;
}

const formatOperand = (operand: string | null): string | undefined => {
  if (operand == null || operand === "") return;
  if (operand === "Error") return "Error";
  const [integer, decimal] = operand.split('.');
  if (integer.length > 16) {
    return Number(integer).toExponential(9);
  }
  const formattedInteger = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Number(integer));
  if (decimal != null) {
      return `${formattedInteger}.${decimal}`;
  }
  return formattedInteger;
}

const Display: React.FC<DisplayProps> = ({ currentValue, previousValue, operation }) => {
  return (
    <div className="bg-black text-white p-6 rounded-lg mb-4 text-right break-words h-32 flex flex-col justify-end">
      <div className="text-gray-400 text-3xl h-10 truncate" title={`${formatOperand(previousValue) || ''} ${operation || ''}`}>
        {formatOperand(previousValue)} {operation}
      </div>
      <div className="text-6xl font-light h-20 flex items-center justify-end" style={{ minHeight: '5rem' }}>
        <span className='truncate'>{formatOperand(currentValue) || '0'}</span>
      </div>
    </div>
  );
};

export default Display;
