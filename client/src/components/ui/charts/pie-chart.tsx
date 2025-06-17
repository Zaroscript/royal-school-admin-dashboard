"use client"

import { Cell, Pie, PieChart as RechartsPieChart, ResponsiveContainer, Tooltip } from "recharts"

interface PieChartProps {
  data: any[]
  index: string
  category: string
  colors?: string[]
  valueFormatter?: (value: number) => string
  showAnimation?: boolean
  showTooltip?: boolean
  height?: number
}

export function PieChart({
  data,
  index,
  category,
  colors = ["#ef4444", "#3b82f6", "#22c55e", "#f97316", "#8b5cf6", "#06b6d4"],
  valueFormatter = (value: number) => value.toString(),
  showAnimation = true,
  showTooltip = true,
  height = 300,
}: PieChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey={category}
          nameKey={index}
          isAnimationActive={showAnimation}
          animationDuration={1000}
          animationEasing="ease-out"
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={colors[index % colors.length]}
              stroke="hsl(var(--background))"
              strokeWidth={2}
            />
          ))}
        </Pie>
        {showTooltip && (
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="flex flex-col gap-1">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        {index}
                      </span>
                      <span className="font-bold text-muted-foreground">
                        {data[index]}
                      </span>
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        {category}
                      </span>
                      <span className="font-bold" style={{ color: payload[0].fill }}>
                        {valueFormatter(data[category])}
                      </span>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
        )}
      </RechartsPieChart>
    </ResponsiveContainer>
  )
}
