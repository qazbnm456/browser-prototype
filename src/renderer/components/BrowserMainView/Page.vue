<template>
  <div>
    <webview ref="webview"></webview>
  </div>
</template>

<script>
  export default {
    methods: {
      navigateTo(value) {
        const webview = this.$refs.webview;
        if (webview) {
          // if we want to navigate to somewhere,
          // we just assign the value to the src attribute of the webview element
          webview.setAttribute('src', value);
        }
      },
    },
    mounted() {
      // get the webview by its reference id
      const webview = this.$refs.webview;
      if (webview) {
        // if we want to navigate to somewhere,
        // we just assign the value to the src attribute of the webview element
        this.navigateTo('https://github.com/qazbnm456/browser-prototype');
      }
    },
  };
</script>

<style scoped>
  webview {
    height: calc(100vh - 27px);
    width: 100vw;
    outline: none;
    position: relative;
  }
  webview[hidden] {
    flex: 0 1;
    width: 0px;
    height: 0px !important;
  }
  webview.fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 99;
  }
  /* hack to work around display: none issues with webviews */
  webview.hidden {
    flex: 0 1;
    width: 0px;
    height: 0px !important;
  }
</style>
