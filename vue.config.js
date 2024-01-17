const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  pwa: {
    name: "Absences Test",
    themeColor: "#ffd100"
  },
  transpileDependencies: true,
  productionSourceMap: false,
});
