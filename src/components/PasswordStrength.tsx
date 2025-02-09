import React from 'react';

interface PasswordStrengthProps {
  strength: number;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ strength }) => {
  const getStrengthColor = (level: number) => {
    if (level <= 1) return 'bg-red-500';
    if (level <= 2) return 'bg-orange-500';
    if (level <= 3) return 'bg-yellow-500';
    if (level <= 4) return 'bg-green-400';
    return 'bg-green-500';
  };

  const getStrengthText = (level: number) => {
    if (level <= 1) return 'Very Weak';
    if (level <= 2) return 'Weak';
    if (level <= 3) return 'Medium';
    if (level <= 4) return 'Strong';
    return 'Very Strong';
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex gap-1 h-2">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={`flex-1 rounded-full transition-all duration-300 ${
              level <= strength ? getStrengthColor(strength) : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
      <p className="text-sm text-gray-600">
        Strength: {getStrengthText(strength)}
      </p>
    </div>
  );
};

export default PasswordStrength;