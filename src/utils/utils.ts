import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Animation variants for Framer Motion
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export const slideInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5 }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.3 }
};

// Chart color palette with vibrant/neon theme
export const chartColors = {
  primary: '#00D9FF',      // Neon cyan
  secondary: '#FF006E',    // Neon pink
  accent: '#8338EC',       // Purple
  success: '#06FFA5',      // Neon green
  warning: '#FFD60A',      // Bright yellow
  info: '#003566',         // Dark blue
  gradient: {
    primary: 'from-cyan-400 to-blue-500',
    secondary: 'from-pink-400 to-red-500',
    accent: 'from-purple-400 to-indigo-500',
    success: 'from-green-400 to-emerald-500',
  }
};

// Chart configuration helpers
export const getChartConfig = () => ({
  portfolioValue: {
    label: 'Portfolio Value',
    color: chartColors.primary,
  },
  dividendIncome: {
    label: 'Dividend Income',
    color: chartColors.secondary,
  },
  totalInvestment: {
    label: 'Total Investment',
    color: chartColors.accent,
  },
  cumulativeDividends: {
    label: 'Cumulative Dividends',
    color: chartColors.success,
  },
});

// Responsive breakpoints
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};
