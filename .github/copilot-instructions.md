# Copilot Instructions for Dividend Calculator

## Project Overview
This is a dividend investment calculator web application built with Next.js, TypeScript, and TailwindCSS. The application helps users explore potential monthly dividend income and long-term portfolio growth based on high-yield dividend-focused ETFs and stocks.

## Key Technologies
- **Frontend**: Next.js 15 with App Router, TypeScript, TailwindCSS
- **Charts**: Recharts for interactive data visualization
- **Animations**: Framer Motion for smooth UI transitions
- **Icons**: Lucide React for consistent iconography
- **Styling**: TailwindCSS with custom utility classes
- **Deployment**: Azure App Service with GitHub Actions CI/CD

## Component Architecture
- Use modular, reusable components with proper TypeScript interfaces
- Implement strict TypeScript checking with proper type definitions
- Follow Next.js App Router conventions with page.tsx files
- Use client components ("use client") for interactive features
- Server components for static content and data fetching
- Proper error boundaries and loading states

## Build Issue Resolution Priorities

### 1. TypeScript Error Resolution
When encountering TypeScript errors, automatically:
- Add proper type definitions for all props and state
- Import required types from appropriate libraries
- Fix missing interface definitions
- Resolve module resolution issues
- Add proper generic type parameters

### 2. Next.js Specific Fixes
- Ensure proper "use client" directives for client components
- Fix import/export statement issues
- Resolve dynamic import problems
- Fix route and navigation issues
- Address middleware and API route problems

### 3. React/Hook Issues
- Fix improper hook usage (useState, useEffect, useMemo, useCallback)
- Resolve component lifecycle issues
- Address prop drilling and state management
- Fix event handler type definitions
- Resolve ref and DOM manipulation issues

### 4. Chart Library Integration
- Fix Recharts component prop types
- Resolve data formatting for charts
- Address responsive chart sizing
- Fix chart animation and interaction issues

### 5. Tailwind CSS Issues
- Fix utility class conflicts
- Resolve responsive design breakpoints
- Address dark mode implementation
- Fix custom component styling

## Auto-Fix Patterns

### Common TypeScript Fixes
```typescript
// For React component props
interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
  // Add specific prop types
}

// For event handlers
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  // Implementation
};

// For form events
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  // Implementation
};

// For state types
const [data, setData] = useState<InvestmentData[]>([]);
```

### Common Import Fixes
```typescript
// Client component directive
"use client";

// React imports
import { useState, useEffect, useMemo, useCallback } from 'react';
import type { FC, ReactNode } from 'react';

// Next.js imports
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Chart library imports
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Utility imports
import { cn } from '@/utils/utils';
```

## Data Models & Types
```typescript
interface PortfolioData {
  initialInvestment: number;
  monthlyContribution: number;
  duration: number;
  reinvestDividends: boolean;
  allocations: Record<string, number>;
}

interface ETFData {
  symbol: string;
  name: string;
  dividendYield: number;
  annualGrowthRate: number;
  allocation: number;
  sector: string;
}

interface CalculationResult {
  monthlyIncome: number[];
  portfolioValue: number[];
  totalDividends: number;
  finalValue: number;
  averageMonthlyIncome: number;
  annualizedReturn: number;
}
```

## Build Error Patterns to Auto-Fix

### 1. Missing "use client" Directive
**Pattern**: Components using hooks without client directive
**Fix**: Add "use client" at the top of the file

### 2. Import Resolution Issues
**Pattern**: Module not found errors
**Fix**: Check and correct import paths, add missing dependencies

### 3. Type Definition Issues
**Pattern**: Property does not exist on type errors
**Fix**: Create proper interfaces or extend existing types

### 4. Event Handler Type Issues
**Pattern**: Argument of type is not assignable
**Fix**: Use proper React event types

### 5. Chart Component Issues
**Pattern**: Recharts component errors
**Fix**: Ensure proper data formatting and prop types

## Performance Optimization Guidelines
- Use React.memo for expensive components
- Implement useMemo for heavy calculations
- Use useCallback for event handlers passed to children
- Debounce user inputs for real-time calculations
- Lazy load heavy components with dynamic imports

## Code Quality Standards
- Use TypeScript strict mode with proper error handling
- Implement proper error boundaries for components
- Follow React best practices for hooks and state management
- Use consistent naming conventions (camelCase for variables, PascalCase for components)
- Write self-documenting code with meaningful variable names
- Add proper JSDoc comments for complex functions

## Debugging Instructions
When debugging build issues:
1. Check the terminal output for specific error messages
2. Verify all imports are correct and modules are installed
3. Ensure TypeScript types are properly defined
4. Check for missing "use client" directives
5. Validate chart data structures match expected formats
6. Review console logs for runtime errors

## Auto-Completion Preferences
- Prioritize TypeScript-strict solutions
- Suggest proper error handling patterns
- Recommend performance optimizations
- Include accessibility attributes (ARIA labels)
- Generate responsive design implementations
- Create proper loading and error states
