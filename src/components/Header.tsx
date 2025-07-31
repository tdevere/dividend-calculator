"use client";

import { motion } from "framer-motion";
import { TrendingUp, DollarSign, BarChart3 } from "lucide-react";
import { slideInLeft } from "@/utils/utils";

export default function Header() {
  return (
    <motion.header
      className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50"
      variants={slideInLeft}
      initial="initial"
      animate="animate"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">
                <DollarSign className="w-2.5 h-2.5 text-slate-900" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">DividendCalc</h1>
              <p className="text-xs text-slate-400">Investment Calculator</p>
            </div>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <motion.a
              href="#calculator"
              className="text-slate-300 hover:text-cyan-400 transition-colors"
              whileHover={{ y: -2 }}
            >
              Calculator
            </motion.a>
            <motion.a
              href="#strategies"
              className="text-slate-300 hover:text-cyan-400 transition-colors"
              whileHover={{ y: -2 }}
            >
              Strategies
            </motion.a>
            <motion.a
              href="#portfolio"
              className="text-slate-300 hover:text-cyan-400 transition-colors"
              whileHover={{ y: -2 }}
            >
              Portfolio
            </motion.a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <motion.button
              className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <BarChart3 className="w-4 h-4" />
              <span className="text-sm">Export</span>
            </motion.button>

            <motion.button
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white rounded-lg font-medium transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
