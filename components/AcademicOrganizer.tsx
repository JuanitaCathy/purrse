"use client";

import { useState } from "react";
import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartLegend } from "@/components/ui/chart";

// Define the ChartConfig type
type ChartConfig = {
  label: string;
  color: string;
};

// Example initial chart data with categories and their colors
const initialChartData = [
  { category: "Tuition", amount: 2000, color: "hsl(180, 50%, 40%)" },
  { category: "Textbooks", amount: 400, color: "hsl(30, 100%, 50%)" },
  { category: "Scholarships", amount: 800, color: "hsl(120, 50%, 40%)" },
];

// Define chart configuration based on initial data
const chartConfig: Record<string, ChartConfig> = {
  Tuition: { label: "Tuition", color: "hsl(180, 50%, 40%)" },
  Textbooks: { label: "Textbooks", color: "hsl(30, 100%, 50%)" },
  Scholarships: { label: "Scholarships", color: "hsl(120, 50%, 40%)" },
};

export function AcademicFinanceTracker() {
  const [newCategory, setNewCategory] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [chartData, setChartData] = useState(initialChartData);

  const handleAddCategory = () => {
    if (newCategory && newAmount) {
      const newData = {
        category: newCategory,
        amount: parseFloat(newAmount),
        color: `hsl(${Math.random() * 360}, 50%, 50%)`,
      };
      setChartData([...chartData, newData]);
      setNewCategory("");
      setNewAmount("");
    }
  };

  const totalExpenses = chartData.reduce((acc, curr) => acc + curr.amount, 0);
  const totalScholarships = chartData
    .filter((item) => item.category.toLowerCase().includes("scholarship"))
    .reduce((acc, curr) => acc + curr.amount, 0);
  const remainingAmount = totalExpenses - totalScholarships;

  return (
    <Card className="bg-gray text-white rounded-lg shadow-xl max-w-2xl mx-auto">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl text-emerald-400">
          Academic Finance Tracker
        </CardTitle>
        <CardDescription className="text-lg text-gray-600">
          Manage your tuition, textbooks, scholarships, and more!
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px] mb-4"
        >
          <ResponsiveContainer>
            <PieChart>
              <Pie data={chartData} dataKey="amount" outerRadius={120}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`$${value}`, `${name}`]}
                contentStyle={{
                  backgroundColor: "hsl(136, 60.60%, 72.20%)",
                  border: "none",
                  color: "white",
                }}
                cursor={{ fill: "hsl(0, 0%, 85%)" }}
              />
              <ChartLegend
                content={
                  <div className="flex flex-row justify-center items-center gap-4 mt-4 text-sm text-gray-300">
                    {chartData.map((entry, index) => (
                      <div key={index} className="flex items-center">
                        <div
                          style={{ backgroundColor: entry.color }}
                          className="w-3 h-3 mr-2"
                        ></div>
                        <span>{entry.category}</span>
                      </div>
                    ))}
                  </div>
                }
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Add Category Form */}
        <div className="mt-6 bg-gray p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-emerald-400">
            Add New Category
          </h3>
          <div className="mt-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-400"
            >
              Category Name
            </label>
            <input
              id="category"
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border text-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500"
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Amount
            </label>
            <input
              id="amount"
              type="number"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border text-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500"
            />
          </div>

          <div className="mt-6">
            <button
              onClick={handleAddCategory}
              className="w-full bg-rose-500 hover:bg-rose-400 text-white font-bold py-2 px-4 rounded-md"
            >
              Add Category
            </button>
          </div>
        </div>

        {/* Financial Parameters */}
        <div className="mt-6 bg-gray p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-emerald-400">
            Financial Overview
          </h3>
          <div className="mt-4 text-gray-400">
            <p>
              <strong>Total Expenses:</strong> ${totalExpenses.toFixed(2)}
            </p>
            <p>
              <strong>Total Scholarships:</strong> $
              {totalScholarships.toFixed(2)}
            </p>
            <p>
              <strong>Remaining Amount:</strong> $
              {remainingAmount.toFixed(2)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
