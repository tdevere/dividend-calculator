# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a dividend investment calculator web application built with Next.js, TypeScript, and TailwindCSS. The application helps users explore potential monthly dividend income and long-term portfolio growth based on high-yield dividend-focused ETFs and stocks.

## Key Technologies
- **Frontend**: Next.js 15 with App Router, TypeScript, TailwindCSS
- **Charts**: Recharts for interactive data visualization
- **Animations**: Framer Motion for smooth UI transitions
- **Icons**: Lucide React for consistent iconography
- **Styling**: TailwindCSS with custom utility classes

## Component Architecture
- Use modular, reusable components
- Implement proper TypeScript interfaces for all data structures
- Follow Next.js App Router conventions with page.tsx files
- Use client components for interactive features, server components for static content

## Data Models
- **Portfolio**: Initial investment, monthly contributions, duration, reinvestment settings
- **ETF/Stock**: Symbol, name, dividend yield, annual growth rate, allocation percentage
- **Results**: Monthly income, yearly totals, portfolio value projections

## Styling Guidelines
- Use TailwindCSS utility classes
- Implement responsive design with mobile-first approach
- Create vibrant, animated chart colors (neon/energy style)
- Follow modern fintech dashboard design patterns
- Ensure accessibility with proper color contrast and ARIA labels

## Performance Considerations
- Optimize chart re-rendering with proper React memoization
- Use debounced inputs for real-time calculations
- Implement efficient data structures for financial calculations
- Lazy load heavy components when possible

## Code Quality
- Use TypeScript strict mode
- Implement proper error handling
- Follow React best practices (hooks, state management)
- Write self-documenting code with meaningful variable names
- Use consistent naming conventions (camelCase for variables, PascalCase for components)
