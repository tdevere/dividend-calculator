'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { DividendCalculator } from '@/utils/dividendCalculator';
import { DEFAULT_INVESTMENT_PARAMS, InvestmentParameters } from '@/types/investment';
import { fadeInUp, staggerContainer } from '@/utils/utils';
import Header from '@/components/Header';
import ControlPanel from '@/components/ControlPanel';
import ChartPanel from '@/components/ChartPanel';
import ResultsPanel from '@/components/ResultsPanel';
import StockGrid from '@/components/StockGrid';

export default function Home() {
  const [investmentParams, setInvestmentParams] = useState<InvestmentParameters>(DEFAULT_INVESTMENT_PARAMS);
  const calculator = useMemo(() => new DividendCalculator(), []);

  // Calculate simulation results
  const simulationResults = useMemo(() => {
    try {
      return calculator.calculateDividendProjection(investmentParams);
    } catch (error) {
      console.error('Calculation error:', error);
      return null;
    }
  }, [investmentParams, calculator]);

  const handleParameterChange = (updates: Partial<InvestmentParameters>) => {
    setInvestmentParams(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      
      <motion.main 
        className="container mx-auto px-4 py-8"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-12"
          variants={fadeInUp}
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Live Off Dividends
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Build Wealth with High-Yield Strategies. Explore potential monthly dividend income 
            and long-term portfolio growth with our interactive calculator.
          </p>
        </motion.div>

        {/* Stock Overview Grid */}
        <motion.div variants={fadeInUp} className="mb-8">
          <StockGrid calculator={calculator} allocations={investmentParams.allocations} />
        </motion.div>

        {/* Main Dashboard Grid */}
        <div className="grid lg:grid-cols-4 gap-8 mb-8">
          {/* Control Panel */}
          <motion.div variants={fadeInUp} className="lg:col-span-1">
            <ControlPanel 
              params={investmentParams}
              onParamsChange={handleParameterChange}
              calculator={calculator}
            />
          </motion.div>

          {/* Chart Panel */}
          <motion.div variants={fadeInUp} className="lg:col-span-3">
            <ChartPanel results={simulationResults} />
          </motion.div>
        </div>

        {/* Results Summary */}
        <motion.div variants={fadeInUp}>
          <ResultsPanel 
            results={simulationResults} 
            params={investmentParams}
            calculator={calculator}
          />
        </motion.div>
      </motion.main>
    </div>
  );
}
