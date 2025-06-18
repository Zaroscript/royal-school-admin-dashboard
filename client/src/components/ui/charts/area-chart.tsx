"use client"

import { Area, AreaChart as RechartsAreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { chartPalettes, getChartColors } from "@/lib/chartColors"

interface AreaChartProps {
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

export function AreaChart({
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
}: AreaChartProps) {
  // Use provided colors or fall back to palette
  const chartColors = colors || chartPalettes[palette];
  
  // Generate gradient IDs for each color
  const generateGradientId = (color: string) => `gradient-${color.replace('#', '')}`;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsAreaChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 0,
        }}
      >
        {showGrid && (
          <defs>
            {chartColors.map((color, index) => (
              <linearGradient 
                key={index}
                id={generateGradientId(color)} 
                x1="0" 
                y1="0" 
                x2="0" 
                y2="1"
              >
                <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={color} stopOpacity={0.1}/>
              </linearGradient>
            ))}
          </defs>
        )}
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
          <Area
            key={category}
            type="monotone"
            dataKey={category}
            stroke={chartColors[index % chartColors.length]}
            strokeWidth={2}
            fill={showGrid ? `url(#${generateGradientId(chartColors[index % chartColors.length])})` : chartColors[index % chartColors.length]}
            fillOpacity={0.1}
            isAnimationActive={showAnimation}
            animationDuration={1000}
            animationEasing="ease-out"
          />
        ))}
      </RechartsAreaChart>
    </ResponsiveContainer>
  )
}
