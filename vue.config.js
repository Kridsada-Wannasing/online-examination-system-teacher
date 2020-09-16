module.exports = {
  transpileDependencies: ["vuetify"],
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/scss/_index.scss"`
        // additionalData: `@import "~@/scss/_index.scss";`
      }
    }
  }
};
