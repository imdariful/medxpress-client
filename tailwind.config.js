/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primaryGreen: "#067A46",
        primaryGreenHover: "#056835",
        secondaryLime: "#E4FABF",
        secondaryLimeHover: "#D2F895",
        blackish: "#242424",
        whitish: "#F8F8F8",
      },
      fontFamily: {
        agrandirRegular: ["Agrandir-Regular", "sans-serif"],
        agrandirBold: ["Agrandir-Bold", "sans-serif"],
        sspRegular: ["SourceSansPro-Regular", "sans-serif"],
        sspItalic: ["SourceSansPro-Italic", "sans-serif"],
        sspBold: ["SourceSansPro-Bold", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      "dark",
      "emerald",
      {
        myTheme: {
          primary: "#067A46",

          secondary: "#edd56d",

          accent: "#095872",

          neutral: "#191924",

          "base-100": "#fff",

          info: "#84c3f1",

          success: "#E4FABF",

          warning: "#bd9914",

          error: "#f42415",
        },
      },
    ],
    // themes: false, // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  },
};
