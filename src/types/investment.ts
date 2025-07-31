export interface DividendStock {
  symbol: string;
  name: string;
  dividendYield: number; // Annual dividend yield as percentage
  annualGrowthRate: number; // Expected annual growth rate as percentage
  sector: string;
  type: "ETF" | "REIT" | "Stock";
}

export interface PortfolioAllocation {
  symbol: string;
  percentage: number; // Allocation percentage (0-100)
}

export interface InvestmentParameters {
  initialInvestment: number;
  monthlyContribution: number;
  investmentDuration: number; // in years
  reinvestDividends: boolean;
  allocations: PortfolioAllocation[];
}

export interface MonthlyResult {
  month: number;
  totalInvestment: number;
  portfolioValue: number;
  monthlyDividendIncome: number;
  cumulativeDividends: number;
}

export interface YearlyResult {
  year: number;
  totalInvestment: number;
  portfolioValue: number;
  annualDividendIncome: number;
  cumulativeDividends: number;
}

export interface SimulationResults {
  monthlyResults: MonthlyResult[];
  yearlyResults: YearlyResult[];
  finalPortfolioValue: number;
  totalDividendsReceived: number;
  totalInvestmentMade: number;
  averageMonthlyIncome: number;
}

// Pre-selected high-yield dividend stocks and ETFs
export const DIVIDEND_STOCKS: DividendStock[] = [
  {
    symbol: "QYLD",
    name: "Global X NASDAQ 100 Covered Call ETF",
    dividendYield: 11.8,
    annualGrowthRate: 1.2,
    sector: "Technology",
    type: "ETF",
  },
  {
    symbol: "JEPI",
    name: "JPMorgan Equity Premium Income ETF",
    dividendYield: 8.1,
    annualGrowthRate: 3.5,
    sector: "Diversified",
    type: "ETF",
  },
  {
    symbol: "SCHD",
    name: "Schwab US Dividend Equity ETF",
    dividendYield: 3.4,
    annualGrowthRate: 8.2,
    sector: "Diversified",
    type: "ETF",
  },
  {
    symbol: "BST",
    name: "BlackRock Science and Technology Trust",
    dividendYield: 8.9,
    annualGrowthRate: 2.8,
    sector: "Technology",
    type: "ETF",
  },
  {
    symbol: "HTD",
    name: "John Hancock Tax-Advantaged Dividend Income Fund",
    dividendYield: 7.2,
    annualGrowthRate: 4.1,
    sector: "Diversified",
    type: "ETF",
  },
  {
    symbol: "RYLD",
    name: "Global X Russell 2000 Covered Call ETF",
    dividendYield: 10.4,
    annualGrowthRate: 2.1,
    sector: "Small Cap",
    type: "ETF",
  },
  {
    symbol: "O",
    name: "Realty Income Corporation",
    dividendYield: 5.8,
    annualGrowthRate: 5.5,
    sector: "Real Estate",
    type: "REIT",
  },
  {
    symbol: "AGNC",
    name: "AGNC Investment Corp",
    dividendYield: 12.1,
    annualGrowthRate: 1.0,
    sector: "Real Estate",
    type: "REIT",
  },
];

// Default portfolio allocation
export const DEFAULT_ALLOCATIONS: PortfolioAllocation[] = [
  { symbol: "QYLD", percentage: 25 },
  { symbol: "JEPI", percentage: 20 },
  { symbol: "SCHD", percentage: 20 },
  { symbol: "BST", percentage: 15 },
  { symbol: "HTD", percentage: 10 },
  { symbol: "O", percentage: 10 },
];

export const DEFAULT_INVESTMENT_PARAMS: InvestmentParameters = {
  initialInvestment: 50000,
  monthlyContribution: 2000,
  investmentDuration: 20,
  reinvestDividends: true,
  allocations: DEFAULT_ALLOCATIONS,
};
