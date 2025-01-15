"use client"

import { CartesianGrid, Line, LineChart, XAxis, Tooltip } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Income, Expense, Balance data type
type IncomeExpenseChartProps = {
  data: { month: string; income: number; expense: number; balance: number }[]; // This is the data you'll pass to the chart
}

// Define the chartConfig with additional colors: Emerald, Purple, and Rose
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
  emerald: {
    label: "Emerald Line",
    color: "#10B981", // Emerald color
  },
  purple: {
    label: "Purple Line",
    color: "#9b4d96", // Purple color
  },
  rose: {
    label: "Rose Line",
    color: "#f43f5e", // Rose color
  },
}

const IncomeExpenseChart: React.FC<IncomeExpenseChartProps> = ({ data }) => {
  return (
    <Card className="w-full h-[550px] max-w-4xl mx-auto my-10 "> {/* Increase width to max-w-4xl */}
      <CardHeader>
        <CardTitle>Income, Expense, and Balance Over Time</CardTitle>
        <CardDescription>January 1 - January 15, 2025</CardDescription> {/* Update date range */}
      </CardHeader>
      <CardContent>
        {/* Pass the chartConfig prop to ChartContainer */}
        <ChartContainer config={chartConfig}>
          <LineChart width={500} height={100} data={data} margin={{ left: 12, right: 12, top: 50, bottom: 50 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)} // Format month name to 3 letters
            />
            <Tooltip cursor={false} content={<ChartTooltipContent />} />
            {/* Income Line */}
            <Line
              dataKey="income"
              type="natural"  // This makes the line curvier
              stroke={chartConfig.income.color} // Use the color from chartConfig
              strokeWidth={3} // Increased width of the line
              dot={false}
            />
            {/* Expense Line */}
            <Line
              dataKey="expense"
              type="natural"  // This makes the line curvier
              stroke={chartConfig.expense.color} // Use the color from chartConfig
              strokeWidth={3} // Increased width of the line
              dot={false}
            />
            {/* Balance Line */}
            <Line
              dataKey="balance"
              type="natural"  // This makes the line curvier
              stroke={chartConfig.balance.color} // Use the color from chartConfig
              strokeWidth={3} // Increased width of the line
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default IncomeExpenseChart;
