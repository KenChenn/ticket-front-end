<script>
import { mapState, mapActions } from 'pinia';
import counter from '../stores/counter';
export default {
  data() {
    return {
      ...mapState(counter, ['dataList']),
      searchData: "",
      dataList: [],
      slideShowData: [],
      selectedTab: '1',
      codename: "/Detail/", // /原本的/變數內容
    }
  },
  computed: {
    ...mapState(counter, ['dataList']),
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
          // console.log(data.commodityList);
          if (this.slideShowData.length === 0) {
            this.slideShowData = data.commodityList;
          }
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
    this.search()
  },
  created() {
    // 創建頁面時設定
    counter().setUser({});
  },
  beforeRouteLeave(to, from, next) {
    // 離開頁面時清除
    counter().setUser(null);
    next();
  },
}
</script>

<template>
  <!-- <button type="button" @click="this.go()">去登入</button>
<button @click="this.goUserInfo()">去個資頁</button> -->
  <!-- <button @click="this.goCreateHost">去建立主辦單位頁</button>
  <button @click="this.goEditHost">去編輯主辦單位頁</button>
  <button @click="this.goBuyTicketPage">去購票頁</button> -->

  <div class="header">
    <div class="search">
      <input type="text" class="search" v-model="searchData">
      <div class="searchBtn">
        <i class="fa-solid fa-magnifying-glass" @click="this.search()"></i>
      </div>
    </div>
  </div>

  <!-- <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
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
        <img src="../../public/material/雨的遊行_medium.png" class="d-block w-100" alt="...">
      </div>
      <div class="carousel-item">
        <img src="../../public/material/ヘッダー_kktix_1200-630_medium.png" class="d-block w-100" alt="...">
      </div>
      <div class="carousel-item">
        <img src="../../public/material/ヘッダー_kktix_1200-630_medium.png" class="d-block w-100" alt="...">
      </div>
    </div>
  </div> -->

  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button v-for="(item, index) in slideShowData" type="button" :key="index"
        data-bs-target="#carouselExampleIndicators" :data-bs-slide-to="index" :class="{ 'active': index === 0 }"
        aria-current="true" aria-label="Slide {{ index + 1 }}"></button>
    </div>
    <div class="carousel-inner">
      <div v-for="(item, index) in slideShowData" :key="index" :class="{ 'carousel-item': true, 'active': index === 0 }">
        <RouterLink :to="codename" class="show" @click="this.codename = this.codename + item.codename">
          <span @click="this.codename = this.codename + item.codename">
            {{ item.name }}
          </span>
          <div class="showImg" @click="this.codename = this.codename + item.codename">
            <img :src="item.keyvisualImg" class="d-block w-100" alt="...">
          </div>
        </RouterLink>
      </div>
    </div>
    <div class="showName">

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
  height: 10vh;
  width: 20%;
  margin-left: 15%;
  z-index: 5;
  position: absolute;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  // border: black solid 1px;
  background-color: #F9B572;


  .search {
    width: 90%;
    height: 80%;
    font-size: 2.5dvh;
    border: 0;
    border-radius: 1vh;
    display: flex;
    align-items: center;

    &:focus {
      outline: none;
    }

    .searchBtn {
      font-size: 4dvh;
      margin: 3%;
      color: #faf8ed;

      i:hover {
        transition: 0.1s linear;
        scale: 1.1;
        color: #ffffff;
      }

      i:active {
        scale: 0.95;
        color: #c26202;
      }
    }
  }
}

.carousel-inner {
  width: 100%;
  height: 80vh;
  top: 10vh;
  position: fixed;
  display: flex;
  align-items: center;
  z-index: -1;
  background-color: #000000a9;
}

.carousel-item {
  // border: 1px solid black;
  width: 100%;
  height: 90%;

  :hover {
    transition: 0.3s;
    filter: grayscale(0%);
  }

  :hover span {
    transition: 0.2s linear;
    filter: drop-shadow(5px 5px 2px rgba(0, 0, 0, 0.8)) grayscale(30%);
    transform: translateY(-20vh);
    opacity: 1;
  }

  :hover img {
    opacity: 0.5;
  }

  span {
    width: 80%;
    height: 30%;
    font-size: 5dvh;
    opacity: 0;
    z-index: 2;
    position: absolute;
    bottom: -30%;
    left: 10%;
    color: #faf8ed;
    transition: 0.3s linear;
    // border: 1px solid black;
  }

  img {
    width: 100%;
    height: 70vh;
    display: block;
    object-fit: contain;
    filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.8)) grayscale(30%);
    transition: 0.3s;
  }
}

.navigate {
  width: 100%;
  height: 10vh;
  margin-top: 90vh;
  display: flex;
  justify-content: center;
  background-color: #faf8ed;
  z-index: 5;
  position: sticky;
  top: 10vh;
  box-shadow: 0 -0.3vh 1vh #00000050;
  // border: 1px solid black;
}

.navigate a {
  width: 20vw;
  height: 7vh;
  margin: 3vh 2% 0 2%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3vh 3vh 0 0;
  background-color: #748e63;
  color: #faf8ed;
  font-size: 4dvh;
  text-decoration: none;
  box-shadow: 0 -0.1vh 0.3vh #00000050;

}

.navigate a.active {
  transition: 0.2s linear;
  background-color: #99B080;
}

.footer {
  width: 100%;
  height: 10vh;
  background-color: #faf8ed;
}
</style>
