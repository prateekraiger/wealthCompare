import React, { useState } from "react";
import { Play } from "lucide-react";
import Loader from "./Loader.jsx";

const InputSection = ({
  inputs,
  onInputChange,
  onCalculate,
  isCalculating,
}) => {
  const [displayValues, setDisplayValues] = useState({
    loanAmount: inputs.loanAmount.toString(),
    interestRate: inputs.interestRate.toString(),
    loanTenure: inputs.loanTenure.toString(),
    sipAmount: inputs.sipAmount.toString(),
  });

  const inputConfigs = [
    {
      key: "loanAmount",
      label: "Investment Amount",
      placeholder: "Enter investment amount",
      prefix: "₹",
      suffix: "",
      type: "text",
      min: 500000,
      max: 10000000,
    },
    {
      key: "interestRate",
      label: "Expected Return Rate",
      placeholder: "Enter expected return rate",
      prefix: "",
      suffix: "%",
      type: "text",
      min: 6,
      max: 15,
    },
    {
      key: "loanTenure",
      label: "Investment Period",
      placeholder: "Enter period in years",
      prefix: "",
      suffix: "years",
      type: "text",
      min: 5,
      max: 30,
    },
    {
      key: "sipAmount",
      label: "Monthly SIP Amount",
      placeholder: "Enter monthly SIP amount",
      prefix: "₹",
      suffix: "",
      type: "text",
      min: 1000,
      max: 50000,
    },
  ];

  const handleInputChange = (key, value) => {
    // Update display value immediately for responsive typing
    setDisplayValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleInputBlur = (key, value) => {
    const config = inputConfigs.find((c) => c.key === key);
    const numValue = parseFloat(value) || 0;

    // Validate and constrain to min/max on blur
    let constrainedValue = numValue;
    if (numValue < config.min) {
      constrainedValue = config.min;
    } else if (numValue > config.max) {
      constrainedValue = config.max;
    }

    // Update both display and actual values
    setDisplayValues((prev) => ({
      ...prev,
      [key]: constrainedValue.toString(),
    }));

    onInputChange(key, constrainedValue);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {inputConfigs.map((config) => (
          <div key={config.key} className="space-y-2 sm:space-y-3">
            <label className="text-sm font-medium theme-text-primary block">
              {config.label}
            </label>

            <div className="relative">
              {config.prefix && (
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-600 dark:text-teal-400 font-medium text-sm sm:text-base">
                  {config.prefix}
                </span>
              )}

              <input
                type={config.type}
                value={displayValues[config.key]}
                onChange={(e) => handleInputChange(config.key, e.target.value)}
                onBlur={(e) => handleInputBlur(config.key, e.target.value)}
                placeholder={config.placeholder}
                className={`w-full h-10 sm:h-12 theme-card-bg border-2 theme-border rounded-lg theme-text-primary placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#284b63] focus:border-transparent hover:border-[#284b63] dark:hover:border-[#3c6e71] transition-all duration-300 text-sm sm:text-base ${
                  config.prefix ? "pl-7 sm:pl-8" : "pl-3 sm:pl-4"
                } ${config.suffix ? "pr-12 sm:pr-16" : "pr-3 sm:pr-4"}`}
              />

              {config.suffix && (
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-600 dark:text-teal-400 font-medium text-xs sm:text-sm">
                  {config.suffix}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center pt-2 sm:pt-4">
        <button
          onClick={onCalculate}
          disabled={isCalculating}
          className="flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#284b63] to-[#3c6e71] hover:from-[#3c6e71] hover:to-[#284b63] text-white font-semibold rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 hover:translate-y-[-1px] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base"
        >
          {isCalculating ? (
            <>
              <Loader size="sm" color="white" />
              Calculating...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 sm:w-5 sm:h-5" />
              Analyze Investment
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default InputSection;
