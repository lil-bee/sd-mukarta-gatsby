/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/templates/**/*.{js,jsx,ts,tsx}",
    "./src/config/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: "Sangbleu Sunrise",
      },
      colors: {
        "biru-gelap": "var(--wp--preset--color--biru-gelap)",
        "emas-elegan-gelap": "var(--wp--preset--color--emas-elegan-gelap)",
        "emas-elegan-terang": "var(--wp--preset--color--emas-elegan-terang)",
      },
    },
  },
  plugins: [],
};
