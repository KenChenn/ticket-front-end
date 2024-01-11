<script>
import { RouterLink, RouterView } from "vue-router";
export default {
  data() {
    return {
      searchData:"",
      dataList:[

      ]
    };
  },
  methods: {
    //連接搜尋的API
    search() {
            console.log(this.searchData)
            fetch('http://localhost:8080/api/search_commodity', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: this.searchData
                })
            })
                .then(response => response.json())
                .then(data => {
                    this.dataList = data;
                    console.log(this.dataList)
                })
                .catch(error => console.log(error))
            console.log()
        },
  },
  components: {
    RouterLink,
  },
};
</script>
<template>
  <div class="headerShow">
    <div class="navigate">
      <!-- 搜尋欄 -->
      <div class="search">
        <i class="fa-solid fa-magnifying-glass" @click="this.search()"></i>
        <input type="text" class="searchBar" v-model="searchData">
      </div>

      <!-- 註冊/登入 -->
      <div class="account">
        <RouterLink to="/SignupPage" class="link">註冊</RouterLink>
        <RouterLink to="/LoginPage" class="link">登入</RouterLink>
      </div>
    </div>


  </div>
</template>

<style scoped lang="scss">
.headerShow {
  .navigate {
    width: 70vw;
    height: 100%;
    font-size: 1.5rem;
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

    .account {
      width: 20vw;
      height: 50%;
      display: flex;
      justify-content: space-around;

      // border: 1px black solid;
      a {
        color: #FAF8ED;
        text-decoration: none;
      }

    }
  }
}
</style>
