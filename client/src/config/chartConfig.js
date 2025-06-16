export const chartConfig = {
  // Color palette system
  colors: {
    primary: {
      main: "hsl(222.2 47.4% 11.2%)",
      light: "hsl(215 79% 51%)",
      dark: "hsl(217 91% 60%)",
      gradient: ["hsl(215 79% 51%)", "hsl(217 91% 60%)"]
    },
    secondary: {
      main: "hsl(280 40% 50%)",
      light: "hsl(280 40% 60%)",
      dark: "hsl(280 40% 40%)",
      gradient: ["hsl(280 40% 50%)", "hsl(280 40% 40%)"]
    },
    success: {
      main: "hsl(142 76% 36%)",
      light: "hsl(142 76% 46%)",
      dark: "hsl(142 76% 26%)",
      gradient: ["hsl(142 76% 46%)", "hsl(142 76% 26%)"]
    },
    warning: {
      main: "hsl(45 93% 47%)",
      light: "hsl(45 93% 57%)",
      dark: "hsl(45 93% 37%)",
      gradient: ["hsl(45 93% 57%)", "hsl(45 93% 37%)"]
    },
    error: {
      main: "hsl(0 84% 60%)",
      light: "hsl(0 84% 70%)",
      dark: "hsl(0 84% 50%)",
      gradient: ["hsl(0 84% 70%)", "hsl(0 84% 50%)"]
    },
    neutral: {
      100: "hsl(0 0% 98%)",
      200: "hsl(0 0% 93%)",
      300: "hsl(0 0% 87%)",
      400: "hsl(0 0% 80%)",
      500: "hsl(0 0% 70%)",
      600: "hsl(0 0% 50%)",
      700: "hsl(0 0% 40%)",
      800: "hsl(0 0% 30%)",
      900: "hsl(0 0% 20%)"
    }
  },
  // Enhanced gradients for area charts
  areaGradient: {
    income: ["hsla(142, 76%, 46%, 0.3)", "hsla(142, 76%, 46%, 0.0)"],
    expense: ["hsla(0, 84%, 60%, 0.3)", "hsla(0, 84%, 60%, 0.0)"],
    profit: ["hsla(215, 79%, 51%, 0.3)", "hsla(215, 79%, 51%, 0.0)"],
    attendance: ["hsla(280, 40%, 50%, 0.3)", "hsla(280, 40%, 50%, 0.0)"],
    performance: ["hsla(45, 93%, 47%, 0.3)", "hsla(45, 93%, 47%, 0.0)"]
  },
  // Chart animations
  animation: {
    duration: 1000,
    easing: "ease-out"
  },
  // Responsive breakpoints
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280
  },
  // Chart component styles
  styles: {
    tooltip: {
      backgroundColor: "hsl(var(--background))",
      border: "1px solid hsl(var(--border))",
      borderRadius: "0.5rem",
      padding: "0.75rem",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
    },
    legend: {
      fontSize: "0.875rem",
      padding: "0.5rem"
    },
    axis: {
      fontSize: "0.75rem",
      tickLine: false
    }
  }
};
