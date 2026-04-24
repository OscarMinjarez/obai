module.exports = {
  presets: [require('../../libs/shared/tailwind.config.cjs')],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', '../../libs/shared/src/**/*.{vue,js,ts,jsx,tsx}']
}