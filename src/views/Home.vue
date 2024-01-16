<script>
import { mapState, mapActions } from 'pinia';
import counter from '../stores/counter';
export default {
  data() {
    return {
      ...mapState(counter, ['dataList']),
      searchData: "",
      dataList:[]
    }
  },
  computed: {
  },
  methods: {
    ...mapActions(counter, ["saveSearchData"]),
    tabChange() {

    },
    go() {
      this.$router.push('/LoginPage')
    },
    goUserInfo() {
      this.$router.push('/UserInfoPage')
    },
    goCreateHost() {
      this.$router.push('/CreateHost')
    },
    goEditHost() {
      this.$router.push('/EditHost')
    },
    goBuyTicketPage() {
      this.$router.push('/BuyTicketPage')
    },
    //連接搜尋的API
    search() {
      console.log("123")

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
          console.log(data.commodityList);
          this.dataList = data.commodityList;
          this.saveSearchData(this.dataList)
          console.log(this.dataList)
          // 將資料存儲到 Local Storage 中，使用 'searchData' 作為鑰匙
          localStorage.setItem('searchDataList', this.dataList);
        })
        .catch(error => console.log(error))
      //   console.log(this.dataList);

      // setTimeout(() => {
      //   console.log(this.dataList);
      // }, 1000);
      
    },
  },
  mounted() {

  }
}
</script>

<template>
  <!-- <button type="button" @click="this.go()">去登入</button>
<button @click="this.goUserInfo()">去個資頁</button> -->
  <!-- <button @click="this.goCreateHost">去建立主辦單位頁</button>
  <button @click="this.goEditHost">去編輯主辦單位頁</button>
  <button @click="this.goBuyTicketPage">去購票頁</button> -->

  <div class="header">
    <i class="fa-solid fa-magnifying-glass" @click="this.search()"></i>
    <input type="text" class="search" v-model="searchData">
    <button type="button" class="signinBtn">註冊</button>
    <button type="button" class="logininBtn">登入</button>
  </div>

  <div class="bgCarousel">
    <el-carousel height="auto" autoplay>
      <el-carousel-item style="height: 80vh">
        <h3 class="small justify-center" text="2xl">height 100px</h3>
      </el-carousel-item>
      <el-carousel-item style="height: 80vh">
        <h3 class="small justify-center" text="2xl">height 200px</h3>
      </el-carousel-item>
      <el-carousel-item style="height: 80vh">
        <h3 class="small justify-center" text="2xl">height 300px</h3>
      </el-carousel-item>
    </el-carousel>

    <!-- 下方導行列 -->
    <div class="navigate">
      <RouterLink to="/Popular" active-class="active">
        熱門活動
      </RouterLink>

      <RouterLink to="/Soon" active-class="active">
        即將開始
      </RouterLink>

    </div>
    <RouterView />

    <div class="footer">

    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 10vh;
  background-color: #F9B572;
  position: relative;

  .fa-magnifying-glass {
    position: absolute;
    font-size: 1.5rem;
    color: #E6E1C8;
    top: 30%;
    left: 28.5%;
  }

  .search {
    height: 60%;
    width: 20%;
    background-color: #FAF8ED;
    border: 1pt solid #FAF8ED;
    border-radius: 5px;
    margin-left: 28%;
  }

  .signinBtn {
    background-color: #F9B572;
    border: 1pt solid #F9B572;
    margin-top: 0.5%;
    font-size: 1.3rem;
    color: #FAF8ED;
    margin-left: 20%;
    margin-right: 5%;
  }

  .logininBtn {
    background-color: #F9B572;
    border: 1pt solid #F9B572;
    margin-top: 0.5%;
    font-size: 1.3rem;
    color: #FAF8ED;
  }
}

.el-carousel-item {
  background-size: cover;
  background-attachment: fixed;
  overflow-x: hidden;
}

.carousel-item {
  color: #475669;
  opacity: 0.75;
  margin: 0;
  text-align: center;
}

.el-carousel-item {
  // color: #475669;
  // opacity: 0.75;
  // display: flex;
  // align-items: center;
  // margin: 0;
  // text-align: center;
  // height: 100%;
  background-attachment: fixed;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.navigate {
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: center;
}

.navigate a {
  width: 20%;
  height: 100%;
  margin-left: 2%;
  margin-right: 2%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px 30px 0 0;
  background-color: #748e63;
  color: #faf8ed;
  font-size: 2rem;
  text-decoration: none;
}

// border: 1px solid black;
.navigate a.active {
  background-color: #99B080;
}


.footer {
  width: 100%;
  height: 10vh;
  background-color: #faf8ed;
}</style>
