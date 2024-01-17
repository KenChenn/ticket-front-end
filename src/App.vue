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
// .header {
//   width: 100%;
//   height: 10vh;
//   background-color: #f9b572;
//   display: flex;
//   justify-content: center;
//   margin: 0;
//   padding: 0;
//   box-sizing: border-box;
// } 

.content {
  width: 100%;
  height: 100vh;
  background-color: #FAF8ED;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

</style>
