<template>
  <div id="browser-navbar">
    <div class="control">
      <button @click="onClickHome">Home</button>
      <button @click="onClickBack" :disabled="!canGoBack">Back</button>
      <button @click="onClickForward" :disabled="!canGoForward">Forward</button>
      <button @click="onClickReload">Reload</button>
    </div>
    <input @keyup.enter="onSelect" v-model="inputValue">
  </div>
</template>

<script>
  export default {
    data() {
      return {
        canGoBack: false,
        canGoForward: false,
        inputValue: '',
      };
    },
    methods: {
      onClickHome() {
        // check if we have handleSelect method defined in BrowserMainView
        if (this.$parent.handleSelect) {
          // if so, then delegating to BrowserMainView
          this.$parent.handleSelect('https://github.com/qazbnm456/browser-prototype');
        }
      },
      onClickBack() {
        // check if we have onClickBack method defined in BrowserMainView
        if (this.$parent.onClickBack) {
          // if so, then delegating to BrowserMainView
          this.$parent.onClickBack();
        }
      },
      onClickForward() {
        // check if we have onClickForward method defined in BrowserMainView
        if (this.$parent.onClickForward) {
          // if so, then delegating to BrowserMainView
          this.$parent.onClickForward();
        }
      },
      onClickReload() {
        // check if we have onClickReload method defined in BrowserMainView
        if (this.$parent.onClickReload) {
          // if so, then delegating to BrowserMainView
          this.$parent.onClickReload();
        }
      },
      onSelect() {
        // get the value from input field
        const value = event.target.value;
        if (value) {
          // check if we have handleSelect method defined in BrowserMainView
          if (this.$parent.handleSelect) {
            // if so, then delegating to BrowserMainView
            this.$parent.handleSelect(value);
          }
        }
      },
    },
  };
</script>

<style scoped>
  #browser-navbar {
    display: flex;
    height: 27px;
  }

  #browser-navbar > .control {
    width: 200px;
    display: flex;
  }

  #browser-navbar > .control > button {
    flex: 1
  }

  #browser-navbar > input {
    flex: 1;
  }
</style>
