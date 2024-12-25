import React from 'react';
import { ChevronRight } from 'lucide-react';

const SavingsCorner = () => {
  return (
    <div className="bg-white rounded-lg p-4 w-full max-w-md shadow-md">
      <div className="text-sm font-semibold text-gray-900 mb-2">SAVINGS CORNER</div>
      <div
        className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
        onClick={() => console.log('Apply coupon clicked')}
      >
        <div className="flex items-center">
          <div className="w-5 h-5 mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="text-teal-600"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" className="stroke-2" />
              <path d="M9 12l2 2 4-4" className="stroke-2" />
            </svg>
          </div>
          <span className="text-gray-700">Apply Coupon</span>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  );
};

export default SavingsCorner;
