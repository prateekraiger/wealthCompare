import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useTheme } from "../contexts/ThemeContext.jsx";
import Loader from "./Loader.jsx";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ChartsSection = ({ loanData, sipData, isLoading }) => {
  const { isDark } = useTheme();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="theme-card-bg rounded-xl border-2 theme-border p-6 flex flex-col items-center justify-center min-h-[300px] shadow-lg"
          >
            <Loader size="lg" color="primary" />
            <p className="theme-text-secondary text-sm mt-4">
              Loading chart data...
            </p>
          </div>
        ))}
      </div>
    );
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: isDark ? "#1f2937" : "#ffffff",
        titleColor: isDark ? "#ffffff" : "#374151",
        bodyColor: isDark ? "#d1d5db" : "#6b7280",
        borderColor: isDark ? "#374151" : "#e5e7eb",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function (context) {
            const value = context.parsed.y;
            return `₹${(value / 100000).toFixed(1)}L`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: isDark ? "#374151" : "#e5e7eb",
          borderColor: isDark ? "#4b5563" : "#d1d5db",
        },
        ticks: {
          color: isDark ? "#9ca3af" : "#6b7280",
          font: {
            size: 11,
          },
        },
      },
      y: {
        grid: {
          color: isDark ? "#374151" : "#e5e7eb",
          borderColor: isDark ? "#4b5563" : "#d1d5db",
        },
        ticks: {
          color: isDark ? "#9ca3af" : "#6b7280",
          font: {
            size: 11,
          },
          callback: function (value) {
            return `₹${(value / 100000).toFixed(0)}L`;
          },
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 0,
        hoverRadius: 6,
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
  };

  const loanChartData = {
    labels: loanData
      .map((_, index) => `Year ${Math.ceil((index + 1) / 12)}`)
      .filter((_, index) => index % 12 === 11),
    datasets: [
      {
        label: "Remaining Principal",
        data: loanData
          .filter((_, index) => index % 12 === 11)
          .map((item) => item.remainingPrincipal),
        borderColor: isDark ? "#3c6e71" : "#284b63",
        backgroundColor: isDark
          ? "rgba(60, 110, 113, 0.1)"
          : "rgba(40, 75, 99, 0.1)",
        fill: true,
        borderWidth: 3,
      },
    ],
  };

  const sipChartData = {
    labels: sipData
      .map((_, index) => `Year ${Math.ceil((index + 1) / 12)}`)
      .filter((_, index) => index % 12 === 11),
    datasets: [
      {
        label: "SIP Value",
        data: sipData
          .filter((_, index) => index % 12 === 11)
          .map((item) => item.value),
        borderColor: isDark ? "#284b63" : "#3c6e71",
        backgroundColor: isDark
          ? "rgba(40, 75, 99, 0.1)"
          : "rgba(60, 110, 113, 0.1)",
        fill: true,
        borderWidth: 3,
      },
    ],
  };

  const charts = [
    {
      title: "Investment Decline",
      subtitle: "Principal amount over time",
      data: loanChartData,
      color: isDark ? "#3c6e71" : "#284b63",
    },
    {
      title: "SIP Growth Timeline",
      subtitle: "Investment value accumulation",
      data: sipChartData,
      color: isDark ? "#284b63" : "#3c6e71",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {charts.map((chart, index) => (
        <div
          key={index}
          className="theme-card-bg backdrop-blur-sm rounded-xl border-2 theme-border p-6 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 shadow-lg cursor-pointer"
        >
          <div className="mb-4">
            <h3 className="text-lg font-semibold theme-text-primary mb-1">
              {chart.title}
            </h3>
            <p className="text-sm theme-text-secondary">{chart.subtitle}</p>
          </div>
          <div className="h-64">
            <Line data={chart.data} options={chartOptions} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChartsSection;
