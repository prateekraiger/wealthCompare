import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  BookOpen,
  Calculator,
  TrendingUp,
  Lightbulb,
  Target,
} from "lucide-react";

const EducationSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const financialTerms = [
    {
      term: "SIP (Systematic Investment Plan)",
      icon: TrendingUp,
      definition:
        "A disciplined investment approach where you invest a fixed amount regularly in mutual funds or investment vehicles.",
      benefits: [
        "Rupee Cost Averaging - Buy more units when prices are low",
        "Disciplined investing habit formation",
        "Compound growth over time",
        "Start with as little as ₹500 per month",
      ],
      example:
        "Investing ₹10,000 monthly for 20 years at 12% annual return = ₹99.9 lakhs",
    },

    {
      term: "Compound Interest",
      icon: Target,
      definition:
        "Interest earned on both the principal amount and previously earned interest - 'interest on interest'.",
      benefits: [
        "Exponential growth over time",
        "Time is your biggest advantage",
        "Small amounts can grow significantly",
        "The 8th wonder of the world - Einstein",
      ],
      example:
        "₹1L at 10% for 10 years: Simple Interest = ₹2L, Compound Interest = ₹2.59L",
    },
  ];

  const faqs = [
    {
      question: "Is 12% return rate realistic for SIP investments?",
      answer:
        "12% is based on historical averages of equity mutual funds over 15-20 year periods. However, actual returns vary year to year due to market volatility. Conservative investors might use 8-10%, while aggressive investors might expect 12-15%. Always invest based on your risk tolerance.",
    },
    {
      question: "When should I start investing in SIP?",
      answer:
        "The best time to start is NOW! Due to compound interest, even a few years can make a huge difference. Start with whatever amount you can afford - even ₹500 per month. You can always increase the amount later as your income grows.",
    },
    {
      question: "What if I need money before the investment period ends?",
      answer:
        "Most SIP investments in mutual funds are liquid, meaning youcan withdraw anytime. However, for optimal returns, it's recommended to stay invested for the full period. Consider maintaining a separate emergency fund for unexpected expenses.",
    },
    {
      question: "How accurate are these calculations?",
      answer:
        "These calculations provide a good estimate based on standard financial formulas. However, actual results may vary due to market conditions, fund performance, fees, taxes, and economic factors. Use this as a planning tool, not a guarantee.",
    },
    {
      question: "Should I pay off loans first or start investing?",
      answer:
        "It depends on the interest rates. If your loan interest rate is higher than expected investment returns, prioritize loan repayment. For example, if your loan is at 15% and expected SIP return is 12%, pay off the loan first. However, if loan rate is 8% and SIP return is 12%, you might benefit from investing.",
    },
    {
      question: "What's the minimum amount needed to start SIP?",
      answer:
        "Most mutual funds allow SIP starting from ₹500 per month. However, to see meaningful wealth creation, try to invest at least 10-15% of your monthly income. Start small and gradually increase your SIP amount with salary increments.",
    },
  ];

  return (
    <div className="theme-card-bg backdrop-blur-md rounded-xl sm:rounded-2xl border-2 p-4 sm:p-6 md:p-8 shadow-xl transition-all duration-300">
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
        <div className="p-1.5 sm:p-2 bg-gradient-to-br from-[#284b63] to-[#3c6e71] rounded-lg">
          <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold theme-text-primary">
            Financial Education Center
          </h2>
          <p className="text-sm theme-text-secondary">
            Understand the terms and concepts behind your financial calculations
          </p>
        </div>
      </div>

      {/* Financial Terms */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold theme-text-primary mb-4 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-[#284b63] dark:text-[#3c6e71]" />
          Key Financial Terms
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {financialTerms.map((term, index) => (
            <div
              key={index}
              className="theme-card-bg rounded-lg p-4 sm:p-5 border-2 theme-border shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer hover:border-[#284b63]/30 dark:hover:border-[#3c6e71]/40 hover:bg-[#284b63]/5 dark:hover:bg-[#3c6e71]/10"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-br from-[#284b63] to-[#3c6e71] rounded-lg">
                  <term.icon className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-semibold theme-text-primary text-sm sm:text-base">
                  {term.term}
                </h4>
              </div>

              <p className="text-sm theme-text-secondary mb-3 leading-relaxed">
                {term.definition}
              </p>

              <div className="space-y-1 mb-3">
                {term.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs">
                    <div className="w-1 h-1 bg-[#284b63] dark:bg-[#3c6e71] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="theme-text-muted">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-[#284b63]/10 to-[#3c6e71]/10 dark:from-[#284b63]/20 dark:to-[#3c6e71]/20 rounded-lg p-3 mt-3 border border-[#284b63]/20 dark:border-[#3c6e71]/30">
                <p className="text-xs theme-text-primary font-medium">
                  Example: {term.example}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div>
        <h3 className="text-lg font-semibold theme-text-primary mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-[#284b63] dark:text-[#3c6e71]" />
          Frequently Asked Questions
        </h3>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="theme-card-bg rounded-lg border-2 theme-border overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.01] hover:border-[#284b63]/30 dark:hover:border-[#3c6e71]/40 hover:bg-[#284b63]/5 dark:hover:bg-[#3c6e71]/10"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-4 text-left flex items-center justify-between hover:bg-[#284b63]/10 dark:hover:bg-[#3c6e71]/20 transition-all duration-200 hover:scale-[1.005] hover:shadow-inner"
              >
                <h4 className="font-medium theme-text-primary text-sm sm:text-base pr-4">
                  {faq.question}
                </h4>
                {openFAQ === index ? (
                  <ChevronUp className="w-5 h-5 text-[#284b63] dark:text-[#3c6e71] flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#284b63] dark:text-[#3c6e71] flex-shrink-0" />
                )}
              </button>

              {openFAQ === index && (
                <div className="px-4 pb-4">
                  <div className="pt-2 border-t theme-border">
                    <p className="text-sm theme-text-secondary leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EducationSection;
