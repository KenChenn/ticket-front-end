<template lang="">
    <div class="main">
        <!-- <div class="up">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="text" class="search">
        <p class="orderP">訂單查詢</p>
        <p class="logoutP">登出</p>
        </div> -->
        <div class="down">
            <h1 class="pp">最愛列表</h1>
            <div class="favSq">
                <span class="name">活動名稱</span>
                <span class="actName">BELUCA 1st Fan Meeting in Taipei</span>
                <div class="img"></div>
                <span class="jyouTai">狀態</span>
                <span class="start">即將開始</span>
                <span class="date">演出日期</span>
                <span class="actDate">2024/1/6 (六) 19:00</span>
                <span class="basyou">演出地點</span>
                <span class="actBasyou">TICC 台北國際會議中心（台北市信義區信義路五段1號）</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    methods: {

    },
    mounted() {

    }
}
</script>
<style lang="scss" scoped>
.main {
    width: 100vw;
    height: 150vh;
    background-color: #FAF8ED;

    .up {
        width: 100%;
        height: 60px;
        background-color: #F9B572;
        display: flex;
        position: relative;
        .fa-solid {
            position: absolute;
            font-size: 1rem;
            left: 325px;
            top: 22px;
            color: #E6E1C8;
        }

        .search {
            width: 150px;
            height: 25px;
            margin-top: 15px;
            margin-left: 320px;
            border-radius: 10px;
            border: 1pt solid #FAF8ED;
            background-color: #FAF8ED;
        }
        .orderP {
            color: #FAF8ED;
            font-size: 1rem;
            margin-right: 1%;
            margin-left: 27.5%;
            margin-right: 1%;
        }

        .logoutP {
            color: #FAF8ED;
            font-size: 1rem;
        }
    }
    .down{
        width: 100%;
        height: 89%;
        .pp{
            margin-left: 25%;
            color: #4D5C44;
        }
        .favSq{
            width: 50%;
            height: 35%;
            position: relative;
            background-color: #F5A352;
            margin: auto;
            margin-top: -1%;
            border-radius: 10px;
            
            .name{
                position: absolute;
                font-size: 1rem;
                top:3%;
                left: 45%;
                color: #4D5C44;
            }
            .actName{
                position: absolute;
                font-size: 1.1rem;
                top:13%;
                left: 29%;
                color: #FAF8ED;
            }
            .img{
                position: absolute;
                width: 32%;
                height: 35%;
                border-radius: 10px;
                background-image: url("../views/BELUCA.png");
                background-repeat: round;
                top:28%;
                left: 4%;
            }
            .jyouTai{
                position: absolute;
                font-size: 1.1rem;
                top:68%;
                left:5%;
                color: #4D5C44;
            }
            .start{
                position: absolute;
                font-size: 1.09rem;
                top:69%;
                left:24%;
                color: #FAF8ED;
            }
            .date{
                position: absolute;
                font-size: 1.1rem;
                top:25%;
                left:60%;
                color: #4D5C44;
            }
            .actDate{
                position: absolute;
                font-size: 1rem;
                top:35%;
                left:55%;
                color: #FAF8ED;
            }
            .basyou{
                position: absolute;
                font-size: 1.1rem;
                top:48%;
                left:60%;
                color: #4D5C44;
            }
            .actBasyou{
                position: absolute;
                font-size: 1rem;
                top:58%;
                left:50%;
                color: #FAF8ED;
                word-wrap:break-word;
            }
        }
    }
}
</style>