import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell
} from 'recharts';
import { chartConfig } from '@/config/chartConfig';

export const EnhancedAreaChart = ({ data, keys, height = 400 }) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <defs>
          {keys.map((key) => (
            <linearGradient key={key} id={`gradient-${key}`} x1="0" y1="0" x2="0" y2="1">
              {chartConfig.areaGradient[key].map((color, index) => (
                <stop
                  key={index}
                  offset={`${index * 100}%`}
                  stopColor={color}
                />
              ))}
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.4} />
        <XAxis
          dataKey="name"
          stroke="hsl(var(--foreground))"
          fontSize={chartConfig.styles.axis.fontSize}
          tickLine={chartConfig.styles.axis.tickLine}
        />
        <YAxis
          stroke="hsl(var(--foreground))"
          fontSize={chartConfig.styles.axis.fontSize}
          tickLine={chartConfig.styles.axis.tickLine}
        />
        <Tooltip
          contentStyle={chartConfig.styles.tooltip}
          labelStyle={{ color: "hsl(var(--foreground))" }}
        />
        <Legend {...chartConfig.styles.legend} />
        {keys.map((key, index) => (
          <Area
            key={key}
            type="monotone"
            dataKey={key}
            stroke={`url(#gradient-${key})`}
            fill={`url(#gradient-${key})`}
            strokeWidth={2}
            animationDuration={chartConfig.animation.duration}
            animationEasing={chartConfig.animation.easing}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export const EnhancedLineChart = ({ data, keys, height = 400 }) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.4} />
        <XAxis
          dataKey="name"
          stroke="hsl(var(--foreground))"
          fontSize={chartConfig.styles.axis.fontSize}
          tickLine={chartConfig.styles.axis.tickLine}
        />
        <YAxis
          stroke="hsl(var(--foreground))"
          fontSize={chartConfig.styles.axis.fontSize}
          tickLine={chartConfig.styles.axis.tickLine}
        />
        <Tooltip
          contentStyle={chartConfig.styles.tooltip}
          labelStyle={{ color: "hsl(var(--foreground))" }}
        />
        <Legend {...chartConfig.styles.legend} />
        {keys.map((key, index) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke={`hsl(${index * 60}, 70%, 50%)`}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            animationDuration={chartConfig.animation.duration}
            animationEasing={chartConfig.animation.easing}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export const EnhancedBarChart = ({ data, keys, height = 400 }) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.4} />
        <XAxis
          dataKey="name"
          stroke="hsl(var(--foreground))"
          fontSize={chartConfig.styles.axis.fontSize}
          tickLine={chartConfig.styles.axis.tickLine}
        />
        <YAxis
          stroke="hsl(var(--foreground))"
          fontSize={chartConfig.styles.axis.fontSize}
          tickLine={chartConfig.styles.axis.tickLine}
        />
        <Tooltip
          contentStyle={chartConfig.styles.tooltip}
          labelStyle={{ color: "hsl(var(--foreground))" }}
        />
        <Legend {...chartConfig.styles.legend} />
        {keys.map((key, index) => (
          <Bar
            key={key}
            dataKey={key}
            fill={`hsl(${index * 60}, 70%, 50%)`}
            radius={[4, 4, 0, 0]}
            animationDuration={chartConfig.animation.duration}
            animationEasing={chartConfig.animation.easing}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export const EnhancedPieChart = ({ data, height = 400 }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          animationDuration={chartConfig.animation.duration}
          animationEasing={chartConfig.animation.easing}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={chartConfig.styles.tooltip}
          labelStyle={{ color: "hsl(var(--foreground))" }}
        />
        <Legend {...chartConfig.styles.legend} />
      </PieChart>
    </ResponsiveContainer>
  );
};
