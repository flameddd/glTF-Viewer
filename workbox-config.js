/* eslint-env node */
export const workboxConfig = {
  globDirectory: 'public/',
  globPatterns: ['**/*.{png,css,js,html,json}'],
  swDest: 'public/sw.js',
  sourcemap: false,
  inlineWorkboxRuntime: true,
  cleanupOutdatedCaches: true,
};

export default workboxConfig;
