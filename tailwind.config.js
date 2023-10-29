/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
    // styled: true,
    // themes: true,
    // base: true,
    // utils: true,
    // logs: true,
    // rtl: false,
  },
};
