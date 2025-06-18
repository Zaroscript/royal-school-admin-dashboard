// Chart Color Guidelines
// This file defines a comprehensive color system for charts that ensures:
// 1. Semantic meaning (green for positive, red for negative, etc.)
// 2. Accessibility (proper contrast ratios)
// 3. Consistency across all chart types
// 4. Dark mode compatibility

export const chartColors = {
  // Primary Brand Colors (Blue-Purple Theme)
  primary: {
    blue: '#3b82f6',
    purple: '#8b5cf6',
    indigo: '#6366f1',
    violet: '#7c3aed',
  },

  // Semantic Colors
  semantic: {
    // Positive/Negative
    positive: '#10b981', // Green
    negative: '#ef4444', // Red
    neutral: '#6b7280', // Gray
    
    // Success/Error/Warning
    success: '#22c55e', // Green
    error: '#ef4444', // Red
    warning: '#f59e0b', // Amber
    info: '#3b82f6', // Blue
    
    // Performance Levels
    excellent: '#10b981', // Green
    good: '#3b82f6', // Blue
    average: '#f59e0b', // Amber
    poor: '#ef4444', // Red
  },

  // Financial Colors
  financial: {
    income: '#10b981', // Green
    expense: '#ef4444', // Red
    profit: '#3b82f6', // Blue
    loss: '#ef4444', // Red
    revenue: '#22c55e', // Green
    cost: '#f97316', // Orange
    budget: '#8b5cf6', // Purple
    balance: '#06b6d4', // Cyan
  },

  // Academic Colors
  academic: {
    students: '#3b82f6', // Blue
    teachers: '#10b981', // Green
    attendance: '#8b5cf6', // Purple
    grades: '#f59e0b', // Amber
    performance: '#06b6d4', // Cyan
    subjects: '#ec4899', // Pink
  },

  // Status Colors
  status: {
    active: '#10b981', // Green
    inactive: '#6b7280', // Gray
    pending: '#f59e0b', // Amber
    completed: '#22c55e', // Green
    inProgress: '#3b82f6', // Blue
    cancelled: '#ef4444', // Red
  },

  // Category Colors (for pie charts and categorical data)
  categories: {
    primary: '#3b82f6', // Blue
    secondary: '#8b5cf6', // Purple
    tertiary: '#06b6d4', // Cyan
    quaternary: '#ec4899', // Pink
    quinary: '#f59e0b', // Amber
    senary: '#10b981', // Green
    septenary: '#f97316', // Orange
    octonary: '#ef4444', // Red
  },

  // Sequential Colors (for gradients and heatmaps)
  sequential: {
    blue: ['#dbeafe', '#93c5fd', '#3b82f6', '#1d4ed8', '#1e3a8a'],
    green: ['#dcfce7', '#86efac', '#22c55e', '#15803d', '#14532d'],
    purple: ['#f3e8ff', '#c4b5fd', '#8b5cf6', '#7c3aed', '#5b21b6'],
    orange: ['#fed7aa', '#fdba74', '#f97316', '#ea580c', '#c2410c'],
  },

  // Diverging Colors (for data with positive/negative values)
  diverging: {
    redBlue: ['#ef4444', '#fca5a5', '#f1f5f9', '#93c5fd', '#3b82f6'],
    redGreen: ['#ef4444', '#fca5a5', '#f1f5f9', '#86efac', '#22c55e'],
  },
};

// Color palette generators for different chart types
export const chartPalettes = {
  // Default palette for general use
  default: [
    chartColors.primary.blue,
    chartColors.primary.purple,
    chartColors.semantic.success,
    chartColors.semantic.warning,
    chartColors.categories.tertiary,
    chartColors.categories.quaternary,
  ],

  // Financial palette
  financial: [
    chartColors.financial.income,
    chartColors.financial.expense,
    chartColors.financial.profit,
    chartColors.financial.cost,
    chartColors.financial.budget,
    chartColors.financial.balance,
  ],

  // Academic palette
  academic: [
    chartColors.academic.students,
    chartColors.academic.teachers,
    chartColors.academic.attendance,
    chartColors.academic.grades,
    chartColors.academic.performance,
    chartColors.academic.subjects,
  ],

  // Status palette
  status: [
    chartColors.status.active,
    chartColors.status.pending,
    chartColors.status.completed,
    chartColors.status.inProgress,
    chartColors.status.inactive,
    chartColors.status.cancelled,
  ],

  // Performance palette
  performance: [
    chartColors.semantic.excellent,
    chartColors.semantic.good,
    chartColors.semantic.average,
    chartColors.semantic.poor,
  ],

  // Sequential palette
  sequential: chartColors.sequential.blue,

  // Diverging palette
  diverging: chartColors.diverging.redBlue,
};

// Helper functions for getting colors based on context
export const getChartColors = {
  // Get colors for financial data
  financial: (type: 'income' | 'expense' | 'profit' | 'loss' | 'revenue' | 'cost' | 'budget' | 'balance') => {
    return chartColors.financial[type];
  },

  // Get colors for academic data
  academic: (type: 'students' | 'teachers' | 'attendance' | 'grades' | 'performance' | 'subjects') => {
    return chartColors.academic[type];
  },

  // Get colors for status data
  status: (type: 'active' | 'inactive' | 'pending' | 'completed' | 'inProgress' | 'cancelled') => {
    return chartColors.status[type];
  },

  // Get colors for performance levels
  performance: (level: 'excellent' | 'good' | 'average' | 'poor') => {
    return chartColors.semantic[level];
  },

  // Get palette by name
  palette: (name: keyof typeof chartPalettes) => {
    return chartPalettes[name];
  },

  // Get color by category index
  category: (index: number) => {
    const categoryColors = Object.values(chartColors.categories);
    return categoryColors[index % categoryColors.length];
  },

  // Get sequential color by value (0-1)
  sequential: (value: number, palette: keyof typeof chartColors.sequential = 'blue') => {
    const colors = chartColors.sequential[palette];
    const index = Math.floor(value * (colors.length - 1));
    return colors[Math.min(index, colors.length - 1)];
  },

  // Get diverging color by value (-1 to 1)
  diverging: (value: number, palette: keyof typeof chartColors.diverging = 'redBlue') => {
    const colors = chartColors.diverging[palette];
    const normalizedValue = (value + 1) / 2; // Convert -1,1 to 0,1
    const index = Math.floor(normalizedValue * (colors.length - 1));
    return colors[Math.min(index, colors.length - 1)];
  },
};

// Color accessibility utilities
export const colorUtils = {
  // Check if color meets contrast requirements
  getContrastRatio: (color1: string, color2: string) => {
    // Simplified contrast calculation
    const luminance1 = getLuminance(color1);
    const luminance2 = getLuminance(color2);
    const brightest = Math.max(luminance1, luminance2);
    const darkest = Math.min(luminance1, luminance2);
    return (brightest + 0.05) / (darkest + 0.05);
  },

  // Get accessible text color for background
  getAccessibleTextColor: (backgroundColor: string) => {
    const luminance = getLuminance(backgroundColor);
    return luminance > 0.5 ? '#000000' : '#ffffff';
  },

  // Adjust color for dark mode
  getDarkModeColor: (color: string, isDark: boolean = false) => {
    if (!isDark) return color;
    // Simplified dark mode adjustment
    return color; // In a real implementation, you'd adjust the color
  },
};

// Helper function to calculate luminance
function getLuminance(color: string): number {
  // Simplified luminance calculation
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;
  
  const rsRGB = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  const gsRGB = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  const bsRGB = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
  
  return 0.2126 * rsRGB + 0.7152 * gsRGB + 0.0722 * bsRGB;
}

// Export default palette for backward compatibility
export const defaultChartColors = chartPalettes.default; 