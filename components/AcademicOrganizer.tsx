"use client";

import { useState } from "react";
import { Pie, PieChart, Cell } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

// Example chart data with categories and amounts (e.g., tuition, textbooks, scholarships)
const chartData = [
  { category: "Tuition", amount: 2000, fill: "hsl(180, 50%, 40%)" },
  { category: "Textbooks", amount: 400, fill: "hsl(30, 100%, 50%)" },
  { category: "Scholarships", amount: 800, fill: "hsl(120, 50%, 40%)" },
  { category: "Miscellaneous", amount: 200, fill: "hsl(240, 50%, 50%)" },
];

// Configurations for chart labels and colors
const chartConfig = {
  amount: {
    label: "Amount",
  },
  tuition: {
    label: "Tuition",
    color: "hsl(180, 50%, 40%)",
  },
  textbooks: {
    label: "Textbooks",
    color: "hsl(30, 100%, 50%)",
  },
  scholarships: {
    label: "Scholarships",
    color: "hsl(120, 50%, 40%)",
  },
  miscellaneous: {
    label: "Miscellaneous",
    color: "hsl(240, 50%, 50%)",
  },
};

export function AcademicFinanceTracker() {
  const [newCategory, setNewCategory] = useState("");
  const [newAmount, setNewAmount] = useState("");

  const handleAddCategory = () => {
    // Add category to the chart data
    // (This is just an example, you could push data to a state or backend)
    console.log(`New Category: ${newCategory}, Amount: ${newAmount}`);
  };

  return (
    <Card className="bg-gray text-black rounded-lg shadow-xl max-w-2xl mx-auto">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl text-emerald-400">Academic Finance Tracker</CardTitle>
        <CardDescription className="text-lg text-gray-600">Manage your tuition, textbooks, scholarships, and more!</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px] mb-4"
        >
          <PieChart>
            <Pie data={chartData} dataKey="amount" outerRadius={120}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="category" />}
              className="flex-wrap gap-2 text-sm mt-4 [&>*]:basis-1/4 [&>*]:justify-center text-gray-800"
            />
          </PieChart>
        </ChartContainer>

        <div className="mt-6 bg-gray p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-emerald-400">Add New Category</h3>
          <div className="mt-4">
            <label htmlFor="category" className="block text-sm font-medium text-white-700">Category Name</label>
            <input
              id="category"
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              id="amount"
              type="number"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mt-6">
            <button
              onClick={handleAddCategory}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Add Category
            </button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-sm text-center text-gray-500">
        Showing current financial data for the academic year 2024-2025
      </CardFooter>
    </Card>
  );
}
