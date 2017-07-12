<template>
  <div id="browser-navbar">
    <input @keyup.enter="onSelect">
  </div>
</template>

<script>
  export default {
    methods: {
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

  #browser-navbar > input {
    flex: 1;
  }
</style>
