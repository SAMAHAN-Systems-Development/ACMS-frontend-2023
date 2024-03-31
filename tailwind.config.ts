import { addDynamicIconSelectors } from '@iconify/tailwind';
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
    },
    colors: {
      // navyBlue: '#181842',
      // blue: '#7A92C2',
      navyBlue: '#724700',
      blue: '#d2a36a',
      white: '#ffffff',
      black: '#000000',
      gray: '#EBEBE4',
      brown: '#724700',
      goldenBrown: '#A57F37',
      lightBrown: '#d2a36a',
    },
  },
  plugins: [addDynamicIconSelectors(), require('daisyui')],
  daisyui: {
    darkTheme: 'light', // name of one of the included themes for dark mode
    base: false, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
  },
};
export default config;
