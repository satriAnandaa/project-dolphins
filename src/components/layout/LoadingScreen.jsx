import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-600 to-blue-400 text-white">
      <img src="src/assets/wadol.png" alt="Loading..." className="w-32 mb-4" />
      <h2 className="text-2xl">Loading...</h2>
    </div>
  );
}

export default LoadingScreen;