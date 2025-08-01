import React, { useState, useEffect } from "react";
import { Calculator as CalcIcon, TrendingUp } from "lucide-react";
import InputSection from "./InputSection.jsx";
import ChartsSection from "./ChartsSection.jsx";
import { calculateLoanData, calculateSIPData } from "../utils/calculations";

const Calculator = () => {
  const [inputs, setInputs] = useState({
    loanAmount: 2500000, // 25 Lakhs
    interestRate: 8.5, // 8.5%
    loanTenure: 20, // 20 years
    sipAmount: 10000, // 10k monthly
  });

  const [calculatedData, setCalculatedData] = useState({
    loanData: [],
    sipData: [],
    summary: {},
  });

  const [isCalculating, setIsCalculating] = useState(false);

  const calculateResults = () => {
    setIsCalculating(true);

    // Simulate calculation delay for better UX
    setTimeout(() => {
      const loanData = calculateLoanData(
        inputs.loanAmount,
        inputs.interestRate,
        inputs.loanTenure
      );
      const sipData = calculateSIPData(inputs.sipAmount, inputs.loanTenure);

      const summary = {
        totalEMI: loanData.emi,
        totalInterest: loanData.totalInterest,
        totalLoanAmount: loanData.totalAmount,
        finalSIPValue: sipData[sipData.length - 1]?.value || 0,
      };

      setCalculatedData({
        loanData: loanData.monthlyData,
        sipData,
        summary,
      });

      setIsCalculating(false);
    }, 800);
  };

  useEffect(() => {
    calculateResults();
  }, []);

  const handleInputChange = (field, value) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-6 sm:space-y-8 lg:space-y-12">
      {/* Input Section */}
      <div className="theme-card-bg backdrop-blur-md rounded-xl sm:rounded-2xl border-2 p-4 sm:p-6 md:p-8 lg:p-10 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.005]">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="p-1.5 sm:p-2 bg-gradient-to-br from-[#284b63] to-[#3c6e71] rounded-lg">
            <CalcIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold theme-text-primary">
            Investment Parameters
          </h2>
        </div>

        <InputSection
          inputs={inputs}
          onInputChange={handleInputChange}
          onCalculate={calculateResults}
          isCalculating={isCalculating}
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="theme-card-bg backdrop-blur-md rounded-lg sm:rounded-xl border-2 p-4 sm:p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
          <h3 className="text-sm font-medium text-[#284b63] dark:text-[#3c6e71] mb-2">
            Monthly Investment
          </h3>
          <p className="text-xl sm:text-2xl font-bold theme-text-primary">
            ₹{calculatedData.summary.totalEMI?.toLocaleString() || "0"}
          </p>
        </div>

        <div className="theme-card-bg backdrop-blur-md rounded-lg sm:rounded-xl border-2 p-4 sm:p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
          <h3 className="text-sm font-medium text-[#284b63] dark:text-[#3c6e71] mb-2">
            Portfolio Value
          </h3>
          <p className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            ₹{(calculatedData.summary.finalSIPValue / 100000).toFixed(1)}L
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div
        id="analysis"
        className="theme-card-bg backdrop-blur-md rounded-xl sm:rounded-2xl border-2 p-4 sm:p-6 md:p-8 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.005]"
      >
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="p-1.5 sm:p-2 bg-gradient-to-br from-[#284b63] to-[#3c6e71] rounded-lg">
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold theme-text-primary">
            Investment Growth Analysis
          </h2>
        </div>

        <ChartsSection
          loanData={calculatedData.loanData}
          sipData={calculatedData.sipData}
          isLoading={isCalculating}
        />
      </div>
    </div>
  );
};

export default Calculator;
