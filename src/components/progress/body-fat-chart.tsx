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
    label: "Body Fat",
    color: "hsl(var(--chart-4))",
  },
}

export function BodyFatChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Body Fat</CardTitle>
        <CardDescription>
          Last 30 days: <span className="font-bold text-foreground">{chartData[chartData.length - 1].bodyFat}%</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-40 w-full">
          <AreaChart
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
            <YAxis domain={['dataMin - 1', 'dataMax + 1']} hide/>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent unit="%" indicator="line" hideLabel />}
            />
            <defs>
                <linearGradient id="fillBodyFat" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-bodyFat)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--color-bodyFat)" stopOpacity={0}/>
                </linearGradient>
            </defs>
            <Area
              dataKey="bodyFat"
              type="natural"
              fill="url(#fillBodyFat)"
              stroke="var(--color-bodyFat)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
