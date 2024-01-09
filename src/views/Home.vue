<script>
export default {
  data() {
    return {

    }
  },
  methods: {
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
    }
  },
  mounted() {

  }
}
</script>

<template>
  <!-- <button type="button" @click="this.go()">去登入</button>
<button @click="this.goUserInfo()">去個資頁</button> -->
  <button @click="this.goCreateHost">去建立主辦單位頁</button>
  <button @click="this.goEditHost">去編輯主辦單位頁</button>
  <button @click="this.goBuyTicketPage">去購票頁</button>

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
      <RouterLink to="/Popular" class="tab">
        熱門活動
      </RouterLink>

      <RouterLink to="/Soon" class="tab">
        即將開始
      </RouterLink>

    </div>
    <RouterView />

    <div class="footer">

    </div>
  </div>
</template>

<style lang="scss" scoped>
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

  .tab {
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

    // border: 1px solid black;
  }
}

.footer {
  width: 100%;
  height: 10vh;
  background-color: #faf8ed;
}
</style>