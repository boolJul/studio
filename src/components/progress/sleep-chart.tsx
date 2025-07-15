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
    label: "Sleep",
    color: "hsl(var(--chart-3))",
  },
}

export function SleepChart() {
  const avgHours = (chartData.reduce((acc, item) => acc + item.hours, 0) / chartData.length).toFixed(1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sleep</CardTitle>
        <CardDescription>
          Nightly average: <span className="font-bold text-foreground">{avgHours}h</span>
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
              content={<ChartTooltipContent unit="h" indicator="line" hideLabel />}
            />
             <defs>
                <linearGradient id="fillSleep" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-hours)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--color-hours)" stopOpacity={0}/>
                </linearGradient>
            </defs>
            <Area
              dataKey="hours"
              type="natural"
              fill="url(#fillSleep)"
              stroke="var(--color-hours)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
