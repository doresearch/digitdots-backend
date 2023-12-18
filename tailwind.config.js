const repeatMap = (times, step) => {
  const result = {}
  for (let i = 0; i < times; i += step) {
    result[i] = i / 4 + 'rem'
  }
  return result
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
    },
  },
  plugins: [],
}
