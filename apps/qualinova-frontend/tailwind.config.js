/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'gray-border-800': '#27272A',
        'gray-text-50': '#FAFAFA',
        'gray-text-400': '#A1A1AA',
        'secondary-button-bg': '#2563EB',
        'black-text': '#18181B',
      },
    },
  },
  plugins: [],
};
