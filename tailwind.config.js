const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      darkMode: 'class',
      screens:{
        sm: "374px",
        xl: "1400px"
      },
      fontFamily: {
        "lexend" : ['"Lexend"', 'sans-serif'],
        "lexend-deca" : ['"Lexend Deca"', 'sans-serif'],
        "lexend-exa" : ['"Lexend Exa"', 'sans-serif']
      }
    },
  },
  plugins: [],
});