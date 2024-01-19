<script>
import { RouterLink, RouterView } from "vue-router";
import counter from '../stores/counter'
import { Value } from "sass";
export default {
  data() {
    return {
      account: true,  //登入狀態(已登入的狀態，記得關!!)
      dataList: [],
    };
  },
  methods: {
    signOut() {
      this.$router.push("/"),
        this.account = false
    },
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
  computed: {
    // 首頁顯示搜尋欄
    headerSearch() {
      return counter().headerSearch;
    },
    // 最愛清單 + 訂單查詢 連結
    headerLink() {
      return counter().headerLink;
    },
  }
};
</script>
<template>
    <div class="headerShow">
      <!-- 搜尋欄 -->
      <div class="searchBar" v-if="headerSearch">
        
        <input type="search" class="searchInput">
        <i class="fa-solid fa-magnifying-glass" ></i>
      </div>

    <div class="isLogIn" v-if="account">
      <!-- 已登入 -->
      <div class="link" v-if="headerLink">
        <RouterLink to="/FavoratePage" class="favoratePage">最愛清單</RouterLink>
        <RouterLink to="/OrderTracking" class="orderTracking">訂單查詢</RouterLink>
        <button type="button" @click="this.signOut()" class="signOut">登出</button>
      </div>
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
  display: flex;
  justify-content: space-between;
  align-items: center;

  .searchBar {
    position: relative;
    width: 25%;
    height: 60%;
    left: 15%;
    font-size: 3dvh;

    // border: 1px black solid;
    .searchInput {
      width: 80%;
      height: 100%;
      border-radius: 1vh;
      border: 0;
      background-color: #FAF8ED;
      font-size: 2.5dvh;

      &:focus {
        outline: none;
      }
    }

    i {
      margin-left: 5%;
      color: #FAF8ED;
      z-index: 5;
    }
  }

  .isLogIn {
    width: 20%;
    height: 100%;
    margin-right: 15%;
    display: flex;
    align-items: center;
    .link {
      height: 100%;
      width: 100%;
      justify-content: space-between;
      display: flex;
      align-items: center;
    }

    .favoratePage {
      text-decoration: none;
      color: #FAF8ED;
      font-size: 3dvh;
    }

    .orderTracking {
      text-decoration: none;
      color: #FAF8ED;
      font-size: 3dvh;
      // border: 1px black solid;
      // margin-left: 10%;
    }

    .signOut {
      color: #FAF8ED;
      background-color: transparent;
      font-size: 3dvh;
      border: 0;
      // margin-left: 10%;

    }
  }

  .notLogin {
    width: 10%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    right: 15%;
    .register {
      text-decoration: none;
      color: #FAF8ED;
      font-size: 3dvh;
    }

    .logIn {
      text-decoration: none;
      color: #FAF8ED;
      font-size: 3dvh;
    }
  }
}
</style>
