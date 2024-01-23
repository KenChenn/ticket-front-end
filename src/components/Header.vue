<script>
import { RouterLink, RouterView } from "vue-router";
import counter from '../stores/counter'
import { Value } from "sass";
export default {
  data() {
    return {
      isLogIn: false,  //登入狀態(已登入的狀態，記得關!!)
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
              this.isLogIn = false
          }
        })
        .catch(error => console.log(error))
    },
    toUserInfoPage(){
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
          this.isLogIn = false
        }
        if(res.rtncode =="SUCCESSFUL"){
          this.isLogIn = true
        }
      })
  },
  // created() {
  //   console.log($cookies.get("account"))
  //   if ($cookies.get("account") != null) {
  //     this.isLogIn = true
  //   }
  // }
};
</script>
<template>
  <div class="headerShow">

    <!-- 管理者 -->
    <div class="manager" v-if="manager">
      <RouterLink to="/ActivityAndHostPage" class="managerHomePage">回首頁</RouterLink>
      <button type="button" @click="this.signOut()" class="signOut">登出</button>
    </div>

    <!-- 使用者 -->
    <div class="user" v-if="user">
      <RouterLink to="/" class="homePage">回首頁</RouterLink>

      <!-- 已登入 -->
      <div class="isLogIn" v-if="isLogIn">
        <i class="fa-solid fa-circle-user" @click="toUserInfoPage"></i>
        <RouterLink to="/FavoratePage" class="favoratePage">最愛清單</RouterLink>
        <RouterLink to="/OrderTracking" class="orderTracking">訂單查詢</RouterLink>
        <button type="button" @click="this.signOut()" class="signOut">登出</button>
      </div>

      <!-- 未登入 -->
      <div class="notLogin" v-else>
        <RouterLink to="/SignupPage" class="signupPage">註冊</RouterLink>
        <RouterLink to="/LoginPage" class="loginPage">登入</RouterLink>
      </div>
    </div>



  </div>
</template>

<style scoped lang="scss">
.headerShow {
  width: 30%;
  height: 10vh;
  right: 15%;
  background-color: #44ff00;
  // background-color: #F9B572;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;

  // border: 1px black solid;

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

    .homePage {
      width: 15%;
      text-decoration: none;
      color: #FAF8ED;
      font-size: 3dvh;
      // border: 1px black solid;
    }

    .isLogIn {
      height: 100%;
      width: 75%;
      margin-left: 10%;
      justify-content: space-between;
      display: flex;
      align-items: center;

      i{
        font-size: 3dvh;
        color: #FAF8ED;
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
      width: 26%;
      height: 100%;
      margin-left: 59%;
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
}
</style>
