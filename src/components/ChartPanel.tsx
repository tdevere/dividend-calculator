"use client";

import { SimulationResults } from "@/types/investment";
import {
  formatCurrency,
  formatCurrencyDetailed,
} from "@/utils/dividendCalculator";
import { chartColors, cn, fadeInUp } from "@/utils/utils";
import { motion } from "framer-motion";
import { BarChart3, Calendar, DollarSign, TrendingUp } from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ChartPanelProps {
  results: SimulationResults | null;
}

type ChartType = "portfolio" | "income" | "cumulative" | "annual";

export default function ChartPanel({ results }: ChartPanelProps) {
  const [activeChart, setActiveChart] = useState<ChartType>("portfolio");

  if (!results) {
    return (
      <motion.div
        className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-600/50 p-8"
        variants={fadeInUp}
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-300 mb-2">
            No Data Available
          </h3>
          <p className="text-slate-500">
            Adjust your investment parameters to see projections.
          </p>
        </div>
      </motion.div>
    );
  }

  // Prepare chart data
  const chartData = results.yearlyResults.map((year) => ({
    year: year.year,
    portfolioValue: year.portfolioValue,
    totalInvestment: year.totalInvestment,
    annualDividendIncome: year.annualDividendIncome,
    cumulativeDividends: year.cumulativeDividends,
    netGain: year.portfolioValue - year.totalInvestment,
  }));

  const monthlyIncomeData = results.monthlyResults
    .filter((_, index) => index % 3 === 0) // Show every 3rd month for clarity
    .map((month) => ({
      month: `M${month.month}`,
      income: month.monthlyDividendIncome,
      portfolioValue: month.portfolioValue,
    }));

  const chartTabs = [
    { id: "portfolio", label: "Portfolio Growth", icon: TrendingUp },
    { id: "income", label: "Monthly Income", icon: Calendar },
    { id: "cumulative", label: "Cumulative Returns", icon: DollarSign },
    { id: "annual", label: "Annual Summary", icon: BarChart3 },
  ];

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: Array<{
      value: number;
      name: string;
      color: string;
    }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800/95 backdrop-blur-sm border border-slate-600/50 rounded-lg p-3 shadow-xl">
          <p className="text-slate-300 font-medium mb-2">{`Year ${label}`}</p>
          {payload.map((entry, entryIndex) => (
            <p
              key={entryIndex}
              className="text-sm"
              style={{ color: entry.color }}
            >
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (activeChart) {
      case "portfolio":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient
                  id="portfolioGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={chartColors.primary}
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor={chartColors.primary}
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient
                  id="investmentGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={chartColors.accent}
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor={chartColors.accent}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="year"
                stroke="#9CA3AF"
                tick={{ fill: "#9CA3AF" }}
              />
              <YAxis
                stroke="#9CA3AF"
                tick={{ fill: "#9CA3AF" }}
                tickFormatter={(value) => formatCurrency(value)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="totalInvestment"
                stroke={chartColors.accent}
                fillOpacity={1}
                fill="url(#investmentGradient)"
                name="Total Investment"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="portfolioValue"
                stroke={chartColors.primary}
                fillOpacity={1}
                fill="url(#portfolioGradient)"
                name="Portfolio Value"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      case "income":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={monthlyIncomeData.slice(0, 40)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="month"
                stroke="#9CA3AF"
                tick={{ fill: "#9CA3AF" }}
              />
              <YAxis
                stroke="#9CA3AF"
                tick={{ fill: "#9CA3AF" }}
                tickFormatter={(value) => formatCurrency(value)}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-slate-800/95 backdrop-blur-sm border border-slate-600/50 rounded-lg p-3">
                        <p className="text-slate-300 font-medium">{label}</p>
                        <p className="text-green-400">
                          Monthly Income:{" "}
                          {formatCurrencyDetailed(payload[0].value)}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="income"
                fill={chartColors.secondary}
                name="Monthly Income"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );

      case "cumulative":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="year"
                stroke="#9CA3AF"
                tick={{ fill: "#9CA3AF" }}
              />
              <YAxis
                stroke="#9CA3AF"
                tick={{ fill: "#9CA3AF" }}
                tickFormatter={(value) => formatCurrency(value)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="cumulativeDividends"
                stroke={chartColors.success}
                strokeWidth={3}
                dot={{ fill: chartColors.success, strokeWidth: 2, r: 4 }}
                name="Cumulative Dividends"
              />
              <Line
                type="monotone"
                dataKey="netGain"
                stroke={chartColors.warning}
                strokeWidth={3}
                dot={{ fill: chartColors.warning, strokeWidth: 2, r: 4 }}
                name="Net Gain"
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case "annual":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="year"
                stroke="#9CA3AF"
                tick={{ fill: "#9CA3AF" }}
              />
              <YAxis
                stroke="#9CA3AF"
                tick={{ fill: "#9CA3AF" }}
                tickFormatter={(value) => formatCurrency(value)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar
                dataKey="annualDividendIncome"
                fill={chartColors.secondary}
                name="Annual Dividend Income"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-600/50 overflow-hidden"
      variants={fadeInUp}
    >
      {/* Header with Tabs */}
      <div className="bg-gradient-to-r from-slate-700/50 to-slate-600/50 p-4 border-b border-slate-600/50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">
            Investment Projections
          </h2>
          <div className="text-sm text-slate-400">
            {results.monthlyResults.length} months projected
          </div>
        </div>

        <div className="flex space-x-1 bg-slate-800/50 rounded-lg p-1">
          {chartTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveChart(tab.id as ChartType)}
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all",
                  activeChart === tab.id
                    ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg"
                    : "text-slate-400 hover:text-slate-300 hover:bg-slate-700/50",
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chart Content */}
      <div className="p-6">{renderChart()}</div>
    </motion.div>
  );
}
