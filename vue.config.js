const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  devServer: {
    host: "0.0.0.0",
    port: "8090",
    onBeforeSetupMiddleware: require("./mock/index.js"),
    // proxy: {
    //   "/": {
    //     target: "http://localhost:3000",
    //   },
    // },
    hot: true,
    open: true,
  },
});
