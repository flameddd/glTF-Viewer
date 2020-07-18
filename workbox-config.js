/* eslint-env node */
export const workboxConfig = {
  globDirectory: 'public/',
  globPatterns: ['**/*.{jpg,png,css,js,html,json}'],
  swDest: 'public/sw.js',
  sourcemap: false,
  inlineWorkboxRuntime: true,
  cleanupOutdatedCaches: true,
  runtimeCaching: [
    {
      urlPattern: /\.(?:png|jpg|jpeg|html|css|js|json)$/,
      handler: 'NetworkFirst',
      options: {
        networkTimeoutSeconds: 3,
      },
    },
  ],
};

export default workboxConfig;
