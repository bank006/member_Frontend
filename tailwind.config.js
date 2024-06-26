/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        scaleIn: {
          from: {
            transform: 'scale(0.8)',
          },
          to: {
            transform: 'scale(1)',
          },
        },
      },
      screens: {
        'ipadpro': '1024px'
      },
      animation: {
        'scaleIn': 'scaleIn 0.3s ease-out'
      }

    },
    plugins: [],
  }
}
