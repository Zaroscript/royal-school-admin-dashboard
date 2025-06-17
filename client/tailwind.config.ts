import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					light: 'hsl(var(--primary-light))',
					dark: 'hsl(var(--primary-dark))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					light: 'hsl(var(--secondary-light))',
					dark: 'hsl(var(--secondary-dark))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
					light: 'hsl(var(--accent-light))',
					dark: 'hsl(var(--accent-dark))'
				},
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))',
					light: 'hsl(var(--success-light))',
					dark: 'hsl(var(--success-dark))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))',
					light: 'hsl(var(--warning-light))',
					dark: 'hsl(var(--warning-dark))'
				},
				danger: {
					DEFAULT: 'hsl(var(--danger))',
					foreground: 'hsl(var(--danger-foreground))',
					light: 'hsl(var(--danger-light))',
					dark: 'hsl(var(--danger-dark))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--danger))',
					foreground: 'hsl(var(--danger-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				royal: {
					gold: 'hsl(var(--royal-gold))',
					blue: 'hsl(var(--royal-blue))',
					purple: 'hsl(var(--royal-purple))',
					emerald: 'hsl(var(--royal-emerald))',
					amber: 'hsl(var(--royal-amber))',
					crimson: 'hsl(var(--royal-crimson))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fade-in-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(30px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-in-right': {
					'0%': {
						opacity: '0',
						transform: 'translateX(100%)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)'
					}
				},
				'slide-in-left': {
					'0%': {
						opacity: '0',
						transform: 'translateX(-100%)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)'
					}
				},
				'scale-in': {
					'0%': {
						opacity: '0',
						transform: 'scale(0.95)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1)'
					}
				},
				'bounce-gentle': {
					'0%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					},
					'100%': {
						transform: 'translateY(0)'
					}
				},
				'pulse-slow': {
					'0%': {
						opacity: '1',
						transform: 'scale(1)'
					},
					'50%': {
						opacity: '0.5',
						transform: 'scale(0.9)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1)'
					}
				},
				'shimmer': {
					'0%': {
						backgroundPosition: '-200px 0'
					},
					'100%': {
						backgroundPosition: 'calc(200px + 100%) 0'
					}
				},
				'gradient': {
					'0%': {
						backgroundPosition: '0% 50%'
					},
					'50%': {
						backgroundPosition: '100% 50%'
					},
					'100%': {
						backgroundPosition: '0% 50%'
					}
				},
				'progress': {
					'0%': {
						width: '0%',
						opacity: '0.7'
					},
					'100%': {
						width: 'var(--progress-value, 100%)',
						opacity: '1'
					}
				},
				'royal-glow': {
					'0%': {
						boxShadow: '0 0 5px hsl(var(--primary) / 0.3)'
					},
					'50%': {
						boxShadow: '0 0 20px hsl(var(--primary) / 0.5)'
					},
					'100%': {
						boxShadow: '0 0 5px hsl(var(--primary) / 0.3)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'fade-in-up': 'fade-in-up 0.6s ease-out',
				'slide-in-right': 'slide-in-right 0.3s ease-out',
				'slide-in-left': 'slide-in-left 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
				'bounce-gentle': 'bounce-gentle 2s infinite',
				'pulse-slow': 'pulse-slow 3s infinite',
				'shimmer': 'shimmer 2s infinite',
				'gradient': 'gradient 3s ease infinite',
				'progress': 'progress 1s ease-out',
				'royal-glow': 'royal-glow 2s ease-in-out infinite'
			},
			fontFamily: {
				'arabic': ['Cairo', 'Tajawal', 'Noto Sans Arabic', 'sans-serif'],
				'sans': ['Inter', 'system-ui', 'sans-serif'],
			},
			backgroundImage: {
				'gradient-royal': 'var(--gradient-royal)',
				'gradient-gold': 'var(--gradient-gold)',
				'gradient-blue': 'var(--gradient-blue)',
				'gradient-success': 'var(--gradient-success)',
				'gradient-warning': 'var(--gradient-warning)',
				'gradient-danger': 'var(--gradient-danger)',
			},
			boxShadow: {
				'royal': '0 0 20px hsl(var(--primary) / 0.3)',
				'royal-lg': '0 0 30px hsl(var(--primary) / 0.5)',
				'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
				'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
			},
			backdropBlur: {
				xs: '2px',
			},
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		function({ addUtilities }) {
			const newUtilities = {
				'.focus-no-outline': {
					'&:focus': {
						outline: 'none',
						border: 'none',
						boxShadow: 'none'
					},
					'&:focus-visible': {
						outline: 'none',
						border: 'none',
						boxShadow: 'none'
					}
				},
				'.no-focus-ring': {
					'&:focus': {
						outline: 'none',
						ring: '0',
						border: 'none'
					},
					'&:focus-visible': {
						outline: 'none',
						ring: '0',
						border: 'none'
					}
				}
			}
			addUtilities(newUtilities)
		}
	]
} satisfies Config;
