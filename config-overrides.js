const { override, addWebpackAlias } = require('customize-cra')
const path = require('path')

module.exports = override(
  addWebpackAlias({
    '@api': path.resolve(__dirname, './src/api'),
    '@assets': path.resolve(__dirname, './src/assets'),
    '@components': path.resolve(__dirname, './src/components'),
    '@utils': path.resolve(__dirname, './src/utils'),
    '@hoc': path.resolve(__dirname, './src/hoc'),
    '@store': path.resolve(__dirname, './src/store'),
    '@typings': path.resolve(__dirname, './src/typings'),
  }),
)
