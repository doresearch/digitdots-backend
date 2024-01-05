const repeatMap = (times, step) => {
  const result = {}
  for (let i = 0; i < times; i += step) {
    result[i] = i / 4 + 'rem'
  }
  return result
}

const color = {
  info: '#7f7f8e',
  success: '#f0f9eb',
  danger: '#f56c6c',
  'success-light': '#f0f9eb',
  'success-dark': '#67c23a',
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,vue,js}'],
  theme: {
    extend: {
      width: repeatMap(500, 1),
      height: repeatMap(500, 1),
      margin: repeatMap(500, 1),
      padding: repeatMap(500, 1),
      color,
      textColor: color,
      backgroundColor: color,
    },
  },
  plugins: [],
}
