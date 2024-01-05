<template >
    <div class="main">
        <div class="up">
            <i class="fa-solid fa-magnifying-glass"></i>
        <input type="text" class="search">
        <p class="favorateP" @click="this.goFavorate()">最愛清單</p>
        <p class="orderP">訂單查詢</p>
        <p class="logoutP">登出</p>
        </div>
        <div class="down">
            <h1 class="ppp">編輯資訊</h1>
            <div class="reWriteSq">

                <br>
                <span class="allPP">使用者名稱</span>
                <br>
                <input type="text" class="allInput">
                <br>
                <span class="allP">Email</span>
                <br>
                <input type="text" class="allInput">
                <br>
                <span class="allP">生日</span>
                <br>
                <input type="date" class="allInput">
                <br>
                <span class="allP">密碼</span>
                <br>
                <input class="allInput">
                <br>
                <span class="allPP">手機號碼</span>
                <br>
                <input type="text" class="allInput">
                <br><br>
                <button type="button" class="btn">完成</button>

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
<style lang="scss">
.main{
    width: 100vw;
    height: 100vh;
    background-color: #FAF8ED;
    .up {
        width: 100%;
        height: 11%;
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

        .favorateP {
            color: #FAF8ED;
            margin-left: 20%;
            margin-right: 1%;
        }

        .orderP {
            color: #FAF8ED;
            font-size: 1rem;
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
        .ppp {
            margin-left: 27%;
            color: #4D5C44;
        }
        .reWriteSq{
            width: 48%;
            height: 75%;
            background-color: #89A071;
            margin: auto;
            margin-top: -10px;
            border-radius: 10px;
            .signUp {
            width: 48%;
            height: 75%;
            background-color: #89A071;
            margin: auto;
            margin-top: -10px;
            border-radius: 10px;
        }

        .ppp {
            margin-left: 27%;
            color: #4D5C44;
        }

        .allInput {
            width: 47%;
            height: 6%;
            margin-left: 28%;
            border-radius: 10px;
            background-color: #FAF8ED;
            border: 1pt solid #FAF8ED;
        }

        .allP {
            margin-left: 48%;
            color: #4D5C44;
        }

        .allPP {
            margin-left: 45%;
            color: #4D5C44;
        }

        .warning {
            margin-left: 40%;
            color: #F5A352;
        }

        .btn {
            background-color: #F9B572;
            border: 1pt solid #F9B572;
            color: #FAF8ED;
            border-radius: 10px;
            margin-left: 48%;

        }

        .fa-solid {
            position: absolute;
            left: 61.5%;
            top: 65%
        }
        }
    }
}
</style>