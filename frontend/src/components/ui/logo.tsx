
import React from 'react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

const Logo: React.FC<LogoProps> = ({ size = 'medium' }) => {
  const sizeClass = {
    small: 'h-8 w-8 text-lg',
    medium: 'h-16 w-16 text-2xl',
    large: 'h-24 w-24 text-4xl'
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`rounded-full bg-green-600 text-white flex items-center justify-center ${sizeClass[size]}`}>
        <span className="font-bold">n</span>
      </div>
      <div className="text-xl font-medium mt-2 text-green-600">nZile</div>
      {size === 'large' && <div className="text-gray-600">Système de contrôle routier</div>}
    </div>
  );
};

export default Logo;
