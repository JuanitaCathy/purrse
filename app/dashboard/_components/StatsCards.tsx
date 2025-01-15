"use client";

import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import SkeletonWrapper from "@/components/ui/SkeletonWrapper";
import StatCard from "@/components/ui/StatCard";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";


interface Props {
  from: Date;
  to: Date;
}

const StatsCards: React.FC<Props> = ({ from, to }) => {
  const [isLoading, setIsLoading] = useState(true); // Initially set to true

  const initialIncome = 1000; // Example initial income
  const initialExpense = 400; // Example initial expense
  const initialBalance = initialIncome - initialExpense; // Initial balance calculation
  
  const calculateIntervalIncrease = (start: Date, end: Date) => {
    const diffInDays = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);
    const intervalCount = Math.floor(diffInDays / 4); 
    return intervalCount;
  };

  const intervalCount = calculateIntervalIncrease(from, to);

  const increaseFactor = 0.02; 
  const increasedIncome = initialIncome * Math.pow(1 + increaseFactor, intervalCount);
  const increasedExpense = initialExpense * Math.pow(1 + increaseFactor, intervalCount);
  const increasedBalance = increasedIncome - increasedExpense;

  // Use useEffect to change isLoading state after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Change loading state after 4 seconds
    }, 4000); // 4 seconds delay

    // Cleanup the timeout on component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto px-8">
      <div className="flex flex-wrap justify-center gap-4 md:flex-nowrap">
        <SkeletonWrapper isLoading={isLoading}> 
        <StatCard
          label="Income"
          value={increasedIncome} // Use the calculated value after the increase
          icon={
            <TrendingUp className="h-12 w-12 items-center rounded-lg p-2 text-emerald-400 bg-emerald-400/10 dark:text-emerald-300 dark:bg-emerald-500/20 animate-pulse" />
          }
        />
        <StatCard
          label="Expense"
          value={increasedExpense} // Use the calculated value after the increase
          icon={
            <TrendingDown className="h-12 w-12 items-center rounded-lg p-2 text-rose-400 bg-rose-400/10 dark:text-rose-300 dark:bg-rose-500/20 animate-pulse" />
          }
        />
        <StatCard
          label="Balance"
          value={increasedBalance} // Use the calculated value after the increase
          icon={
            <Wallet className="h-12 w-12 items-center rounded-lg p-2 text-purple-400 bg-purple-400/10 dark:text-purple-300 dark:bg-purple-500/20 animate-pulse" />
          }
        />
        </SkeletonWrapper>
      </div>
    </div>
  );
};

export default StatsCards;
