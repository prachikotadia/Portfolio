import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
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
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				"typewriter": {
					to: {
						left: "100%"
					}
				},
				"blink": {
					"0%, 100%": {
						opacity: "1"
					},
					"50%": {
						opacity: "0"
					}
				},
				"float": {
					"0%, 100%": {
						transform: "translateY(0)"
					},
					"50%": {
						transform: "translateY(-10px)"
					}
				},
				"scale-up": {
					from: {
						transform: "scale(0.9)",
						opacity: "0"
					},
					to: {
						transform: "scale(1)",
						opacity: "1"
					}
				},
				"fade-in": {
					from: {
						opacity: "0"
					},
					to: {
						opacity: "1"
					}
				},
				"fade-in-up": {
					from: {
						opacity: "0",
						transform: "translateY(20px)"
					},
					to: {
						opacity: "1",
						transform: "translateY(0)"
					}
				},
				"spin-slow": {
					from: {
						transform: "rotate(0deg)"
					},
					to: {
						transform: "rotate(360deg)"
					}
				},
				"bounce-slight": {
					"0%, 100%": {
						transform: "translateY(0)"
					},
					"50%": {
						transform: "translateY(-5px)"
					}
				},
				"pulse-glow": {
					"0%, 100%": {
						boxShadow: "0 0 5px 0 rgba(139, 92, 246, 0.5)"
					},
					"50%": {
						boxShadow: "0 0 20px 5px rgba(139, 92, 246, 0.8)"
					}
				},
				"jelly": {
					"0%, 100%": {
						transform: "scale(1, 1)"
					},
					"25%": {
						transform: "scale(0.95, 1.05)"
					},
					"50%": {
						transform: "scale(1.05, 0.95)"
					},
					"75%": {
						transform: "scale(0.97, 1.03)"
					}
				},
				"rotate-y-180": {
					to: {
						transform: "rotateY(180deg)"
					}
				},
				"shake": {
					"0%, 100%": {
						transform: "translateX(0)"
					},
					"10%, 30%, 50%, 70%, 90%": {
						transform: "translateX(-5px)"
					},
					"20%, 40%, 60%, 80%": {
						transform: "translateX(5px)"
					}
				},
				"confetti": {
					"0%": { transform: "translateY(0) rotateX(0) rotateY(0)" },
					"100%": { transform: "translateY(1000px) rotateX(720deg) rotateY(720deg)" }
				},
				"slide-up-fade": {
					"0%": { 
						opacity: "0", 
						transform: "translateY(20px)" 
					},
					"100%": { 
						opacity: "1", 
						transform: "translateY(0)" 
					}
				},
				"slide-down-fade": {
					"0%": { 
						opacity: "0", 
						transform: "translateY(-20px)" 
					},
					"100%": { 
						opacity: "1", 
						transform: "translateY(0)" 
					}
				},
				"slide-left-fade": {
					"0%": { 
						opacity: "0", 
						transform: "translateX(20px)" 
					},
					"100%": { 
						opacity: "1", 
						transform: "translateX(0)" 
					}
				},
				"slide-right-fade": {
					"0%": { 
						opacity: "0", 
						transform: "translateX(-20px)" 
					},
					"100%": { 
						opacity: "1", 
						transform: "translateX(0)" 
					}
				},
				"scale-in": {
					"0%": {
						opacity: "0",
						transform: "scale(0.95)"
					},
					"100%": {
						opacity: "1",
						transform: "scale(1)"
					}
				},
				"scale-out": {
					"0%": {
						opacity: "1",
						transform: "scale(1)"
					},
					"100%": {
						opacity: "0",
						transform: "scale(0.95)"
					}
				},
				"blur-in": {
					"0%": {
						filter: "blur(10px)",
						opacity: "0"
					},
					"100%": {
						filter: "blur(0)",
						opacity: "1"
					}
				},
				"ripple": {
					"0%": {
						transform: "scale(1)",
						opacity: "0.4"
					},
					"100%": {
						transform: "scale(1.5)",
						opacity: "0"
					}
				},
				"magnetic": {
					"0%, 100%": { transform: "translateY(0)" },
					"30%": { transform: "translateY(-10px) translateX(5px)" },
					"60%": { transform: "translateY(5px) translateX(-5px)" }
				},
				"shine": {
					"0%": { transform: "translateX(-100%) skew(-45deg)" },
					"100%": { transform: "translateX(200%) skew(-45deg)" }
				},
				"gradient-shift": {
					"0%, 100%": {
						"background-position": "0% 50%"
					},
					"50%": {
						"background-position": "100% 50%" 
					}
				},
				"text-shimmer": {
					"0%": {
						"background-position": "0% 50%"
					},
					"100%": {
						"background-position": "100% 50%"
					}
				},
				"cursor-ping": {
					"0%": { transform: "scale(1)", opacity: "1" },
					"75%, 100%": { transform: "scale(2)", opacity: "0" }
				},
				"cursor-trail": {
					"0%": { opacity: "0.6", transform: "scale(1)" },
					"100%": { opacity: "0", transform: "scale(0.5)" }
				},
				"frosted-reveal": {
					"0%": { 
						backdropFilter: "blur(0px)",
						backgroundColor: "rgba(255, 255, 255, 0)" 
					},
					"100%": { 
						backdropFilter: "blur(8px)",
						backgroundColor: "rgba(255, 255, 255, 0.1)" 
					}
				},
				"marquee": {
					"0%": { transform: "translateX(0%)" },
					"100%": { transform: "translateX(-100%)" }
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"typewriter": "typewriter 4s steps(40) 1s forwards",
				"blink": "blink 1s step-end infinite",
				"float": "float 6s ease-in-out infinite",
				"scale-up": "scale-up 0.5s ease-out forwards",
				"fade-in": "fade-in 0.5s ease-out forwards",
				"fade-in-up": "fade-in-up 0.6s ease-out forwards",
				"spin-slow": "spin-slow 8s linear infinite",
				"bounce-slight": "bounce-slight 2s ease-in-out infinite",
				"pulse-glow": "pulse-glow 2s infinite",
				"jelly": "jelly 0.8s ease-in-out",
				"shake": "shake 0.8s ease-in-out",
				"confetti": "confetti 5s ease-in-out forwards",
				"slide-up-fade": "slide-up-fade 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
				"slide-down-fade": "slide-down-fade 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
				"slide-left-fade": "slide-left-fade 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
				"slide-right-fade": "slide-right-fade 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
				"scale-in": "scale-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
				"blur-in": "blur-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
				"ripple": "ripple 1s cubic-bezier(0.22, 1, 0.36, 1) infinite",
				"magnetic": "magnetic 6s ease-in-out infinite",
				"shine": "shine 1.5s ease-in-out",
				"gradient-shift": "gradient-shift 3s ease infinite",
				"text-shimmer": "text-shimmer 3s linear infinite",
				"cursor-ping": "cursor-ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
				"cursor-trail": "cursor-trail 0.5s ease-out forwards",
				"frosted-reveal": "frosted-reveal 0.3s ease forwards",
				"marquee": "marquee 25s linear infinite",
			},
			fontFamily: {
				'sans': ['Inter', 'SF Pro Display', 'sans-serif'],
				'display': ['"Space Grotesk"', 'SF Pro Display', 'sans-serif']
			},
			transitionProperty: {
				'height': 'height',
				'spacing': 'margin, padding',
			},
			textShadow: {
				sm: '0 1px 2px var(--tw-shadow-color)',
				md: '0 2px 4px var(--tw-shadow-color)',
				lg: '0 8px 16px var(--tw-shadow-color)',
				glow: '0 0 5px var(--tw-shadow-color), 0 0 20px var(--tw-shadow-color)'
			},
			backdropBlur: {
				xs: '2px',
			},
			backgroundSize: {
				'auto': 'auto',
				'cover': 'cover',
				'contain': 'contain',
				'200%': '200% 200%',
				'300%': '300% 300%',
			},
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		function ({ addUtilities }) {
			const newUtilities = {
				'.text-shadow-sm': {
					textShadow: '0 1px 2px var(--tw-shadow-color, rgba(0, 0, 0, 0.1))'
				},
				'.text-shadow': {
					textShadow: '0 2px 4px var(--tw-shadow-color, rgba(0, 0, 0, 0.1))'
				},
				'.text-shadow-lg': {
					textShadow: '0 8px 16px var(--tw-shadow-color, rgba(0, 0, 0, 0.1))'
				},
				'.text-shadow-glow': {
					textShadow: '0 0 5px var(--tw-shadow-color, rgba(139, 92, 246, 0.5)), 0 0 20px var(--tw-shadow-color, rgba(139, 92, 246, 0.3))'
				},
				'.text-gradient': {
					backgroundClip: 'text',
					'-webkit-background-clip': 'text',
					color: 'transparent',
					backgroundSize: '200%',
					animation: 'text-shimmer 3s linear infinite',
				},
				'.apple-button-ripple': {
					position: 'relative',
					overflow: 'hidden',
				},
				'.apple-button-ripple::after': {
					content: '""',
					position: 'absolute',
					width: '100%',
					height: '100%',
					background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)',
					transform: 'scale(0)',
					opacity: '0',
					transition: 'transform 0.5s, opacity 0.5s',
				},
				'.apple-button-ripple:active::after': {
					transform: 'scale(2)',
					opacity: '0',
					transition: 'transform 0.5s, opacity 0.5s',
				},
				'.transform-style-3d': {
					transformStyle: 'preserve-3d',
				},
				'.backface-hidden': {
					backfaceVisibility: 'hidden',
				},
				'.rotate-y-180': {
					transform: 'rotateY(180deg)',
				},
				'.perspective-1000': {
					perspective: '1000px',
				},
				'.preserve-3d': {
					transformStyle: 'preserve-3d',
				},
				'.glass': {
					background: 'rgba(255, 255, 255, 0.1)',
					backdropFilter: 'blur(10px)',
					borderRadius: '10px',
					border: '1px solid rgba(255, 255, 255, 0.2)',
				},
				'.glass-dark': {
					background: 'rgba(0, 0, 0, 0.3)',
					backdropFilter: 'blur(10px)',
					borderRadius: '10px',
					border: '1px solid rgba(255, 255, 255, 0.1)',
				},
				'.marquee-container': {
					width: '100%',
					overflow: 'hidden',
					whiteSpace: 'nowrap',
					display: 'inline-block',
				},
				'.marquee-content': {
					display: 'inline-block',
					animation: 'marquee 25s linear infinite',
				},
			};
			addUtilities(newUtilities);
		}
	],
} satisfies Config;
