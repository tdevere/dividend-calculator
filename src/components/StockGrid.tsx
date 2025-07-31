"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Building2, DollarSign } from "lucide-react";
import {
  DividendCalculator,
  formatPercentage,
} from "@/utils/dividendCalculator";
import { PortfolioAllocation } from "@/types/investment";
import { fadeInUp, cn } from "@/utils/utils";

interface StockGridProps {
  calculator: DividendCalculator;
  allocations: PortfolioAllocation[];
}

export default function StockGrid({ calculator, allocations }: StockGridProps) {
  const stocks = calculator.getAllStocks();
  const weightedYield = calculator.calculateWeightedDividendYield(allocations);

  const getAllocationForStock = (symbol: string) => {
    return (
      allocations.find((alloc) => alloc.symbol === symbol)?.percentage || 0
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "ETF":
        return <Building2 className="w-4 h-4" />;
      case "REIT":
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <DollarSign className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "ETF":
        return "from-blue-500 to-cyan-500";
      case "REIT":
        return "from-green-500 to-emerald-500";
      default:
        return "from-purple-500 to-pink-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Portfolio Summary Header */}
      <motion.div
        className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/50"
        variants={fadeInUp}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-1">
              {formatPercentage(weightedYield, 2)}
            </div>
            <div className="text-slate-400 text-sm">Weighted Avg Yield</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-1">
              {stocks.length}
            </div>
            <div className="text-slate-400 text-sm">Selected Assets</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-400 mb-1">
              {allocations.length}
            </div>
            <div className="text-slate-400 text-sm">Active Positions</div>
          </div>
        </div>
      </motion.div>

      {/* Stocks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stocks.map((stock, index) => {
          const allocation = getAllocationForStock(stock.symbol);
          const isAllocated = allocation > 0;

          return (
            <motion.div
              key={stock.symbol}
              className={cn(
                "relative overflow-hidden rounded-xl border transition-all duration-300",
                isAllocated
                  ? "bg-gradient-to-br from-slate-800/80 to-slate-700/80 border-cyan-500/50 shadow-lg shadow-cyan-500/20"
                  : "bg-slate-800/50 border-slate-600/50 hover:border-slate-500/50",
              )}
              variants={fadeInUp}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              {/* Allocation Badge */}
              {isAllocated && (
                <div className="absolute top-3 right-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                  {formatPercentage(allocation, 0)}
                </div>
              )}

              <div className="p-4">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">
                      {stock.symbol}
                    </h3>
                    <div
                      className={cn(
                        "flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-medium",
                        `bg-gradient-to-r ${getTypeColor(stock.type)} text-white`,
                      )}
                    >
                      {getTypeIcon(stock.type)}
                      <span>{stock.type}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xl font-bold text-green-400">
                      {formatPercentage(stock.dividendYield, 1)}
                    </div>
                    <div className="text-xs text-slate-400">Yield</div>
                  </div>
                </div>

                {/* Company Name */}
                <p className="text-sm text-slate-300 mb-3 line-clamp-2">
                  {stock.name}
                </p>

                {/* Metrics */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400">
                      Annual Growth
                    </span>
                    <div className="flex items-center space-x-1">
                      {stock.annualGrowthRate >= 0 ? (
                        <TrendingUp className="w-3 h-3 text-green-400" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-red-400" />
                      )}
                      <span
                        className={cn(
                          "text-xs font-medium",
                          stock.annualGrowthRate >= 0
                            ? "text-green-400"
                            : "text-red-400",
                        )}
                      >
                        {formatPercentage(stock.annualGrowthRate, 1)}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400">Sector</span>
                    <span className="text-xs text-slate-300">
                      {stock.sector}
                    </span>
                  </div>
                </div>

                {/* Progress bar for allocation */}
                {isAllocated && (
                  <div className="mt-3">
                    <div className="w-full bg-slate-700 rounded-full h-1.5">
                      <div
                        className="bg-gradient-to-r from-cyan-400 to-purple-400 h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(allocation, 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
