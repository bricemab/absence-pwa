const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  pwa: {
    name: "Module absences",
    themeColor: "#ffffff"
  },
  transpileDependencies: true,
  productionSourceMap: false,
});
