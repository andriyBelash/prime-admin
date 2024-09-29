/** @type {import('tailwindcss').Config} */
export default {
  content: [
  ],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      'sidebar': 'rgb(19, 25, 32)',
      'main': '#111827',
      'blue': '#6293FF',
      'grey': 'rgb(137, 150, 164)',
      'hover-blue': 'rgba(98, 147, 255, 0.24)',
      'hover-grey': 'rgba(248, 249, 250, 0.05)',
      'card': 'rgb(29, 38, 48)',
      'border': 'rgba(248, 249, 250, 0.05)',
      'white': '#ffffff'
    }
  },
  plugins: [
  ]
}
