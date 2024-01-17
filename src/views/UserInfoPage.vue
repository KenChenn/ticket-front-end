<template lang="">
<div class="main">
    <div class="down">
        <div class="title">
                個人資料
            </div>
            <div class="info">           
            <span class="spanP">使用者名稱</span>
            <span class="infoSpan">{{this.user}}111</span>
                        
            <span class="spanP">Email</span>
            <span class="infoSpan">{{this.email}}1111</span>
                        
            <span class="spanP">生日</span>
            <span class="infoSpan">{{this.birth}}1111</span>
                        
            <span class="spanP">電話</span>
            <span class="infoSpan">{{this.phone}}1111</span>
                        
            <div class="btnArea">
                <button type="button" class="btn" @click="this.goUserRewrite()">編輯</button>
                <button type="button" class="btn" @click="this.goEditPwdPage()">修改密碼</button>
            </div>
        <!-- <UserRewritePage v-bind:user="this.user" :email="this.email" :birth="this.birth" :phone="this.phone" /> -->
        </div>
    </div>
</div>
</template>
<script>
import counter from '../stores/counter'
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
        goUserRewrite() {
            this.$router.push('/UserRewritePage')
        },
        goEditPwdPage() {
            this.$router.push('/EditPwdPage')
        }
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
    created() {
        // 創建頁面時設定
        counter().setHeaderLink({});
    },
    beforeRouteLeave(to, from, next) {
        // 離開頁面時清除
        counter().setHeaderLink(null);
        next();
    },
    // components: {
    //     UserRewritePage
    // }
}
</script>
<style lang="scss" scoped>
.main {
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
            border-radius: 15px;
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

        .title {
            width: 70%;
            height: 10vh;
            margin-left: 15%;
            color: #4D5C44;
            font-size: 4dvh;
            display: flex;
            align-items: end;
            // border: 1px solid black;
            display: flex;
        }

        .info {
            width: 70%;
            height: 70vh;
            border: 0.5vh solid#89A071;
            margin: auto;
            border-radius: 2vh;
            padding: 3% 0;
        }

        .spanP {
            height: 5vh;
            width: 100%;
            display: flex;
            justify-content: center;
            font-size: 3dvh;
            color: #4D5C44;
        }

        .infoSpan {
            height: 5vh;
            width: 100%;
            display: flex;
            justify-content: center;
            font-size: 2.5dvh;
            color: #4D5C44;
            margin-bottom: 1%;
        }

        .btnArea {
            width: 70%;
            height: 5vh;
            margin-left: 15%;
            display: flex;
            justify-content: space-around;
            // border: black 1px solid;
            .btn {
                width: 20%;
                height: 100%;
                background-color: #F9B572;
                border: 0;
                color: #FAF8ED;
                border-radius: 10vh;
                font-size: 2.5dvh;
                display: flex;
                justify-content: center;
                align-items: center;
            }


        }
    }
}
</style>