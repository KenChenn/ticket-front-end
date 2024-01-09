  <script>
  export default {
    data() {
      return {
  
      }
    },
    methods: {
      go() {
        this.$router.push('/LoginPage')
      },
      goUserInfo() {
        this.$router.push('/UserInfoPage')
      }
    },
    mounted() {
  
    }
  }
  </script>

<template>
  <!-- <button type="button" @click="this.go()">去登入</button>
<button @click="this.goUserInfo()">去個資頁</button> -->

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
      <div class="page">
        <RouterLink to="/Popular">熱門活動</RouterLink>
      </div>
      <div class="page">
        <RouterLink to="/Soon">即將開始</RouterLink>
      </div>
    </div>
    <RouterView />
    
  </div>
</template>

<style scoped lang="scss">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
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

  .page {
    width: 20%;
    height: 100%;
    margin-left: 2%;
    margin-right: 2%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px 10px 0 0;
    background-color: #748e63;

    // border: 1px solid black;
    a {
      color: #faf8ed;
      text-decoration: none;
    }
  }
}

</style>
