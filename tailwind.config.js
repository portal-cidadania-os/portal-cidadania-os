/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cores extraídas da identidade visual homologada
        "brand-ciano": "#0099ff", 
        "brand-amarelo": "#ffcc00",
        "brand-magenta": "#ff0066",
        "brand-verde": "#33cc66",
      },
      fontFamily: {
        sans: ["Sora", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}
