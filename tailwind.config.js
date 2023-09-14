module.exports = {
  darkMode: 'class', // Enable dark mode (can be 'media' or 'class')
  purge: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ], // Define files to scan and remove unused CSS classes (for production builds)
  theme: {
    extend: {
      colors: {
        primary: '#3490dc', // Example: Customize the primary color
        secondary: '#ffed4a', // Example: Customize the secondary color
      },
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans'], // Example: Customize the default sans-serif font stack
      },
      // ...other customizations
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'], // Example: Enable 'active' variant for backgroundColor
    },
  },
  plugins: [
    // ...other plugins if needed
  ],
  // ...other configuration options
};
