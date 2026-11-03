export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        theme: {
          bg: '#f7f8fb',
          surface: '#ffffff',
          'surface-hover': '#eef0f6',
          border: '#dfe3ee',
          primary: '#111827',
          muted: '#5b6477',
          accent: '#4f46e5',
          'accent-hover': '#4338ca',
          'accent-text': '#ffffff',
        },
        bg: '#f7f8fb',
        surface: '#ffffff',
        'surface-hover': '#eef0f6',
        accent: '#4f46e5',
        'accent-hover': '#4338ca',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'sans-serif'],
      },
      borderRadius: {
        theme: '12px',
      },
    },
  },
  plugins: [],
};