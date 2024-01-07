<script>
import { RouterLink, RouterView } from 'vue-router'
import Header from "./components/Header.vue";
export default {
  components: {
    Header,
  }
};
</script>

<template>
  <div class="header">
  <Header />
  </div>

  <div class="content">
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
.header {
  width: 100vw;
  height: 10vh;
  background-color: #f9b572;
  display: flex;
  justify-content: center;
}

.content {
  width: 100vw;
  height: 90vh;
  background-color: #FAF8ED;
}
</style>
