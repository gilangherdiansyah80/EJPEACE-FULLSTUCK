/** @type {import('tailwindcss').Config} */
export default {
  content: [`./index.html`, `./src/**/*.{js,ts,jsx,tsx}`],
  theme: {
    extend: {
      backgroundColor: {
        ejp: "#191919",
        yellowejp: "#f6df3c",
        ejpblur: "rgba(25, 25, 25, 0.5)",
      },
      textColor: {
        ejp: "#191919",
        yellowejp: "#f6df3c",
      },
      backgroundImage: {
        ejpeace: "url('images/EJP-Creative.png')",
      },
    },
    fontFamily: {
      helvetica: "Helvetica",
      swiss: "Swiss 721",
    },
  },
  plugins: [],
};
