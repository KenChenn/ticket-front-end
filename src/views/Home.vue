<script>
import { mapState, mapActions } from 'pinia';
import counter from '../stores/counter';
export default {
  data() {
    return {
      ...mapState(counter, ['dataList']),
      searchData: "",
      dataList:[],
      selectedTab: '1'
    }
  },
  computed: {
  },
  methods: {
    ...mapActions(counter, ["saveSearchData"]),
    tabChange() {
},
    selectTab(tab) {
      this.selectedTab = tab;
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

    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"
          aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
          aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
          aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="../../public/material/ヘッダー_kktix_1200-630_medium.png" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="../../public/material/3-4_1200X630_V3_medium.png" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="../../public/material/雨的遊行_medium.png" class="d-block w-100" alt="...">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>


  <!-- 下方導行列 -->
  <div class="navigate">
    <RouterLink to="/Popular" value="1" :class="{ 'active': this.selectedTab == '1' }" @click="selectTab('1')">
      熱門活動
    </RouterLink>
    <RouterLink to="/Soon" value="2" :class="{ 'active': this.selectedTab === '2' }" @click="selectTab('2')">
      即將開始
    </RouterLink>
  </div>
  <div class="routeArea">
    <RouterView />
  </div>

  <div class="footer">
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
.bgCarousel {

  position: fixed;
  top:10vh;
  width: 100%;
  z-index: 0;
  // opacity: 0.2;

  .carousel-inner {
    width: 100%;
    height: 80vh;
  }

  .carousel-item {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-repeat: no-repeat;
  }
}

.navigate {
  width: 100%;
  height: 10vh;
  margin-top: 80vh;
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

  //position: relative;
  //z-index: 5;
  // border: 1px solid black;
  a {
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
    font-size: 4dvh;
    text-decoration: none;
  }

  .active {
    background-color: #99B080;
  }


.routeArea{
  position: relative;
  z-index: 5;
}
.footer {
  position: relative;
  z-index: 5;
  width: 100%;
  height: 10vh;
  background-color: #faf8ed;
}</style>
