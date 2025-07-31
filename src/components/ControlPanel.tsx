"use client";

import { motion } from "framer-motion";
import {
  DollarSign,
  Calendar,
  TrendingUp,
  RotateCcw,
  Settings,
} from "lucide-react";
import { InvestmentParameters } from "@/types/investment";
import { DividendCalculator, formatCurrency } from "@/utils/dividendCalculator";
import { fadeInUp, cn } from "@/utils/utils";

interface ControlPanelProps {
  params: InvestmentParameters;
  onParamsChange: (updates: Partial<InvestmentParameters>) => void;
  calculator: DividendCalculator;
}

export default function ControlPanel({
  params,
  onParamsChange,
  calculator,
}: ControlPanelProps) {
  const stocks = calculator.getAllStocks();

  const handleSliderChange = (
    field: keyof InvestmentParameters,
    value: number,
  ) => {
    onParamsChange({ [field]: value });
  };

  const handleAllocationChange = (symbol: string, percentage: number) => {
    const updatedAllocations = [...params.allocations];
    const existingIndex = updatedAllocations.findIndex(
      (alloc) => alloc.symbol === symbol,
    );

    if (existingIndex >= 0) {
      if (percentage === 0) {
        updatedAllocations.splice(existingIndex, 1);
      } else {
        updatedAllocations[existingIndex].percentage = percentage;
      }
    } else if (percentage > 0) {
      updatedAllocations.push({ symbol, percentage });
    }

    onParamsChange({ allocations: updatedAllocations });
  };

  const getTotalAllocation = () => {
    return params.allocations.reduce((sum, alloc) => sum + alloc.percentage, 0);
  };

  const getAllocationForStock = (symbol: string) => {
    return (
      params.allocations.find((alloc) => alloc.symbol === symbol)?.percentage ||
      0
    );
  };

  const resetToDefaults = () => {
    onParamsChange({
      initialInvestment: 50000,
      monthlyContribution: 2000,
      investmentDuration: 20,
      reinvestDividends: true,
    });
  };

  return (
    <motion.div
      className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-600/50 overflow-hidden"
      variants={fadeInUp}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-700/50 to-slate-600/50 p-4 border-b border-slate-600/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
              <Settings className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-white">
              Investment Parameters
            </h2>
          </div>
          <motion.button
            onClick={resetToDefaults}
            className="p-2 text-slate-400 hover:text-cyan-400 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Reset to defaults"
          >
            <RotateCcw className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Initial Investment */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 text-sm font-medium text-slate-300">
              <DollarSign className="w-4 h-4 text-cyan-400" />
              <span>Initial Investment</span>
            </label>
            <span className="text-cyan-400 font-bold">
              {formatCurrency(params.initialInvestment)}
            </span>
          </div>
          <input
            type="range"
            min="1000"
            max="1000000"
            step="1000"
            value={params.initialInvestment}
            onChange={(e) =>
              handleSliderChange("initialInvestment", parseInt(e.target.value))
            }
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>$1K</span>
            <span>$1M</span>
          </div>
        </div>

        {/* Monthly Contribution */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 text-sm font-medium text-slate-300">
              <Calendar className="w-4 h-4 text-purple-400" />
              <span>Monthly Contribution</span>
            </label>
            <span className="text-purple-400 font-bold">
              {formatCurrency(params.monthlyContribution)}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="10000"
            step="100"
            value={params.monthlyContribution}
            onChange={(e) =>
              handleSliderChange(
                "monthlyContribution",
                parseInt(e.target.value),
              )
            }
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>$0</span>
            <span>$10K</span>
          </div>
        </div>

        {/* Investment Duration */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 text-sm font-medium text-slate-300">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span>Duration</span>
            </label>
            <span className="text-green-400 font-bold">
              {params.investmentDuration} years
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="40"
            step="1"
            value={params.investmentDuration}
            onChange={(e) =>
              handleSliderChange("investmentDuration", parseInt(e.target.value))
            }
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>1 year</span>
            <span>40 years</span>
          </div>
        </div>

        {/* Reinvest Dividends Toggle */}
        <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
          <div>
            <div className="text-sm font-medium text-slate-300">
              Reinvest Dividends
            </div>
            <div className="text-xs text-slate-500">
              Automatically reinvest dividend payments
            </div>
          </div>
          <button
            onClick={() =>
              onParamsChange({ reinvestDividends: !params.reinvestDividends })
            }
            className={cn(
              "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
              params.reinvestDividends ? "bg-cyan-500" : "bg-slate-600",
            )}
          >
            <span
              className={cn(
                "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                params.reinvestDividends ? "translate-x-6" : "translate-x-1",
              )}
            />
          </button>
        </div>

        {/* Portfolio Allocation */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-slate-300">
              Portfolio Allocation
            </h3>
            <span
              className={cn(
                "text-xs px-2 py-1 rounded-full",
                Math.abs(getTotalAllocation() - 100) < 0.1
                  ? "bg-green-500/20 text-green-400"
                  : "bg-yellow-500/20 text-yellow-400",
              )}
            >
              {getTotalAllocation().toFixed(0)}%
            </span>
          </div>

          <div className="space-y-3 max-h-60 overflow-y-auto">
            {stocks.slice(0, 6).map((stock) => {
              const allocation = getAllocationForStock(stock.symbol);
              return (
                <div key={stock.symbol} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-white">
                        {stock.symbol}
                      </span>
                      <div className="text-xs text-slate-400">
                        {stock.name.slice(0, 25)}...
                      </div>
                    </div>
                    <span className="text-sm font-bold text-cyan-400">
                      {allocation.toFixed(0)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="1"
                    value={allocation}
                    onChange={(e) =>
                      handleAllocationChange(
                        stock.symbol,
                        parseInt(e.target.value),
                      )
                    }
                    className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer slider-small"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Custom CSS for sliders */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #00d9ff, #8338ec);
          cursor: pointer;
          box-shadow: 0 0 10px rgba(0, 217, 255, 0.5);
        }

        .slider-small::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: linear-gradient(45deg, #00d9ff, #8338ec);
          cursor: pointer;
          box-shadow: 0 0 8px rgba(0, 217, 255, 0.3);
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #00d9ff, #8338ec);
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(0, 217, 255, 0.5);
        }
      `}</style>
    </motion.div>
  );
}
