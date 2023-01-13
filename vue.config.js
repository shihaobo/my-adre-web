const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: process.env.VUE_APP_WEB_BASE_URL,
  transpileDependencies: true,
  productionSourceMap: false,
  devServer: {
    host: "localhost",
    port: "8090",
    onBeforeSetupMiddleware: require("./mock/index.js"),
    proxy: {
      [process.env.VUE_APP_BASE_URL]: {
        target: "http://api-plus-dev.sany.com.cn",
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          "^/change/api": "",
        },
      },
    },
    hot: true,
    open: true,
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "人事变动2";
      return args;
    });
  },
});
