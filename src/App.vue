<template>
  <div id="app">
    <router-view/> 
  </div>
</template>

<script>
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  mounted () {
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      })
    }
  }
};
</script>

<style>
 
#app {
  width: 100%;
  height: 100%;
} 
</style>
