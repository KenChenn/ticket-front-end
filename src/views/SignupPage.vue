<template>
    <div class="main">
        <div class="up">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="text" class="search">
        <p class="signUpp" @click="this.goSignUp()">註冊</p>
        <p class="loginp">登入</p>
        </div>
        <div class="down">
            <h1 class="ppp">帳號註冊</h1>
            <div class="signUp">
                <span class="allPP">使用者名稱</span>
                <br>
                <input type="text" class="allInput">
                <br><br>
                <span class="allP">Email</span>
                <br>
                <input type="text" class="allInput">
                <br><br>
                <span class="allP">生日</span>
                <br>
                <input type="date" class="allInput">
                <br><br>
                <span class="allP">密碼</span>
                <br>
                <input type="number" class="allInput">
                <br><br>
                <span class="allPP">手機密碼</span>
                <br>
                <input type="nuber" class="allInput">
                <br><br>
                <button type="button" class="btn">註冊</button>
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
.main {
    width: 100vw;
    height: 100vh;
    background-color: #FAF8ED;

    .up {
        width: 100%;
        height: 11%;
        background-color: #F9B572;
        display: flex;
        position: relative;
        .search{
            width: 11%;
            height: 47%;
            border-radius: 10px;
            border: 1pt solid #FAF8ED ;
            background-color: #FAF8ED;
            margin-left: 25%;
            margin-top: 1%;
        }
        .fa-solid{
            position: absolute;
            color: #E6E1C8;
            font-size: 1rem;
            top:33%;
            left:25.5%;
        }
        .signUpp{
            font-size: 1rem;
            margin-left: 30%;
            color: #FAF8ED;
        }
        .loginp{
            font-size: 1rem;
            margin-left: 2%;
            color: #FAF8ED;
        }
    }

    .down {
        width: 100%;
        height: 89%;


        .signUp {
            width: 48%;
            height: 75%;
            background-color: #89A071;
            margin: auto;
            margin-top: -10px;
            border-radius: 30px;
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

        .btn {
            background-color: #F9B572;
            border: 1pt solid #F9B572;
            color: #FAF8ED;
            border-radius: 10px;
            margin-left: 48%;

        }
    }
}</style>