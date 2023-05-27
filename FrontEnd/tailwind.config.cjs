/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/*.{js,jsx}", // this is means all the files with js or jsx extensions in the src directory
    "./src/*/*.{js,jsx}", // "*" means all
    "./src/*/*/*.{js,jsx}",
    "./src/*/*/*/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
