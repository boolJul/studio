"use client"

import { subDays, format } from "date-fns"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
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
    label: "Calories (kcal)",
    color: "hsl(var(--chart-2))",
  },
}

export function CaloriesChart() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Flame className="w-8 h-8 text-primary" />
          <div>
            <CardTitle>Calorie Intake</CardTitle>
            <CardDescription>Your daily calorie consumption over the last 30 days.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={['dataMin - 100', 'dataMax + 100']}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <Area
              dataKey="calories"
              type="natural"
              fill="var(--color-calories)"
              fillOpacity={0.4}
              stroke="var(--color-calories)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
