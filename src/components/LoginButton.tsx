"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

interface LoginButtonProps {
  className?: string;
}

/**
 * LoginButton Component
 * 
 * Generated based on: Add a Login button to the right of the Get Started button in the header. The button should match the existing design and styling. Position it next to the Get Started button with the same style and design.
 */
export const LoginButton: React.FC<LoginButtonProps> = ({
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
          LoginButton
        </h3>
        
        <p className="text-sm text-gray-600">
          Feature: Add a Login button to the right of the Get Started button in the header. The button should match the existing design and styling. Position it next to the Get Started button with the same style and design.
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
              LoginButton is now active!
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default LoginButton;
