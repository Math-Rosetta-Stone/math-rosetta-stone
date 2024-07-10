import React from 'react';

interface BadgeProps {
  text?: string;
}

const PracticeBadge: React.FC<BadgeProps> = ({ text = "Practice" }) => {
  return (
    <div className="relative inline-block">
      <div
        className="bg-green-500 text-white font-bold py-1 px-3 rounded-full transform "
        onClick={() => alert("Not done yet")}
      >
        {text}
      </div>
    </div>
  );
};

export default PracticeBadge;
