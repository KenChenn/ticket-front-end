<script>
import { RouterLink, RouterView } from "vue-router";
import counter from '../stores/counter'
import { Value } from "sass";
export default {
  data() {
    return {
      account: false,  //登入狀態(已登入的狀態，記得關!!)
      dataList: [],
    };
  },
  methods: {
    signOut() {
      fetch('http://localhost:8080/api/logout', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include'
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          if (data.rtncode == "SUCCESSFUL") {
            $cookies.remove("account");
            this.$router.push("/"),
              this.account = false
          }
        })
        .catch(error => console.log(error))
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
  },
  mounted() {
    fetch('http://localhost:8080/api/get_user_basic_data',
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({
          account: $cookies.get("account"),
        }),
      }).then(response => response.json())
      .then(res => {
        console.log($cookies.get("account"))
        if (res.rtncode == "SUCCESSFUL") {
          this.account = true
        }
      })
  }
};
</script>
<template>
  <div class="headerShow">
    <!-- 搜尋欄 -->
    <!-- <div class="searchBar" v-if="headerSearch">
      <input type="search" class="searchInput" v-model="searchData">
      <i class="fa-solid fa-magnifying-glass" @click="this.search()"></i>
    </div> -->

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
  width: 30%;
  height: 10vh;
  position: absolute;
  right: 15%;
  // background-color: #44ff00;
  background-color: #F9B572;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;

  // border: 1px black solid;

  // .searchBar {
  //   position: relative;
  //   width: 25%;
  //   height: 60%;
  //   left: 15%;
  //   font-size: 3dvh;

  //   .searchInput {
  //     width: 80%;
  //     height: 100%;
  //     border-radius: 1vh;
  //     border: 0;
  //     background-color: #FAF8ED;
  //     font-size: 2.5dvh;

  //     &:focus {
  //       outline: none;
  //     }
  //   }

  //   i {
  //     margin-left: 5%;
  //     color: #FAF8ED;
  //     z-index: 5;
  //   }
  // }

  .isLogIn {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;

    // border: 1px black solid;
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
      // border: 1px black solid;

    }

    .orderTracking {
      text-decoration: none;
      color: #FAF8ED;
      font-size: 3dvh;
      // border: 1px black solid;
    }

    .signOut {
      color: #FAF8ED;
      background-color: transparent;
      font-size: 3dvh;
      border: 0;
      margin-left: 10%;

    }
  }

  .notLogin {
    width: 40%;
    height: 100%;
    margin-left: 60%;
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // border: 1px black solid;

    .register {
      text-decoration: none;
      color: #FAF8ED;
      font-size: 3dvh;
      // border: 1px black solid;

    }

    .logIn {
      text-decoration: none;
      color: #FAF8ED;
      font-size: 3dvh;
      // border: 1px black solid;

    }
  }
}
</style>
