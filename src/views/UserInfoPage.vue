<template lang="">
<div class="main">
    <!-- <div class="up">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="text" class="search">
        <p class="favorateP" @click="this.goFavorate()">最愛清單</p>
        <p class="orderP">訂單查詢</p>
        <p class="logoutP">登出</p>
    </div> -->
    <div class="down">
        <h1 class="pp">個人資料</h1>
        <div class="info">
            <br><br>
            <span class="spanP">使用者名稱</span>　　　　　　　<span class="infoSpan">{{this.user}}</span>
            <br><br>
            <span class="spanP">Email</span>　　　　　　　　<span class="infoSpan">{{this.email}}</span>
            <br><br>
            <span class="spanP">生日</span>　　　　　　　　　<span class="infoSpan">{{this.birth}}</span>
            <br><br>
            <span class="spanP">電話</span>　　　　　　　　　<span class="infoSpan">{{this.phone}}</span>
            <br><br><br>
            　　　　　　　　　　　　　　　　　<button type="button" class="btn" @click="this.goUserRewrite()">編輯</button>
        <!-- <UserRewritePage v-bind:user="this.user" :email="this.email" :birth="this.birth" :phone="this.phone" /> -->
        </div>
    </div>
</div>
</template>
<script>
import axios from 'axios'
// import UserRewritePage from './UserRewritePage.vue'
export default {
    data() {
        return {
            user: "",
            email: "",
            birth: "",
            phone: "",
        }
    },
    methods: {
        goFavorate() {
            this.$router.push('/FavoratePage')
        },
        goUserRewrite() {
            this.$router.push('/UserRewritePage')
        },
    },
    mounted() {
        axios({
            url: 'http://localhost:8080/api/get_user_basic_data',
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                account: $cookies.get("account"),
            },
        }).then(res => {
            console.log(res.data.data)
            this.user = res.data.data.username
            this.email = res.data.data.email
            this.birth = res.data.data.bornDate
            this.phone = res.data.data.phone
        })
    },
    // components: {
    //     UserRewritePage
    // }
}
</script>
<style lang="scss">
.main {
    width: 100vw;
    height: 100vh;
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

    .down {
        width: 100%;
        height: 89%;

        .pp {
            margin-left: 27%;
            color: #4D5C44;
        }

        .info {
            width: 48%;
            height: 75%;
            background-color: #89A071;
            margin: auto;
            margin-top: -10px;
            border-radius: 40px;
        }

        .spanP {
            font-size: 1.3rem;
            margin-left: 20%;
            color: #4D5C44;
        }

        .infoSpan {
            font-size: 1.2rem;
            color: #4D5C44;
        }

        .btn {
            background-color: #F9B572;
            border: 1pt solid #F9B572;
            color: #FAF8ED;
            border-radius: 10px;
        }
    }
}
</style>