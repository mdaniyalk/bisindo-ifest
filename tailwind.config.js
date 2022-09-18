/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'c-01': '#FFB640',
        'c-02': '#FF9D00',
        'c-03': '#FF6254',
        'c-04': '#1BD5E1',
        'c-05': '#129AA3',
      },
    },
  },
  plugins: [],
};
