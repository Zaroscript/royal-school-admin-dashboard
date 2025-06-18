"use client"

import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { chartPalettes, getChartColors } from "@/lib/chartColors"

interface BarChartProps {
  data: any[]
  index: string
  categories: string[]
  colors?: string[]
  valueFormatter?: (value: number) => string
  startEndOnly?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
  yAxisWidth?: number
  showAnimation?: boolean
  showTooltip?: boolean
  showGrid?: boolean
  height?: number
  palette?: keyof typeof chartPalettes
}

export function BarChart({
  data,
  index,
  categories,
  colors,
  valueFormatter = (value: number) => value.toString(),
  startEndOnly = false,
  showXAxis = true,
  showYAxis = true,
  yAxisWidth = 60,
  showAnimation = true,
  showTooltip = true,
  showGrid = true,
  height = 300,
  palette = 'default',
}: BarChartProps) {
  // Use provided colors or fall back to palette
  const chartColors = colors || chartPalettes[palette];

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 0,
        }}
      >
        {showXAxis && (
          <XAxis
            dataKey={index}
            tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={startEndOnly ? (value, index) => {
              if (index === 0 || index === data.length - 1) return value
              return ""
            } : undefined}
          />
        )}
        {showYAxis && (
          <YAxis
            tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
            width={yAxisWidth}
            tickFormatter={valueFormatter}
          />
        )}
        {showTooltip && (
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          {index}
                        </span>
                        <span className="font-bold text-muted-foreground">
                          {label}
                        </span>
                      </div>
                      {payload.map((payload: any, index: number) => (
                        <div key={index} className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            {payload.name}
                          </span>
                          <span className="font-bold" style={{ color: chartColors[index % chartColors.length] }}>
                            {valueFormatter(payload.value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
        )}
        {categories.map((category, index) => (
          <Bar
            key={category}
            dataKey={category}
            fill={chartColors[index % chartColors.length]}
            radius={[4, 4, 0, 0]}
            isAnimationActive={showAnimation}
            animationDuration={1000}
            animationEasing="ease-out"
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}
