<script>
import { RouterLink, RouterView } from "vue-router";
import{mapState, mapActions} from 'pinia'
import counter from '../stores/counter'
export default {
  data() {
    return {
      // headerStyle:true,
      account:true,  //登入狀態
      dataList: [],
      h1:null
    };
  },
  methods: {
    signOut() {
      this.$router.push("/"),
        this.account = false
    },
    h1(){
      if(this.setLocation(num===16)){
        headerShow=true
      }
    }
  },
  // methods: {
  //   //連接搜尋的API
  //   search() {
  //     console.log(this.searchData)
  //     fetch('http://localhost:8080/api/search_commodity', {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         name: this.searchData
  //       })
  //     })
  //       .then(response => response.json())
  //       .then(data => {
  //         this.dataList = data;
  //         console.log(this.dataList)
  //       })
  //       .catch(error => console.log(error))
  //     console.log()
  //   },
  // },
  components: {
    RouterLink,
  },
  computed:{
        ...mapState(counter, ["location", "locationInfo"])
    }
};
</script>
<template>
    <div class="headerShow">
      <!-- <span>{{ locationInfo }}</span> -->
      <!-- 搜尋欄 -->
      <div class="searchBar" >
        <i class="fa-solid fa-magnifying-glass" @click="this.search()"></i>
        <input type="search" class="searchInput" v-model="searchData">
      </div>

      <div class="isLogIn" v-if="account">
        <!-- 已登入 -->
        <button type="button" class="signOut" @click="this.signOut()">登出</button>
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
.headerShow {
  width: 100%;
  height: 10vh;
  background-color: #F9B572;
  position: fixed;
  z-index: 5;
  .searchBar{
    width: 20%;
    height: 70%;
    position: relative;
    left: 15vw;
    font-size: 30px;
    i {
      position: absolute;
      color: #e6e1c8;
      top: 35%;
      left: 3%;
      z-index: 5;

    }
    .searchInput {
      padding: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 15%;
      text-indent: 15%;
      border-radius: 15px;
      border: 0;
      background-color: #FAF8ED;
      font-size: 25px;
    }
  }

  .isLogIn {
    .signOut {
      position: absolute;
      color: #FAF8ED;
      background-color: transparent;
      border: 0;
      font-size: 30px;
      right: 14vw;
      top: 20%;
      padding: 0;
    }
  }

  .notLogin {
    .register {
      position: absolute;
      text-decoration: none;
      color: #FAF8ED;
      font-size: 30px;
      right: 23vw;
      top: 20%
    }

    .logIn {
      position: absolute;
      text-decoration: none;
      color: #FAF8ED;
      font-size: 30px;
      right: 14vw;
      top: 20%
    }
  }
}
</style>
