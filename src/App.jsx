import React, { useState, useEffect } from "react";
import "./App.css";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Calculator from "./components/Calculator.jsx";
import EducationSection from "./components/EducationSection.jsx";
import Footer from "./components/Footer.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";

// Main App Content Component that uses theme
const AppContent = () => {
  const { isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div
      className={`min-h-screen relative transition-all duration-300 theme-bg-primary theme-text-primary`}
    >
      {/* Background Pattern */}
      <div
        className={`absolute inset-0 transition-all duration-300 theme-bg-secondary`}
      >
        {/* Grid pattern for both modes with different visibility */}
        <div
          className={`absolute bottom-0 left-0 right-0 top-0 transition-opacity duration-300 ${
            isDark
              ? "bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-100"
              : "bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-40"
          }`}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />

        <main className="pt-16 sm:pt-20">
          <div className="container mx-auto px-4 py-4 sm:py-6">
            <header className="text-center mb-6 sm:mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-[#284b63] via-[#3c6e71] to-[#284b63] bg-clip-text text-transparent transition-all duration-300 animate-pulse tracking-tight text-shadow-enhanced">
                Smart Financial Planning
              </h1>
              <p className="text-sm md:text-base max-w-2xl mx-auto px-4 theme-text-secondary transition-all duration-300 animate-fade-in">
                Make informed investment decisions with our intelligent
                financial calculator. Analyze your investment strategies and
                optimize your wealth-building journey.
              </p>
            </header>

            <div id="calculator">
              <Calculator />
            </div>

            {/* Educational Section */}
            <div id="education" className="mt-8 sm:mt-12">
              <EducationSection />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
