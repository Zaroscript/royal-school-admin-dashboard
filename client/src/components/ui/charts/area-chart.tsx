import React from 'react';
import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from "@/lib/utils";

interface DataPoint {
  name: string;
  [key: string]: string | number;
}

interface Category {
  name: string;
  key: string;
  color: string;
  gradientFrom?: string;
  gradientTo?: string;
}

interface AreaChartProps {
  data: DataPoint[];
  categories: Category[];
  showXAxis?: boolean;
  showYAxis?: boolean;
  className?: string;
  yAxisFormatter?: (value: number) => string;
  tooltipFormatter?: (value: number) => string;
}

export function AreaChart({
  data,
  categories,
  showXAxis = true,
  showYAxis = true,
  className,
  yAxisFormatter,
  tooltipFormatter,
}: AreaChartProps) {
  return (
    <div className={cn("w-full h-[300px]", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart
          data={data}
          margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
          className="[&_.recharts-cartesian-grid-horizontal]:stroke-muted 
                     [&_.recharts-cartesian-grid-vertical]:stroke-muted 
                     [&_.recharts-cartesian-axis-line]:stroke-border 
                     [&_.recharts-cartesian-axis-tick-value]:fill-muted-foreground
                     [&_.recharts-cartesian-axis-tick-line]:stroke-muted"
        >
          <defs>
            {categories.map((category) => (
              <linearGradient
                key={category.key}
                id={`gradient-${category.key}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor={category.gradientFrom || category.color}
                  stopOpacity={0.5}
                />
                <stop
                  offset="100%"
                  stopColor={category.gradientTo || category.color}
                  stopOpacity={0}
                />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
          {showXAxis && (
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              fontSize={12}
              stroke="hsl(var(--muted-foreground))"
            />
          )}
          {showYAxis && (
            <YAxis
              axisLine={false}
              tickLine={false}
              fontSize={12}
              stroke="hsl(var(--muted-foreground))"
              tickFormatter={yAxisFormatter}
            />
          )}
          <Tooltip
            content={({ active, payload, label }) => {
              if (!active || !payload) return null;
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-medium">{label}</div>
                    {payload.map((category, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-1">
                          <div
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: category.color }}
                          />
                          <span className="text-sm text-muted-foreground">
                            {category.name}
                          </span>
                        </div>                    <div className="text-sm font-medium">
                          {tooltipFormatter && typeof category.value === 'number'
                            ? tooltipFormatter(category.value)
                            : category.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }}
          />
          {categories.map((category) => (
            <Area
              key={category.key}
              type="monotone"
              dataKey={category.key}
              stroke={category.color}
              fill={`url(#gradient-${category.key})`}
              strokeWidth={2}
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
}
