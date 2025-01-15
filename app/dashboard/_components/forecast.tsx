import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

const ExpensesForecast = () => {
  const [totalExpected, setTotalExpected] = useState(600); // Initial Total Expected Expenses
  const [totalSpent, setTotalSpent] = useState(550); // Initial Total Spent

  const savings = totalExpected - totalSpent; // Calculate savings dynamically

  return (
    <Card className="mb-0">
      <CardHeader>
        <CardTitle>Expenses Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Expected Expenses Slider */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Total Expected Expenses:</label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="100"
              max="2000"
              step="50"
              value={totalExpected}
              onChange={(e) => setTotalExpected(Number(e.target.value))}
              className="w-full"
            />
            <span className="font-semibold text-purple-600">${totalExpected}</span>
          </div>
        </div>

        {/* Spent So Far Slider */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Total Spent:</label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="0"
              max={totalExpected}
              step="50"
              value={totalSpent}
              onChange={(e) => setTotalSpent(Number(e.target.value))}
              className="w-full"
            />
            <span className="font-semibold text-purple-600">${totalSpent}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2 mt-2 rounded">
          <div
            className="bg-purple-600 h-2 rounded"
            style={{
              width: `${(totalSpent / totalExpected) * 100}%`,
            }}
          />
        </div>

        {/* Savings Display */}
        <div className="mt-4">
          <label className="block font-semibold mb-2">Savings:</label>
          <div className="text-xl font-semibold text-green-600">
            ${savings >= 0 ? savings : 0} {/* Ensure savings doesn't go negative */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpensesForecast;
