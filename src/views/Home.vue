<script>
export default {
  data() {
    return {
      selectedTab: '1'
    }
  },
  methods: {
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
    }
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
  position: relative;
  z-index: 5;
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
}
</style>
