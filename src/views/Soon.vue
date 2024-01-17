<script >
import {mapState,mapActions} from 'pinia';
import counter from '../stores/counter';
export default {
    data() {
        return {
            // ...mapState(counter,['dataList','testArray','test']),
            codename:"/Detail/", // /原本的/變數內容
        }
    },
    computed: {
        ...mapState(counter, ['dataList','testArray','test'])
    },
    methods: {
        ...mapActions(counter,[]),
    },
    mounted() {
        
    },
}
</script>

<template>
    <div class="showArea">

        <!-- 節目卡片區域 -->
        <RouterLink  to="/" class="show" v-for="(item,index) in this.dataList" >
        <RouterLink :to= "codename" class="show"  @click="this.codename = this.codename + item.codename">
            <!-- 節目圖片 -->
            <div class="showImg" @click="this.codename = this.codename + item.codename" >
                <img :src="item.keyvisualImg ">
            </div>
            <div @click="this.codename = this.codename + item.codename">
                <!-- 節目名稱 -->
                <p>
                    {{ item.name }}
                </p>
            </div>
            <!-- 節目開售日期 -->
            <div class="showDate" @click="this.codename = this.codename + item.codename">
                <p>
                    {{ item.startDate }}
                </p>
            </div>
            <!-- 節目狀態 -->
            <div class="showStatus" @click="this.codename = this.codename + item.codename">
                <p>
                    ON SALE
                </p>
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
    justify-content: space-between;
    background-color: #99B080;
    padding: 5% 10% 0% 10%;

    .one{
        height: 200px;
        width: 200px;
        background-color: #FAF8ED;
        .text{
            color: black;
        }
    }
}

.show {
    width: 30%;
    height: 40vh;
    margin-bottom: 10vh;
    background-color: #748E63;
    color: #FAF8ED;
    text-decoration: none;
    border-radius: 20px;
    
    .showImg {
        height: 60%;
        width: 100%;

        img {
            object-fit: cover;
            width: 100%;
            height: 100%;
            border-radius: 20px 20px 0 0;
        }
    }

    .showDate {
        width: 80%;
        height: 20%;
        font-size: 3.2dvh;
        margin-left: 5%;
        display: flex;
        align-items: center;

        // border: 1px black solid;
    }

    .showStatus {
        width: 40%;
        height: 15%;
        border-radius: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 55%;
        background-color: #F5A352;
        font-size: 2dvh;

    }

}</style>