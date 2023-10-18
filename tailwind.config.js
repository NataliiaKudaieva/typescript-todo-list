module.exports = {
  mode: 'jit',
  content: ['./public/*.{html,css}'],
  purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
  // specify other options here
};
