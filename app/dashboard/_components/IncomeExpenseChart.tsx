"use client"

import { useState } from "react"
import { PlusCircle } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, Tooltip, Bar, BarChart, YAxis, ResponsiveContainer } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import Fund from "./ExpenseComp"
import ExpensesForecast from "./forecast"

// Income, Expense, Balance data type
type IncomeExpenseChartProps = {
  data: { month: string; income: number; expense: number; balance: number }[]; // This is the data you'll pass to the chart
}

const chartConfig: ChartConfig = {
  income: {
    label: "Income",
    color: "#28a745", // Emerald color for income
  },
  expense: {
    label: "Expense",
    color: "#dc3545", // Red color for expense
  },
  balance: {
    label: "Balance",
    color: "#ffc107", // Yellow color for balance
  },
}

const initialIncomeCategories = [
  { name: "YouTube", amount: 500, fill: "#10B981" }, // Emerald green
  { name: "Part-Time", amount: 300, fill: "#EC4899" }, // Rose red
  { name: "Freelance", amount: 200, fill: "#A78BFA" }, // Light purple
]

const goals = [
  { name: "Savings Goal", target: 1000, current: 500 },
]

const monthlyNeeds = {
  rent: 400,
  groceries: 150,
  subscriptions: 50,
  totalExpected: 600,
  totalSpent: 550,
};

const IncomeExpenseChart: React.FC<IncomeExpenseChartProps> = ({ data }) => {
  const [incomeCategories, setIncomeCategories] = useState(initialIncomeCategories)
  const [showInput, setShowInput] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [newCategoryAmount, setNewCategoryAmount] = useState(0)

  const handleAddCategory = () => {
    if (showInput) {
      if (newCategoryName && !isNaN(newCategoryAmount)) {
        const newCategory = {
          name: newCategoryName,
          amount: newCategoryAmount,
          fill: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Random color for each category
        }
        setIncomeCategories([...incomeCategories, newCategory])
        setNewCategoryName("")
        setNewCategoryAmount(0)
      }
    }
    setShowInput(!showInput)
  }

  return (
    <div className="w-full max-w-7xl mx-auto my-10 flex flex-wrap">
      {/* Left Half: Categories, Goals, and Needs */}
      <div className="w-full lg:w-1/2 p-4 space-y-6">
        {/* Income Categories (Mixed Bar UI) */}
        <Card className="mb-6 relative">
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Income Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={incomeCategories}
                layout="vertical"
                margin={{ left: 60, top: 0, right: 0, bottom: 20 }} // Adjusted margin to fix label cut-off
              >
                <YAxis
                  dataKey="name"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  
                />
                <XAxis dataKey="amount" type="number" hide />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar
                  dataKey="amount"
                  layout="vertical"
                  radius={3}
                  barSize={10} // Reduce bar thickness
                />
              </BarChart>
            </ChartContainer>
            {showInput && (
              <div className="mt-4 space-y-2">
                <input
                  type="text"
                  placeholder="Enter category name"
                  className="w-full border border-gray-300 rounded p-2"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Enter category amount"
                  className="w-1/2 border border-gray-300 rounded p-2"
                  value={newCategoryAmount}
                  onChange={(e) => setNewCategoryAmount(parseFloat(e.target.value))}
                />
              </div>
            )}
          </CardContent>
          <Button
            onClick={handleAddCategory}
            variant="outline"
            size="icon"
            className="absolute bottom-4 right-4 bg-rose-500 text-white"
          >
            <PlusCircle className="h-5 w-5" />
          </Button>
        </Card>

        {/* Goals */}
        <Card className="mb-6">
          <Fund />
 
        </Card>

        </div>

      {/* Right Half: Graph */}
      <div className="w-full lg:w-1/2 p-4">
        <Card className="h-full h-[400px]">
          <CardHeader>
            <CardTitle>Income, Expense, and Balance Over Time</CardTitle>
            <CardDescription>January 1 - January 15, 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart
                width={800}
                height={200}
                data={data}
                margin={{ left: 10, right: 10, top: 50, bottom: 50 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => value.slice(0, 3)} />
                <Tooltip cursor={false} content={<ChartTooltipContent />} />
                <Line dataKey="income" type="natural" stroke={chartConfig.income.color} strokeWidth={3} dot={false} />
                <Line dataKey="expense" type="natural" stroke={chartConfig.expense.color} strokeWidth={3} dot={false} />
                <Line dataKey="balance" type="natural" stroke={chartConfig.balance.color} strokeWidth={3} dot={false} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
                {/* Monthly Expenses Forecast */}
                <Card className=" mt-9">
          <ExpensesForecast /> 
        </Card>
      </div>
    </div>
  );
};

export default IncomeExpenseChart;
