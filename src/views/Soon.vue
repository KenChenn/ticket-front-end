<script >
import { mapState, mapActions } from 'pinia';
import counter from '../stores/counter';
export default {
    data() {
        return {
            // ...mapState(counter,['dataList','testArray','test']),
            codename: "/Detail/", // /原本的/變數內容
        }
    },
    computed: {
        ...mapState(counter, ['dataList', 'testArray', 'test'])
    },
    methods: {
        ...mapActions(counter, []),
    },
    mounted() {

    },
}
</script>

<template>
    <div class="showArea">

        <!-- 節目卡片區域 -->
        <RouterLink to="/" class="show" v-for="(item, index) in this.dataList">
            <RouterLink :to="codename" class="show" @click="this.codename = this.codename + item.codename">
                <!-- 節目圖片 -->
                <div class="showImg" @click="this.codename = this.codename + item.codename">
                    <img :src="item.keyvisualImg">
                </div>

                <div class="infoArea" @click="this.codename = this.codename + item.codename">
                    <div class="showName" >
                        <!-- 節目名稱 -->
                            {{ item.name }}
                    </div>
                    <!-- 節目開售日期 -->
                    <div class="showDate">
                        <span>
                            {{ item.startDate }}
                        </span>
                    </div>
                    <!-- 節目狀態 -->
                    <div class="showStatus">
                        <span>
                            ON SALE
                        </span>
                    </div>
                </div>
                <!-- //測試 -->
                <!-- <div class="one" v-for="(item,index) in this.dataList">
                <p class="text"> {{ item.codename }}</p>
                <img :src="item.keyvisualImg ">
            </div> -->
            </RouterLink>
        </RouterLink>

    </div>
</template>


<style scoped lang="scss">
.showArea {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background-color: #99B080;
    padding: 3% 10% 0% 10%;
}

.show {
    width: 30%;
    height: 35vh;
    margin-bottom: 3%;
    background-color: #748E63;
    color: #FAF8ED;
    text-decoration: none;
    border-radius: 2vh;

    .showImg {
        height: 60%;
        width: 100%;

        img {
            object-fit: cover;
            width: 100%;
            height: 100%;
            border-radius: 2vh 2vh 0 0;
        }
    }

    .infoArea {
        height: 40%;
        width: 100%;
        padding: 2%;
        // border: 1px black solid;

        .showName {
            height: 60%;
            font-size: 3dvh;
            word-wrap: break-all;
            display: flex;
            align-items: center;
            // border: 1px black solid;
        }

        .showDate {
            width: 40%;
            font-size: 2.5dvh;
            font-weight:lighter;
            display: flex;
            align-items: center;
            // border: 1px black solid;
        }

        .showStatus {
            width: 30%;
            height: 30%;
            border-radius: 10vh;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 70%;
            margin-top: -7%;
            background-color: #F5A352;
            font-size: 2dvh;   
        }
    }
}
</style>