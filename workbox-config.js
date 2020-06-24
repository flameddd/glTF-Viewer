/* eslint-env node */
module.exports = {
  globDirectory: 'public/',
  globPatterns: ['**/*.{png,css,js,html,json}'],
  runtimeCaching: [
    {
      urlPattern: /\.(?:css|js|json)$/,
      handler: 'NetworkFirst',
    },
  ],
  swDest: 'public/sw.js',
  sourcemap: false,
  inlineWorkboxRuntime: true,
};
