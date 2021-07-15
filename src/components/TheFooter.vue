<template>
  <md-app md-waterfall md-mode="fixed">
    <md-app-toolbar class="the-footer-toolbar">
      <span class="md-caption"
        >© {{ new Date().getFullYear() }} Christian Mingo - Technical
        Assessment, All rights reserved.</span
      >
    </md-app-toolbar>
  </md-app>
</template>

<script>
export default {
  name: "TheFooter",
};
</script>

<style scoped>
.the-footer-toolbar {
  justify-content: center;
}
</style>