/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F7F3EC",
        "cream-deep": "#EFE8DC",
        paper: "#FFFFFF",
        ink: "#1C1B19",
        "ink-soft": "#4A4742",
        moss: "#3D5C45",
        "moss-light": "#6E8C73",
        rust: "#C1592A",
        butter: "#F4C95D",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Plus Jakarta Sans", "sans-serif"],
      },
      borderRadius: {
        sm: "14px",
        md: "18px",
        lg: "24px",
        xl: "32px",
        pill: "100px",
      },
      animation: {
        "float-slow": "floatSlow 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
