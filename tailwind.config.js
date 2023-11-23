const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    
    extend: {
      darkMode: ['class', '[data-mode="dark"]'],

      screens:{
        sm: "374px",
        xl: "1400px"
      }
    },
  },
  plugins: [],
});