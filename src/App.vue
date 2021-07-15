<template>
  <div id="app">
    <div class="page-container">
        <TheHeader />
        <TheBody />
        <TheFooter />
    </div>
  </div>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
import TheBody from "./components/TheBody.vue";
import TheFooter from "./components/TheFooter.vue";

export default {
  name: "App",
  components: {
    TheHeader,
    TheBody,
    TheFooter,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}
</style>
