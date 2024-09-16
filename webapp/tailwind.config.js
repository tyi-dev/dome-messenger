import { TailwindConfig } from '../shared/tailwind.config.js';

export default {
   darkMode: TailwindConfig.darkMode,
   content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './index.html'],
   theme: TailwindConfig.theme,
   plugins: [require('tailwindcss-animate')],
};
