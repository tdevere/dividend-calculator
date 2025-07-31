import { 
  DividendStock, 
  InvestmentParameters, 
  MonthlyResult, 
  YearlyResult, 
  SimulationResults,
  DIVIDEND_STOCKS,
  PortfolioAllocation
} from '@/types/investment';

export class DividendCalculator {
  private stocks: Map<string, DividendStock>;

  constructor() {
    this.stocks = new Map();
    DIVIDEND_STOCKS.forEach(stock => {
      this.stocks.set(stock.symbol, stock);
    });
  }

  /**
   * Calculate dividend simulation based on investment parameters
   */
  calculateDividendProjection(params: InvestmentParameters): SimulationResults {
    const monthlyResults: MonthlyResult[] = [];
    const yearlyResults: YearlyResult[] = [];
    
    let currentPortfolioValue = params.initialInvestment;
    let totalInvestmentMade = params.initialInvestment;
    let cumulativeDividends = 0;
    
    const totalMonths = params.investmentDuration * 12;
    
    // Validate allocations sum to 100%
    const totalAllocation = params.allocations.reduce((sum, alloc) => sum + alloc.percentage, 0);
    if (Math.abs(totalAllocation - 100) > 0.01) {
      throw new Error('Portfolio allocations must sum to 100%');
    }
    
    for (let month = 1; month <= totalMonths; month++) {
      // Add monthly contribution (except first month)
      if (month > 1) {
        currentPortfolioValue += params.monthlyContribution;
        totalInvestmentMade += params.monthlyContribution;
      }
      
      // Calculate monthly dividend income
      const monthlyDividendIncome = this.calculateMonthlyDividend(
        currentPortfolioValue, 
        params.allocations
      );
      
      // Apply portfolio growth (monthly)
      const monthlyGrowthRate = this.calculateWeightedGrowthRate(params.allocations) / 12;
      currentPortfolioValue *= (1 + monthlyGrowthRate / 100);
      
      // Reinvest dividends if enabled
      if (params.reinvestDividends) {
        currentPortfolioValue += monthlyDividendIncome;
      }
      
      cumulativeDividends += monthlyDividendIncome;
      
      // Store monthly result
      monthlyResults.push({
        month,
        totalInvestment: totalInvestmentMade,
        portfolioValue: currentPortfolioValue,
        monthlyDividendIncome,
        cumulativeDividends
      });
      
      // Store yearly result
      if (month % 12 === 0) {
        const year = month / 12;
        const yearlyDividends = monthlyResults
          .slice((year - 1) * 12, year * 12)
          .reduce((sum, result) => sum + result.monthlyDividendIncome, 0);
          
        yearlyResults.push({
          year,
          totalInvestment: totalInvestmentMade,
          portfolioValue: currentPortfolioValue,
          annualDividendIncome: yearlyDividends,
          cumulativeDividends
        });
      }
    }
    
    const averageMonthlyIncome = cumulativeDividends / totalMonths;
    
    return {
      monthlyResults,
      yearlyResults,
      finalPortfolioValue: currentPortfolioValue,
      totalDividendsReceived: cumulativeDividends,
      totalInvestmentMade,
      averageMonthlyIncome
    };
  }
  
  /**
   * Calculate monthly dividend income based on current portfolio value and allocations
   */
  private calculateMonthlyDividend(portfolioValue: number, allocations: PortfolioAllocation[]): number {
    let totalMonthlyDividend = 0;
    
    allocations.forEach(allocation => {
      const stock = this.stocks.get(allocation.symbol);
      if (stock) {
        const allocationValue = (portfolioValue * allocation.percentage) / 100;
        const annualDividend = (allocationValue * stock.dividendYield) / 100;
        const monthlyDividend = annualDividend / 12;
        totalMonthlyDividend += monthlyDividend;
      }
    });
    
    return totalMonthlyDividend;
  }
  
  /**
   * Calculate weighted average growth rate based on allocations
   */
  private calculateWeightedGrowthRate(allocations: PortfolioAllocation[]): number {
    let weightedGrowthRate = 0;
    
    allocations.forEach(allocation => {
      const stock = this.stocks.get(allocation.symbol);
      if (stock) {
        weightedGrowthRate += (stock.annualGrowthRate * allocation.percentage) / 100;
      }
    });
    
    return weightedGrowthRate;
  }
  
  /**
   * Calculate weighted average dividend yield
   */
  calculateWeightedDividendYield(allocations: PortfolioAllocation[]): number {
    let weightedYield = 0;
    
    allocations.forEach(allocation => {
      const stock = this.stocks.get(allocation.symbol);
      if (stock) {
        weightedYield += (stock.dividendYield * allocation.percentage) / 100;
      }
    });
    
    return weightedYield;
  }
  
  /**
   * Get stock information by symbol
   */
  getStock(symbol: string): DividendStock | undefined {
    return this.stocks.get(symbol);
  }
  
  /**
   * Get all available stocks
   */
  getAllStocks(): DividendStock[] {
    return Array.from(this.stocks.values());
  }
}

// Utility functions for formatting
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCurrencyDetailed(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}
