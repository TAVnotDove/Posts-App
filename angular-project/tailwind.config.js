/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Add this line
  ],
  theme: {
    extend: {
      colors: {
        "pa-gray": {
          100: "#eeeeee",
          200: "#f5f5f5",
          300: "#fafafa",
          400: "#3a3a3a",
          500: "#c2c3c4",
        },
        "pa-black": {
          100: "#333333",
          200: "#0f0f10",
        },
        "pa-red": {
          100: "#dd0031",
          200: "#c3002f",
        },
        "pa-blue": "#1976d2",
      },
    },
  },
  plugins: [],
};
