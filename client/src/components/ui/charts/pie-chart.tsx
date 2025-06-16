import React from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { cn } from "@/lib/utils";

interface PieChartProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  className?: string;
  valueFormatter?: (value: number) => string;
}

export function PieChart({
  data,
  className,
  valueFormatter,
}: PieChartProps) {
  return (
    <div className={cn("w-full h-[300px]", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color}
                className="stroke-background hover:opacity-80 transition-opacity"
              />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload) return null;
              const data = payload[0].payload;
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: data.color }}
                    />
                    <span className="font-medium">{data.name}</span>
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {valueFormatter ? valueFormatter(data.value) : data.value}
                  </div>
                </div>
              );
            }}
          />
          <Legend
            verticalAlign="middle"
            align="right"
            layout="vertical"
            content={({ payload }) => {
              if (!payload) return null;
              return (
                <div className="flex flex-col gap-2">
                  {payload.map((entry, index) => (
                    <div
                      key={`legend-${index}`}
                      className="flex items-center gap-2 text-sm"
                    >
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: entry.color }}
                      />
                      <span className="text-muted-foreground">{entry.value}</span>
                      <span className="font-medium">
                        {entry.payload.value}%
                      </span>
                    </div>
                  ))}
                </div>
              );
            }}
          />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
}
