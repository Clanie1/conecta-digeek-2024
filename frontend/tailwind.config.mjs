/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      typography: {
        DEAFULT: {
          css: {
            maxWidth: "100vw",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
