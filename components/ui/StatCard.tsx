"use client";

import React from "react";
import CountUp from "react-countup"; // Import CountUp for animation

interface StatCardProps {
  label: string;
  value: number; // Expecting value as number for CountUp
  icon?: React.ReactNode; // Optional icon
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon }) => {
  return (
    <div className="flex h-24 w-full items-center gap-2 p-4 rounded-lg bg-gray-1200 border border-gray-800 shadow-lg">
      {/* Icon */}
      {icon && <div className="flex-shrink-0">{icon}</div>}

      {/* Content */}
      <div className="flex flex-col justify-center">
        <h4 className="text-sm font-medium text-gray-400">{label}</h4>
        <p className="text-xl font-bold text-white">
          <CountUp
            start={0} // Start at 0
            end={value}
            duration={2.5} // Animation duration
            separator="," // Add thousands separator
            decimals={2} // Decimal precision
            decimal="."
            prefix="₹" // Add ₹ symbol before number
          />
        </p>
      </div>
    </div>
  );
};

export default StatCard;
