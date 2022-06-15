const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "/src/styles/_variables.scss";',
      },
    },
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/multiselect-province-vuejs/' : '/',
});
