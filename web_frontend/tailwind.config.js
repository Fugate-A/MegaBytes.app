/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'page-background': "url('/public/bg1.JPG')",
      }),
      maxHeight: {
        '70vh': '70vh',
      },
      image: {
        'logo': "url('/public/cook.png')"
      },
      height: {
        '95': '91.4vh',
      },
      width: {
        'cus': '59.333333%'
      },
      borderWidth: {
        '1':'1px',
        '3':'3px'
      },
      colors: {
        "#E79B11": '#E79B11',
        '#ffe4bf': '#ffe4bf',
        '#FFE6C5': '#FFE6C5',
        '#4CAF50': '#4CAF50',
        '#DAE2DB': '#DAE2DB',
        '#FFA07A': '#FFA07A',
        '#90EE90': '#90EE90',
        '#FF6347': '#FF6347',
        '#FFD700': '#FFD700',
        '#BA55D3': '#BA55D3',
        '#00CED1': '#00CED1',
        '#2E8B57': '#2E8B57',
        '#FF8C00': '#FF8C00',
        '#008000': '#008000',
        '#FF4500': '#FF4500',
        '#98FB98': '#98FB98',
        '#FF6347': '#FF6347',
        '#87CEEB': '#87CEEB',
        '#A52A2A': '#A52A2A',
        '#1E90FF': '#1E90FF',
        '#FFA500': '#FFA500',
        '#CD5C5C': '#CD5C5C',
        '#FFD700': '#FFD700',
        '#228B22': '#228B22',
        '#FFA500': '#FFA500',
        '#4169E1': '#4169E1',
        '#008080': '#008080',
        '#FF4500': '#FF4500',
        '#32CD32': '#32CD32',
        '#FF6347': '#FF6347',
        '#FFA07A': '#FFA07A',
      },
      plugins: [],
    }
  }
}
