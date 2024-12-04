import React from "react";

export const GlowEffect: React.FC = () => {
  return (
    <div className="relative w-full h-full">
      <div className="absolute top-[-200px] left-[5%] w-[90%] h-[250px] bg-gradient-to-r from-orange-500 via-red-500 to-amber-500/40 blur-[130px] rounded-[100%] opacity-75"></div>
      <div className="absolute top-[-180px] left-[15%] w-[70%] h-[200px] bg-gradient-to-r from-red-400/40 via-pink-400/50 to-yellow-500/40 blur-[100px] rounded-[100%] opacity-60"></div>

      <div className="absolute top-[-150px] left-[25%] w-[50%] h-[150px] bg-gradient-to-r from-pink-300/20 via-yellow-300/30 to-orange-400/25 blur-[90px] rounded-[100%] opacity-50"></div>
    </div>
  );
};
