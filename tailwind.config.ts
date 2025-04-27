/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        button_blue: "#111D4A",
        border_gray: "#ec01eb",
      },
      fontSize: {
        xs: 10,
        sm: 14,
        md: 18,
        lg: 24,
        xl: 30,
        xxl: 40,
        xxxl: 50,
      },
    },
  },
  plugins: [],
};
