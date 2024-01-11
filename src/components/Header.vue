<script>
import { RouterLink, RouterView } from "vue-router";
export default {
  data() {
    return {
      // account:true,
    };
  },
  methods:{
    signOut(){
      this.$router.push("/"),
      this.account = false
    }
  },
  mounted(){

  },
  components: {
    RouterLink,
  },
};
</script>
<template>

  <div class="headerShow">
    <!-- 搜尋欄 -->
    <div class="searchBar">
      <i class="fa-solid fa-magnifying-glass" @click="search"></i>
      <input type="search" class="searchInput">
    </div>

    <div class="isLogIn" v-if="account"> 
      <!-- 已登入 -->
      <button type="button" class="signOut" @click="signOut">登出</button>
      <!-- <RouterLink to="/" class="signOut" >登出</RouterLink> -->
    </div>
    <div class="notLogin" v-else>
      <!-- 未登入 -->
      <RouterLink to="/SignupPage" class="register">註冊</RouterLink>
      <RouterLink to="/LoginPage" class="logIn">登入</RouterLink>
    </div>
  </div>

</template>

<style scoped lang="scss">
.headerShow{
  width: 100%;
  height: 10vh;
  margin-top: 0;
  background-color: #F9B572;
  position: fixed;
  top: 0;
  z-index: 5;
  .searchBar{
    .fa-solid{
      position: absolute;
      font-size: 30px;
      left: 15.5%;
      top: 30%;
      color: #E6E1C8;
      z-index: 10;
    }
    .searchInput{
      position: absolute;
      width: 17%;
      height: 70%;
      top: 15%;
      left: 15%;
      padding-left: 3%;
      border-radius: 15px;
      border: 0 ;
      background-color: #FAF8ED;
      font-size: 25px;
    }
  }
  .isLogIn{
    .signOut{
      position: absolute;
      color: #FAF8ED;
      background-color: transparent;
      border: 0;
      font-size: 30px;
      right: 14%;
      top: 20%;
      padding: 0;
    }
  }
  .notLogin{
    .register{
      position: absolute;
      text-decoration: none;
      color: #FAF8ED;
      font-size: 30px;
      right: 21%;
      top: 20%
    }
    .logIn{
      position: absolute;
      text-decoration: none;
      color: #FAF8ED;
      font-size: 30px;
      right: 14%;
      top: 20%
    }
  }
}

</style>
