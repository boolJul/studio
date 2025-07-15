"use client"

import { subDays, format } from "date-fns"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
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
import { BadgePercent } from "lucide-react"

const generateMockBodyFatData = () => {
  const data = []
  let currentFat = 18.5
  for (let i = 29; i >= 0; i--) {
    data.push({
      date: format(subDays(new Date(), i), "MMM d"),
      bodyFat: parseFloat(currentFat.toFixed(1)),
    })
    currentFat -= Math.random() * 0.15;
  }
  return data
}

const chartData = generateMockBodyFatData()

const chartConfig = {
  bodyFat: {
    label: "Body Fat (%)",
    color: "hsl(var(--chart-4))",
  },
}

export function BodyFatChart() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <BadgePercent className="w-8 h-8 text-primary" />
          <div>
            <CardTitle>Body Fat Percentage</CardTitle>
            <CardDescription>Your body fat trend over the last 30 days.</CardDescription>
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
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent unit="%" indicator="line" />}
            />
            <Area
              dataKey="bodyFat"
              type="natural"
              fill="var(--color-bodyFat)"
              fillOpacity={0.4}
              stroke="var(--color-bodyFat)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
