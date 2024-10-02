/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        popins:"Poppins, sans-serif",
        sans:"Open Sans, sans-serif",
        cursive:"Dancing Script, cursive"
      },
      boxShadow:{
        btnshadow1:"0px 4px 61px 0px rgba(77, 71, 195, 0.40)",
        otpShadow:"rgba(0, 0, 0, 0.16) 0px 1px 4px",
        bottomNav:"rgba(0, 0, 0, 0.24) 0px 3px 8px",
        productShadow:"rgba(0, 0, 0, 0.1) 0px 4px 12px",
        sellerProfileBox:"rgba(149, 157, 165, 0.2) 0px 8px 24px"
      }
    },
  },
  plugins: [],
}