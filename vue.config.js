module.exports = {
  configureWebpack: {
    devServer: {
      disableHostCheck: true
    }
  },
  pwa: {
    name: "My App",
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "src/service-worker.js"
    }
  }
};
