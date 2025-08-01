import React from "react";
import {
  Calculator,
  TrendingUp,
  PieChart,
  BarChart3,
  Github,
  Twitter,
  Linkedin,
  Mail,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Features",
      links: [
        { name: "Financial Calculator", href: "#calculator", icon: Calculator },
        { name: "Investment Analysis", href: "#analysis", icon: TrendingUp },
        { name: "Portfolio Planning", href: "#portfolio", icon: PieChart },
        { name: "Growth Tracking", href: "#tracking", icon: BarChart3 },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Getting Started", href: "#guide" },
        { name: "Financial Tips", href: "#tips" },
        { name: "Investment Guide", href: "#investment" },
        { name: "FAQ", href: "#faq" },
      ],
    },
  ];

  const socialLinks = [
    { name: "GitHub", icon: Github, href: "#github" },
    { name: "Twitter", icon: Twitter, href: "#twitter" },
    { name: "LinkedIn", icon: Linkedin, href: "#linkedin" },
    { name: "Email", icon: Mail, href: "mailto:hello@wealthcompare.com" },
  ];

  return (
    <footer className="relative theme-bg-secondary backdrop-blur-md border-t theme-border mt-16 overflow-hidden transition-all duration-300">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_35%,rgba(60,110,113,0.1)_50%,transparent_65%)] bg-[length:20px_20px]"></div>
      </div>

      <div className="relative container mx-auto px-4 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-gradient-to-br from-[#284b63] to-[#3c6e71] rounded-xl shadow-lg">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold theme-text-primary">
                  WealthCompare
                </h3>
                <p className="text-sm theme-text-secondary">
                  Smart Financial Planning
                </p>
              </div>
            </div>

            <p className="theme-text-secondary leading-relaxed max-w-md">
              Empowering your financial journey with intelligent tools and
              insights. Make informed investment decisions and build wealth
              strategically.
            </p>

            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="group p-3 theme-bg-tertiary rounded-xl theme-text-secondary hover:text-white hover:bg-gradient-to-br hover:from-[#284b63] hover:to-[#3c6e71] transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:translate-y-[-2px]"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="text-lg font-semibold theme-text-primary flex items-center">
                {section.title}
                <div className="ml-2 w-8 h-0.5 bg-gradient-to-r from-[#284b63] to-transparent"></div>
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="group flex items-center space-x-2 theme-text-secondary hover:theme-text-primary hover:scale-105 transition-all duration-300"
                    >
                      {link.icon && (
                        <link.icon className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                      )}
                      <span className="text-sm group-hover:translate-x-1 transition-transform duration-300">
                        {link.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t theme-border pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2 text-sm theme-text-secondary">
              <span>© {currentYear} WealthCompare. All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
