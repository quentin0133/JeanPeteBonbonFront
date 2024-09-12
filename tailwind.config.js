/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "selector",
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/preline/preline.js",
  ],
  theme: {
    extend: {
      boxShadow: {
        "focused-color": "0 0 0 0.2em #0091ff, 0 0 0 0.4em #0091ff",
        "focused-color-dark": "0 0 0 0.2em #fff, 0 0 0 0.4em #000",
      },
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
    require("preline/plugin"),
  ],
};
