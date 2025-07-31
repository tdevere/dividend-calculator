"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, FileSpreadsheet, Database, FileJson, Loader2 } from 'lucide-react';

interface ExportFunctionalityProps {
  portfolioData?: any;
  calculationResults?: any;
  className?: string;
}

interface ExportOption {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  format: string;
  disabled?: boolean;
}

const ExportFunctionality: React.FC<ExportFunctionalityProps> = ({
  portfolioData,
  calculationResults,
  className = ""
}) => {
  const [isExporting, setIsExporting] = useState<string | null>(null);
  const [showOptions, setShowOptions] = useState(false);

  const exportOptions: ExportOption[] = [
    {
      id: 'pdf',
      name: 'PDF Report',
      description: 'Professional formatted report with charts and calculations',
      icon: FileText,
      format: 'PDF'
    },
    {
      id: 'excel',
      name: 'Excel Spreadsheet',
      description: 'Detailed spreadsheet with formulas and data tables',
      icon: FileSpreadsheet,
      format: 'XLSX'
    },
    {
      id: 'csv',
      name: 'CSV Data',
      description: 'Raw data for further analysis',
      icon: Database,
      format: 'CSV'
    },
    {
      id: 'json',
      name: 'JSON Export',
      description: 'Complete calculation state for backup/restore',
      icon: FileJson,
      format: 'JSON'
    }
  ];

  const handleExport = async (exportType: string) => {
    setIsExporting(exportType);
    
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, this would generate and download the file
      switch (exportType) {
        case 'pdf':
          console.log('Generating PDF report...');
          break;
        case 'excel':
          console.log('Generating Excel spreadsheet...');
          break;
        case 'csv':
          console.log('Generating CSV data...');
          break;
        case 'json':
          console.log('Generating JSON export...');
          break;
      }
      
      // Simulate file download
      const fileName = `dividend-calculator-${exportType}.${exportOptions.find(opt => opt.id === exportType)?.format.toLowerCase()}`;
      console.log(`Downloaded: ${fileName}`);
      
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(null);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Export Button */}
      <motion.button
        onClick={() => setShowOptions(!showOptions)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Download className="w-4 h-4" />
        Export Results
      </motion.button>

      {/* Export Options Panel */}
      {showOptions && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50"
        >
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Export Options
            </h3>
            
            <div className="space-y-2">
              {exportOptions.map((option) => {
                const IconComponent = option.icon;
                const isCurrentlyExporting = isExporting === option.id;
                
                return (
                  <motion.button
                    key={option.id}
                    onClick={() => handleExport(option.id)}
                    disabled={isCurrentlyExporting || option.disabled}
                    className={`w-full p-3 rounded-lg border transition-all duration-200 text-left ${
                      option.disabled
                        ? 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 cursor-not-allowed opacity-50'
                        : isCurrentlyExporting
                        ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700'
                        : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                    whileHover={!option.disabled && !isCurrentlyExporting ? { scale: 1.02 } : {}}
                    whileTap={!option.disabled && !isCurrentlyExporting ? { scale: 0.98 } : {}}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex-shrink-0 ${isCurrentlyExporting ? 'animate-pulse' : ''}`}>
                        {isCurrentlyExporting ? (
                          <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                        ) : (
                          <IconComponent className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {option.name}
                          </h4>
                          <span className="text-xs font-mono text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">
                            {option.format}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          {isCurrentlyExporting ? 'Generating file...' : option.description}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
            
            <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-600">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                💡 Tip: Export your calculations to share with financial advisors or for personal records
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Click outside to close */}
      {showOptions && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowOptions(false)}
        />
      )}
    </div>
  );
};

export default ExportFunctionality;
