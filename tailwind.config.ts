import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './stories/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'cadet-gray': '#9A9C9C',
        'jet': '#2B2B2B',
        'silver': '#C4C4C4',
        'purpureus': '#8F44A6',
        'yinmn-blue': '435182',
        'reseda-green': '#778472',
        'alabaster': '#F5F3EB',
        'anti-flash-white': '#EEEEEE'
      }
    },
  },
  plugins: [],
};
export default config;
