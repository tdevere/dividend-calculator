"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

interface SimpleTestProps {
  className?: string;
}

/**
 * SimpleTest Component
 * 
 * Generated based on: Add a simple test button component for testing deployment
 */
export const SimpleTest: React.FC<SimpleTestProps> = ({
  className = ""
}) => {
  const [isActive, setIsActive] = useState(false);
  
  return (
    <motion.div
      className={`rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          SimpleTest
        </h3>
        
        <p className="text-sm text-gray-600">
          Feature: Add a simple test button component for testing deployment
        </p>
        
        <button
          onClick={() => setIsActive(!isActive)}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            isActive
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {isActive ? 'Active' : 'Inactive'}
        </button>
        
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 p-3 bg-blue-50 rounded-md"
          >
            <p className="text-sm text-blue-800">
              SimpleTest is now active!
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SimpleTest;
