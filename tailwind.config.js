/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'], 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // High-Contrast Light Mode (Sunrise)
        sunrise: {
          50: "#fff1f2",  // Lightest rose background
          100: "#ffe4e6", // Soft borders
          500: "#f43f5e", // Primary Brand Rose
          600: "#e11d48", // Hover states
          900: "#0f172a", // Text & High-contrast buttons
        },
        // High-Contrast Dark Mode (Midnight)
        midnight: {
          800: "#1e293b", // Secondary sections (Info Desk)
          900: "#0f172a", // Main card backgrounds
          950: "#020617", // Deepest canvas background
        },
        // Shared Accents
        accent: {
          purple: "#8b5cf6",
          indigo: "#6366f1",
          gold: "#f59e0b",
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'], // For those big, black headings
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
        '6xl': '3.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'float': 'float 5s ease-in-out infinite',
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(2deg)' },
        }
      },
      backgroundImage: {
        // Optimized for high visibility of text and buttons
        'sunrise-canvas': "linear-gradient(to bottom right, #ffffff, #fff1f2, #fef2f2)",
        'midnight-canvas': "radial-gradient(circle at top center, #1e1b4b, #020617 80%)",
      },
      boxShadow: {
        'soft-xl': '0 20px 40px -15px rgba(0, 0, 0, 0.05)',
        'rose-glow': '0 0 30px -5px rgba(244, 63, 94, 0.3)',
      }
    },
  },
  animation: {
  'shake': 'shake 0.4s ease',
  'slide-in': 'slideIn 0.4s ease',
},

keyframes: {

  shake: {
    '0%, 100%': { transform: 'translateX(0)' },
    '25%': { transform: 'translateX(-6px)' },
    '75%': { transform: 'translateX(6px)' },
  },

  slideIn: {
    '0%': { transform: 'translateY(-20px)', opacity: '0' },
    '100%': { transform: 'translateY(0)', opacity: '1' },
  },

},

  plugins: [],
}