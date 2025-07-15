"use client"

import { subDays, format } from "date-fns"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
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
import { Bed } from "lucide-react"

const generateMockSleepData = () => {
  const data = []
  for (let i = 29; i >= 0; i--) {
    data.push({
      date: format(subDays(new Date(), i), "MMM d"),
      hours: parseFloat((Math.random() * (8.5 - 6) + 6).toFixed(1)),
    })
  }
  return data
}

const chartData = generateMockSleepData()

const chartConfig = {
  hours: {
    label: "Sleep (hours)",
    color: "hsl(var(--chart-3))",
  },
}

export function SleepChart() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Bed className="w-8 h-8 text-primary" />
          <div>
            <CardTitle>Sleep Duration</CardTitle>
            <CardDescription>Your nightly sleep over the last 30 days.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="hours" fill="var(--color-hours)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
