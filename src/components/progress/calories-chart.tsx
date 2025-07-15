"use client"

import { subDays, format } from "date-fns"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Flame } from "lucide-react"

const generateMockCalorieData = () => {
  const data = []
  for (let i = 29; i >= 0; i--) {
    data.push({
      date: format(subDays(new Date(), i), "MMM d"),
      calories: Math.floor(Math.random() * (2800 - 2200 + 1)) + 2200,
    })
  }
  return data
}

const chartData = generateMockCalorieData()

const chartConfig = {
  calories: {
    label: "Calories",
    color: "hsl(var(--chart-2))",
  },
}

export function CaloriesChart() {
  const avgCalories = Math.round(chartData.reduce((acc, item) => acc + item.calories, 0) / chartData.length);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Calories</CardTitle>
        <CardDescription>
          Daily average: <span className="font-bold text-foreground">{avgCalories} kcal</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-40 w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
             margin={{
              left: 0,
              right: 12,
              top: 0,
              bottom: 12,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis hide/>
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" unit="kcal" hideLabel />} />
            <Bar
              dataKey="calories"
              fill="var(--color-calories)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
