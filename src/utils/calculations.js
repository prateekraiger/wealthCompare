// Financial calculation utilities

const SIP_ANNUAL_RETURN = 12; // 12% annual return for SIP (default)

export const calculateLoanData = (loanAmount, annualRate, tenureYears) => {
  const monthlyRate = annualRate / 100 / 12;
  const totalMonths = tenureYears * 12;
  
  // Calculate EMI using the standard formula
  const emi = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
              (Math.pow(1 + monthlyRate, totalMonths) - 1);
  
  let remainingPrincipal = loanAmount;
  const monthlyData = [];
  let totalInterest = 0;
  
  for (let month = 1; month <= totalMonths; month++) {
    const interestPayment = remainingPrincipal * monthlyRate;
    const principalPayment = emi - interestPayment;
    
    remainingPrincipal = Math.max(0, remainingPrincipal - principalPayment);
    totalInterest += interestPayment;
    
    monthlyData.push({
      month,
      emi: Math.round(emi),
      principalPayment: Math.round(principalPayment),
      interestPayment: Math.round(interestPayment),
      remainingPrincipal: Math.round(remainingPrincipal),
      totalInterestPaid: Math.round(totalInterest)
    });
  }
  
  return {
    emi: Math.round(emi),
    totalInterest: Math.round(totalInterest),
    totalAmount: Math.round(loanAmount + totalInterest),
    monthlyData
  };
};

export const calculateSIPData = (monthlyAmount, tenureYears) => {
  const monthlyRate = SIP_ANNUAL_RETURN / 100 / 12;
  const totalMonths = tenureYears * 12;
  
  const sipData = [];
  let totalInvested = 0;
  let currentValue = 0;
  
  for (let month = 1; month <= totalMonths; month++) {
    totalInvested += monthlyAmount;
    
    // Apply monthly compounding
    currentValue = (currentValue + monthlyAmount) * (1 + monthlyRate);
    
    sipData.push({
      month,
      monthlyInvestment: monthlyAmount,
      totalInvested,
      value: Math.round(currentValue),
      gains: Math.round(currentValue - totalInvested)
    });
  }
  
  return sipData;
};

export const calculateNetPosition = (loanData, sipData) => {
  const netPositionData = [];
  
  const maxLength = Math.min(loanData.length, sipData.length);
  
  for (let i = 0; i < maxLength; i++) {
    const sipValue = sipData[i].value;
    const remainingLoan = loanData[i].remainingPrincipal;
    const netPosition = sipValue - remainingLoan;
    
    netPositionData.push({
      month: i + 1,
      sipValue,
      remainingLoan,
      netPosition: Math.round(netPosition)
    });
  }
  
  return netPositionData;
};

// Helper function to format currency
export const formatCurrency = (amount) => {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(1)}Cr`;
  } else if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  } else if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}K`;
  } else {
    return `₹${amount.toLocaleString()}`;
  }
};

// Helper function to calculate percentage
export const calculatePercentage = (part, whole) => {
  return whole > 0 ? ((part / whole) * 100).toFixed(1) : 0;
};