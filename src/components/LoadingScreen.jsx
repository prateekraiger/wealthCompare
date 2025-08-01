import React from "react";
import { Calculator } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext.jsx";
import Loader from "./Loader.jsx";

const LoadingScreen = () => {
  const { isDark } = useTheme();

  return (
    <div className="min-h-screen flex items-center justify-center theme-bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 theme-bg-secondary">
        <div
          className={`absolute bottom-0 left-0 right-0 top-0 transition-opacity duration-300 ${
            isDark
              ? "bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-100"
              : "bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-40"
          }`}
        ></div>
      </div>

      {/* Loading Content */}
      <div className="relative z-10 text-center space-y-8">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-3 mb-8">
          <div className="p-4 bg-gradient-to-br from-[#284b63] to-[#3c6e71] rounded-2xl shadow-2xl">
            <Calculator className="w-12 h-12 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold theme-text-primary">
              WealthCompare
            </h1>
            <p className="theme-text-secondary text-sm">
              Smart Financial Planning
            </p>
          </div>
        </div>

        {/* Loader */}
        <div className="flex flex-col items-center space-y-4">
          <Loader size="lg" color="primary" />
          <p className="theme-text-secondary text-lg font-medium">
            Loading your financial calculator...
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
