'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  PieChart, 
  Download,
  Target,
  Percent
} from 'lucide-react';
import { SimulationResults, InvestmentParameters } from '@/types/investment';
import { DividendCalculator, formatCurrency, formatPercentage } from '@/utils/dividendCalculator';
import { fadeInUp, cn } from '@/utils/utils';

interface ResultsPanelProps {
  results: SimulationResults | null;
  params: InvestmentParameters;
  calculator: DividendCalculator;
}

type TabType = 'summary' | 'breakdown' | 'goals';

export default function ResultsPanel({ results, params, calculator }: ResultsPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('summary');

  if (!results) {
    return (
      <motion.div
        className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-600/50 p-8"
        variants={fadeInUp}
      >
        <div className="text-center text-slate-400">
          <PieChart className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Configure your investment parameters to see detailed results.</p>
        </div>
      </motion.div>
    );
  }

  const weightedYield = calculator.calculateWeightedDividendYield(params.allocations);
  const totalReturn = ((results.finalPortfolioValue / results.totalInvestmentMade) - 1) * 100;
  const annualizedReturn = Math.pow(results.finalPortfolioValue / results.totalInvestmentMade, 1 / params.investmentDuration) - 1;
  const dividendYield = (results.totalDividendsReceived / results.totalInvestmentMade) * 100;

  const summaryMetrics = [
    {
      title: 'Final Portfolio Value',
      value: formatCurrency(results.finalPortfolioValue),
      icon: DollarSign,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/20',
      change: `+${formatPercentage(totalReturn, 1)}`
    },
    {
      title: 'Total Dividends Received',
      value: formatCurrency(results.totalDividendsReceived),
      icon: TrendingUp,
      color: 'text-green-400',
      bg: 'bg-green-500/20',
      change: `${formatPercentage(dividendYield, 1)} yield`
    },
    {
      title: 'Average Monthly Income',
      value: formatCurrency(results.averageMonthlyIncome),
      icon: Calendar,
      color: 'text-purple-400',
      bg: 'bg-purple-500/20',
      change: `${formatCurrency(results.averageMonthlyIncome * 12)}/year`
    },
    {
      title: 'Annualized Return',
      value: formatPercentage(annualizedReturn * 100, 2),
      icon: Target,
      color: 'text-pink-400',
      bg: 'bg-pink-500/20',
      change: `vs ${formatPercentage(weightedYield, 1)} yield`
    }
  ];

  const monthlyIncomeGoals = [
    { amount: 1000, label: 'Basic Expenses' },
    { amount: 2500, label: 'Comfortable Living' },
    { amount: 5000, label: 'Luxury Lifestyle' },
    { amount: 10000, label: 'Financial Freedom' }
  ];

  const timeToGoal = (goalAmount: number) => {
    const monthsToGoal = results.monthlyResults.findIndex(
      month => month.monthlyDividendIncome >= goalAmount
    );
    return monthsToGoal > 0 ? monthsToGoal : null;
  };

  const tabs = [
    { id: 'summary', label: 'Summary', icon: PieChart },
    { id: 'breakdown', label: 'Breakdown', icon: Percent },
    { id: 'goals', label: 'Income Goals', icon: Target }
  ];

  const exportResults = () => {
    const csvContent = [
      'Year,Portfolio Value,Total Investment,Annual Dividend Income,Cumulative Dividends',
      ...results.yearlyResults.map(year => 
        `${year.year},${year.portfolioValue},${year.totalInvestment},${year.annualDividendIncome},${year.cumulativeDividends}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dividend-projection.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-600/50 overflow-hidden"
      variants={fadeInUp}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-700/50 to-slate-600/50 p-4 border-b border-slate-600/50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Investment Results</h2>
          <motion.button
            onClick={exportResults}
            className="flex items-center space-x-2 px-3 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 rounded-lg transition-colors text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </motion.button>
        </div>

        <div className="flex space-x-1 bg-slate-800/50 rounded-lg p-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all",
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg"
                    : "text-slate-400 hover:text-slate-300 hover:bg-slate-700/50"
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'summary' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {summaryMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={metric.title}
                  className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", metric.bg)}>
                      <Icon className={cn("w-5 h-5", metric.color)} />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-slate-400 uppercase tracking-wider">
                        {metric.title}
                      </div>
                    </div>
                  </div>
                  <div className={cn("text-2xl font-bold mb-1", metric.color)}>
                    {metric.value}
                  </div>
                  <div className="text-xs text-slate-500">
                    {metric.change}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {activeTab === 'breakdown' && (
          <div className="space-y-6">
            {/* Investment Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">Investment Breakdown</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-slate-300">Total Invested</span>
                    <span className="font-bold text-cyan-400">{formatCurrency(results.totalInvestmentMade)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-slate-300">Portfolio Growth</span>
                    <span className="font-bold text-green-400">
                      {formatCurrency(results.finalPortfolioValue - results.totalInvestmentMade)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-slate-300">Dividends Collected</span>
                    <span className="font-bold text-purple-400">{formatCurrency(results.totalDividendsReceived)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-slate-300">Total Return</span>
                    <span className="font-bold text-pink-400">{formatPercentage(totalReturn, 1)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">Portfolio Allocation</h3>
                <div className="space-y-3">
                  {params.allocations.map((allocation) => {
                    const stock = calculator.getStock(allocation.symbol);
                    return stock ? (
                      <div key={allocation.symbol} className="p-3 bg-slate-700/30 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-white">{stock.symbol}</span>
                          <span className="text-cyan-400 font-bold">{formatPercentage(allocation.percentage, 0)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Yield: {formatPercentage(stock.dividendYield, 1)}</span>
                          <span className="text-slate-400">Growth: {formatPercentage(stock.annualGrowthRate, 1)}</span>
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'goals' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white mb-4">Monthly Income Goals</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {monthlyIncomeGoals.map((goal, index) => {
                const monthsToGoal = timeToGoal(goal.amount);
                const currentMonthlyIncome = results.monthlyResults[results.monthlyResults.length - 1]?.monthlyDividendIncome || 0;
                const achieved = currentMonthlyIncome >= goal.amount;
                
                return (
                  <motion.div
                    key={goal.amount}
                    className={cn(
                      "p-4 rounded-xl border transition-all",
                      achieved 
                        ? "bg-green-500/10 border-green-500/30" 
                        : "bg-slate-700/30 border-slate-600/30"
                    )}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-white">{goal.label}</h4>
                      <div className={cn(
                        "w-3 h-3 rounded-full",
                        achieved ? "bg-green-400" : "bg-slate-500"
                      )} />
                    </div>
                    <div className="text-2xl font-bold text-cyan-400 mb-2">
                      {formatCurrency(goal.amount)}/month
                    </div>
                    <div className="text-sm text-slate-400">
                      {achieved ? (
                        <span className="text-green-400">✓ Goal achieved</span>
                      ) : monthsToGoal ? (
                        <span>Achievable in {Math.ceil(monthsToGoal / 12)} years</span>
                      ) : (
                        <span>Goal not reached in projection period</span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
