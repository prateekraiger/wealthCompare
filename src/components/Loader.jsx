import React from "react";

const Loader = ({ size = "md", color = "primary" }) => {
  const sizeClasses = {
    sm: "w-2 h-2",
    md: "w-4 h-4",
    lg: "w-6 h-6",
  };

  const colorClasses = {
    primary: "bg-[#3c6e71]",
    secondary: "bg-[#284b63]",
    white: "bg-white",
    blue: "bg-blue-700",
  };

  const dotSize = sizeClasses[size];
  const dotColor = colorClasses[color];

  return (
    <div className="flex flex-row gap-2 items-center justify-center">
      {/* The first bouncing dot with a longer animation delay */}
      <div
        className={`${dotSize} rounded-full ${dotColor} animate-bounce [animation-delay:.7s]`}
      ></div>

      {/* The second bouncing dot with a shorter animation delay */}
      <div
        className={`${dotSize} rounded-full ${dotColor} animate-bounce [animation-delay:.3s]`}
      ></div>

      {/* The third bouncing dot, same as the first one */}
      <div
        className={`${dotSize} rounded-full ${dotColor} animate-bounce [animation-delay:.7s]`}
      ></div>
    </div>
  );
};

export default Loader;
