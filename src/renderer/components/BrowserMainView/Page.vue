<template>
  <div>
    <webview ref="webview"></webview>
  </div>
</template>

<script>
  export default {
    mounted() {
      const webview = this.$refs.webview;
      if (webview) {
        webview.setAttribute('src', 'https://github.com/qazbnm456/browser-prototype');
      }
    },
  };
</script>

<style scoped>
  webview {
    height: 100vh;
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
