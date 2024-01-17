<script>
import { RouterLink, RouterView } from "vue-router";
import counter from '../stores/counter'
import { Value } from "sass";
export default {
  data() {
    return {
      account:true,  //登入狀態(已登入的狀態，記得關!!)
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
  computed:{
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
        <i class="fa-solid fa-magnifying-glass" @click="this.search()"></i>
        <input type="search" class="searchInput" v-model="searchData">
      </div>

      <div class="headerShow">
        <!-- 搜尋欄 -->
        <div class="searchBar">
          <i class="fa-solid fa-magnifying-glass" @click="search"></i>

          <!-- <input type="search" class="searchInput"> -->

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
        <button type="button" class="signOut" @click="this.signOut()">登出</button>
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
  .navigate {
    width: 70vw;
    height: 100%;
    font-size: 3vh;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .search {
      width: 20vw;
      height: 100%;
      display: flex;
      align-items: center;
      position: relative;

      // border: 1px black solid;
      i {
        color: #e6e1c8;
        position: absolute;
        margin-left: 0.5rem;
      }

      .searchBar {
        height: 60%;
        border: none;
        border-radius: 5px;
      }
    }

    .searchInput {
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
      padding-left: 15%;
      border-radius: 15px;
      border: 0;
      background-color: #FAF8ED;
      font-size: 25px;
    }
  }

  .isLogIn {
    .favoratePage{
      position: absolute;
      text-decoration: none;
      color: #FAF8ED;
      font-size: 30px;
      right: 37%;
      top: 20%
    }
    .orderTracking{
      position: absolute;
      text-decoration: none;
      color: #FAF8ED;
      font-size: 30px;
      right: 23%;
      top: 20%
    }
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
      right: 23%;
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
