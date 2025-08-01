import React from "react";
import { Calculator, TrendingUp, Menu, X, BookOpen } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext.jsx";

const Navbar = () => {
  const { isDark } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems = [
    { name: "Calculator", href: "calculator", icon: Calculator },
    { name: "Analysis", href: "analysis", icon: TrendingUp },
    { name: "Learn", href: "education", icon: BookOpen },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b theme-border transition-all duration-300 theme-card-bg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 lg:space-x-3">
            <div className="p-1.5 lg:p-2 rounded-lg bg-gradient-to-br from-[#284b63] to-[#3c6e71]">
              <Calculator className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg lg:text-xl font-bold theme-text-primary">
                WealthCompare
              </h1>
              <p className="text-xs hidden sm:block theme-text-secondary">
                Smart Financial Planning
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  const element = document.getElementById(item.href);
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-[#284b63]/10 hover:scale-105 theme-text-secondary hover:theme-text-primary"
              >
                <item.icon className="w-4 h-4" />
                <span className="font-medium text-sm lg:text-base">
                  {item.name}
                </span>
              </button>
            ))}

            <div className="w-px h-6 theme-border bg-current opacity-30"></div>

            <div className="flex items-center space-x-3">
              <ThemeToggleButton />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            <ThemeToggleButton />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 transition-colors duration-300 hover:opacity-80 theme-text-secondary"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t theme-border transition-colors duration-300">
            <div className="space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    const element = document.getElementById(item.href);
                    element?.scrollIntoView({ behavior: "smooth" });
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-[#284b63]/10 hover:scale-105 theme-text-secondary hover:theme-text-primary"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Separate theme toggle component for reuse
const ThemeToggleButton = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative p-2 rounded-lg transition-all duration-300 border-2
        ${
          isDark
            ? "bg-[#284b63] hover:bg-[#3c6e71] border-[#3c6e71] text-yellow-400"
            : "bg-white hover:bg-gray-50 hover:scale-105 hover:shadow-md border-gray-300 text-slate-600"
        }
        transform hover:scale-105 active:scale-95
      `}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </div>
    </button>
  );
};

export default Navbar;
