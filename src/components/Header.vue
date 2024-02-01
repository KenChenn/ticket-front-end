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
      ...mapState(counter, ['isLogIn', 'username']),
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
        // console.log($cookies.get("account"))
        if (res.rtncode == "PARAM_ERROR") {
          counter().isLogIn = false
        }
        if (res.rtncode == "SUCCESSFUL") {
          counter().isLogIn = true
          counter().username = res.data.username
        }
      })
    console.log(counter().username);
    console.log(counter().isLogIn);
  },
};
</script>
<template>
  <div class="headerShow">

    <!-- 管理者 -->
    <div class="manager" v-if="manager">
      <RouterLink to="/ActivityAndHostPage" class="tag">管理頁</RouterLink>
      <button type="button" @click="this.adminSignOut()" class="signOut">登出 <i
          class="fa-solid fa-right-from-bracket"></i></button>
    </div>

    <!-- 使用者 -->
    <div class="user" v-if="user">
      <RouterLink to="/" class="tag">首頁 <i class="fa-solid fa-house tag"></i></RouterLink>

      <!-- 已登入 -->
      <div class="isLogIn" v-if="counter().isLogIn">
        <RouterLink to="/FavoratePage" class="tag">最愛清單 <i class="fa-solid fa-heart"></i></RouterLink>
        <RouterLink to="/OrderTracking" class="tag">訂單查詢 <i class="fa-solid fa-receipt"></i></RouterLink>
        <RouterLink to="/UserInfoPage" class="tag">{{ counter().username }} <i class="fa-solid fa-circle-user"></i>
        </RouterLink>
        <button type="button" @click="this.signOut()" class="signOut">登出 <i
            class="fa-solid fa-right-from-bracket"></i></button>
      </div>

      <!-- 未登入 -->
      <div class="notLogin" v-else>
        <RouterLink to="/SignupPage" class="tag">註冊 <i class="fa-solid fa-user-plus"></i></RouterLink>
        <RouterLink to="/LoginPage" class="tag">登入 <i class="fa-solid fa-right-to-bracket"></i></RouterLink>
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

    .signOut {
      color: #FAF8ED;
      background-color: transparent;
      font-size: 3dvh;
      transition: 0.1s linear;
      border: 0;

      &:hover {
        transition: 0.2s linear;
        scale: 1.15;
        color: #ffffff;
      }

      &:active {
        transition: 0.2s linear;
        scale: 0.95;
        color: #c26202;
      }
    }
  }

  .tag {
    text-decoration: none;
    color: #FAF8ED;
    font-size: 3dvh;

    // border: 1px black solid;
    &:hover {
      transition: 0.2s linear;
      scale: 1.15;
      color: #ffffff;
    }

    &:active {
      transition: 0.2s linear;
      scale: 0.95;
      color: #c26202;
    }
  }

  .user {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .isLogIn {
      width: 60%;
      height: 100%;
      justify-content: space-between;
      display: flex;
      align-items: center;

      .signOut {
        color: #FAF8ED;
        background-color: transparent;
        font-size: 3dvh;
        border: 0;
        padding: 0;
        transition: 0.1s linear;

        // border: 1px black solid;
        &:hover {
          transition: 0.2s linear;
          scale: 1.15;
          color: #ffffff;
        }

        &:active {
          transition: 0.2s linear;
          scale: 0.95;
          color: #c26202;
        }
      }
    }

    .notLogin {
      width: 20%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      // border: 1px black solid;
    }
  }
}
</style>
