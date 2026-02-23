/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'space-black': '#08080f',
        'deep-black': '#0d0d1a',
        'void': '#12121f',
        'purple-glow': '#7c3aed',
        'purple-vivid': '#8b5cf6',
        'purple-light': '#a78bfa',
        'purple-pale': '#c4b5fd',
        'purple-dim': '#4c1d95',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slideUp 0.8s ease forwards',
        'fade-in': 'fadeIn 1s ease forwards',
        'border-spin': 'borderSpin 3s linear infinite',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px #7c3aed40' },
          '50%': { boxShadow: '0 0 60px #7c3aed80, 0 0 120px #7c3aed30' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        borderSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      backgroundImage: {
        'purple-gradient': 'linear-gradient(135deg, #7c3aed, #4c1d95)',
        'card-gradient': 'linear-gradient(145deg, rgba(124,58,237,0.1), rgba(76,29,149,0.05))',
        'hero-gradient': 'radial-gradient(ellipse at center, rgba(124,58,237,0.15) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
}
