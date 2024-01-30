<script setup>
import counter from '../stores/counter'
import { mapState, mapActions } from 'pinia'

</script>

<script>
import { RouterLink, RouterView } from "vue-router";
import { Value } from "sass";
export default {
  data() {
    return {
      ...mapState(counter, ['isLogIn']),
      //登入狀態(已登入的狀態，記得關!!)
      // isLogIn: false, 
      dataList: [],
    };
  },
  computed: {

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
              counter().isLogIn = false
          }
        })
        .catch(error => console.log(error))
    },
    adminSignOut() {
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
            $cookies.remove("adminAccount");
            this.$router.push("/")
            // counter().isLogIn = false
          }
        })
        .catch(error => console.log(error))
    },
    toUserInfoPage() {
      this.$router.push("/UserInfoPage")
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
  computed: {
    manager() {  //管理者
      return counter().manager;
    },
    user() {  //使用者
      return counter().user;
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
        console.log(res)
        console.log($cookies.get("account"))
        if (res.rtncode == "PARAM_ERROR") {
          counter().isLogIn = false
        }
        if (res.rtncode == "SUCCESSFUL") {
          counter().isLogIn = true
        }
      })
    console.log(counter().isLogIn);
  },
};
</script>
<template>
  <div class="headerShow">

    <!-- 管理者 -->
    <div class="manager" v-if="manager">
      <RouterLink to="/ActivityAndHostPage" class="managerHomePage">管理頁</RouterLink>
      <button type="button" @click="this.adminSignOut()" class="signOut">登出 <i
          class="fa-solid fa-right-from-bracket"></i></button>
    </div>

    <!-- 使用者 -->
    <div class="user" v-if="user">
      <RouterLink to="/" class="homePage">首頁 <i class="fa-solid fa-house"></i></RouterLink>

      <!-- 已登入 -->
      <div class="isLogIn" v-if="counter().isLogIn">
        <RouterLink to="/FavoratePage" class="favoratePage">最愛清單 <i class="fa-solid fa-heart"></i></RouterLink>
        <RouterLink to="/OrderTracking" class="orderTracking">訂單查詢 <i class="fa-solid fa-receipt"></i></RouterLink>
        <RouterLink to="/UserInfoPage" class="orderTracking">會員 <i class="fa-solid fa-circle-user"></i>
        </RouterLink>
        <button type="button" @click="this.signOut()" class="signOut">登出 <i
            class="fa-solid fa-right-from-bracket"></i></button>
      </div>

      <!-- 未登入 -->
      <div class="notLogin" v-else>
        <RouterLink to="/SignupPage" class="signupPage">註冊 <i class="fa-solid fa-user-plus"></i></RouterLink>
        <RouterLink to="/LoginPage" class="loginPage">登入 <i class="fa-solid fa-right-to-bracket"></i></RouterLink>
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
.headerShow {
  width: 70%;
  height: 10vh;
  right: 15%;
  // background-color: #44ff00;
  background-color: #F9B572;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 5;

  .manager {
    width: 100%;
    height: 100%;
    justify-content: space-between;
    display: flex;
    align-items: center;

    .managerHomePage {
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
      padding: 0;
    }
  }

  .user {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .homePage {
      width: 15%;
      text-decoration: none;
      color: #FAF8ED;
      font-size: 3dvh;
      // border: 1px black solid;
    }

    .isLogIn {
      width: 60%;
      height: 100%;
      justify-content: space-between;
      display: flex;
      align-items: center;
      // border: 1px black solid;

      i {
        font-size: 3dvh;
        color: #FAF8ED;
        cursor: pointer;
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
        padding: 0;
      }
    }

    .notLogin {
      width: 20%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      // border: 1px black solid;
      .signupPage {
        text-decoration: none;
        color: #FAF8ED;
        font-size: 3dvh;
        // border: 1px black solid;
      }

      .loginPage {
        text-decoration: none;
        color: #FAF8ED;
        font-size: 3dvh;
        // border: 1px black solid;
      }
    }
  }
}</style>
