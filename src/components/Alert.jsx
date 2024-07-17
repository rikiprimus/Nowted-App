import React from "react";

const Alert = ({ message, status }) => {
  const alertClass = status === 'success'
    ? 'bg-[#d1fae5] text-[#34d399] border-[#34d399]'
    : 'bg-[#fee2e2] text-[#f87171] border-[#f87171]';

  return (
    <div className="w-full">
      {message && (
        <p className={`w-full text-center p-2 rounded-lg border-1 ${alertClass}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Alert;
