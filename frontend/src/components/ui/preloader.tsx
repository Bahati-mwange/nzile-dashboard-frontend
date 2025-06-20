
import React from 'react';
import Logo from './logo';

interface PreloaderProps {
  fullScreen?: boolean;
}

const Preloader: React.FC<PreloaderProps> = ({ fullScreen = true }) => {
  return (
    <div className={`flex flex-col items-center justify-center gap-6 ${fullScreen ? 'min-h-screen' : 'p-6'}`}>
      <div className="animate-bounce">
        <Logo size="large" />
      </div>
      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-green-500 via-yellow-400 to-blue-500 animate-pulse" />
      </div>
    </div>
  );
};

export default Preloader;
