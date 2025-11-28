/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      colors: {
        ocean: {
          primary: "#2563EB",
          secondary: "#F59E0B",
          error: "#EF4444",
          background: "#f9fafb",
          surface: "#ffffff",
          text: "#111827"
        }
      },
      boxShadow: {
        soft: "0 4px 14px rgba(0,0,0,0.08)"
      },
      borderRadius: {
        xl: "0.875rem"
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)"
      }
    }
  },
  plugins: []
};
