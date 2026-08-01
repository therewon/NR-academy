/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        brand: {
          blue: '#2563EB',
          'blue-dark': '#1D4ED8',
          'blue-light': '#EAF0FF',
          navy: '#1D4ED8',
          'navy-light': '#2563EB',
        },
        ink: {
          900: '#1A1A2E',
          700: '#3B3F5C',
          500: '#6B7280',
          300: '#A4A7C1',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          soft: '#F9FAFB',
          line: '#E7E9F3',
        },
        tint: {
          green: '#E4FCCC',
          'green-fg': '#4D8B1F',
          purple: '#E8DAF9',
          'purple-fg': '#6C4EE0',
          yellow: '#F7EDAE',
          'yellow-fg': '#B08900',
          peach: '#FBE7DD',
          'peach-fg': '#E0684A',
          blue: '#D3E4FF',
          'blue-fg': '#2563EB',
          pink: '#FDDEDE',
          'pink-fg': '#D94E86',
        },
      },
      fontFamily: {
        sans: ['"Poppins"', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(17, 20, 49, 0.12)',
        floating: '0 20px 45px -15px rgba(17, 20, 49, 0.25)',
      },
      borderRadius: {
        xl2: '1.25rem',
        xl3: '1.75rem',
      },
      backgroundImage: {
        'navy-gradient': 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
        'ribbon-gradient': 'linear-gradient(90deg, #1D4ED8 0%, #2563EB 100%)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
};
