/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  safelist: [
    {
      pattern: /rotate-(N|NNE|NE|ENE|E|ESE|SE|SSE|S|SSW|SW|WSW|W|WNW|NW|NNW)/,
    },
  ],
  theme: {
    extend: {
      rotate: {
        'N': '0deg',
        'NNE': '22.5deg',
        'NE': '45deg',
        'ENE': '67.5deg',
        'E': '90deg',
        'ESE': '112.5deg',
        'SE': '135deg',
        'SSE': '157.5deg',
        'S': '180deg',
        'SSW': '202.5deg',
        'SW': '225deg',
        'WSW': '247.5deg',
        'W': '270deg',
        'WNW': '292.5deg',
        'NW': '315deg',
        'NNW': '337.5deg',
      }
    },
  },
  plugins: [],
}

