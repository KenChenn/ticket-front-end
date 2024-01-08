<template>
    <div class="main">
        <!-- <div class="up">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" class="search">
            <p class="signUpp" @click="this.goSignUp()">註冊</p>
            <p class="loginp">登入</p>
        </div> -->
        <div class="down">
            <h1 class="pp">帳號登入</h1>
            <div class="login">
                <h4 class="loginInP">帳號</h4>
                <input type="text" class="inputClass" v-model="loginAccount">
                <span v-if="!isEntityAccount" class="warning">請輸入帳號</span>
                <br>
                <h4 class="loginInP2">密碼</h4>
                <input :type="showPassword ? 'text' : 'password'" class="inputClass" v-model="loginPassword">
                <i class="fa-solid fa-eye-slash" v-show="!showPassword" @click="passwordVisibility()"></i>
                <i class="fa-solid fa-eye" v-show="showPassword" @click="passwordVisibility()"></i>
                <span v-if="!isEntityPassword" class="warning">請輸入密碼</span>
                <br>
                <button type="button" class="loginBtn" @click="login()">登入</button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            loginAccount: "",
            loginPassword: "",
            isEntityAccount: true,
            isEntityPassword: true,

            showPassword: false,
        }
    },
    methods: {
        goSignUp() {
            this.$router.push('/SignupPage')
        },
        login() {
            //確認輸入帳號 + 密碼
            this.isEntityAccount = !!this.loginAccount
            this.isEntityPassword = !!this.loginPassword

            //確認輸入正確帳號 + 密碼
            if (this.loginAccount && this.loginPassword) {
                axios({
                    url: 'http://localhost:8080/api/user_login',
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: {
                        account: this.loginAccount,
                        password: this.loginPassword,
                    },
                }).then(res => {
                    console.log(res.data)
                    if (res.data.rtncode == "SUCCESSFUL") {
                        console.log("登入成功");
                        this.$router.push('/UserInfoPage');
                    } else {
                        alert("登入失敗");
                        return;
                    }
                })
            }
        },
        passwordVisibility() {
            this.showPassword = !this.showPassword;
        }
    },
    components: {
        UserInfoPage
    }
}
</script>
<style lang="scss">
.main {
    width: 100vw;
    height: 100vh;
    background-color: #FAF8ED;

    .up {
        //width: 100%;
        //height: 11%;
        background-color: #F9B572;
        display: flex;
        position: relative;

        .fa-solid {
            position: absolute;
            color: #E6E1C8;
            font-size: 1rem;
            top: 33%;
            left: 25.5%;
        }

        .search {
            width: 11%;
            height: 47%;
            border-radius: 10px;
            border: 1pt solid #FAF8ED;
            background-color: #FAF8ED;
            margin-left: 25%;
            margin-top: 1%;
        }

        .signUpp {
            font-size: 1rem;
            margin-left: 30%;
            color: #FAF8ED;
        }

        .loginp {
            font-size: 1rem;
            margin-left: 2%;
            color: #FAF8ED;
        }
    }

    .down {
        width: 100%;
        height: 100%;

        .pp {
            margin-left: 27%;
            color: #4D5C44;
        }

        .login {
            width: 48%;
            height: 75%;
            background-color: #89A071;
            margin: auto;
            margin-top: -2%;
            border-radius: 10px;

            .loginInP {
                margin-left: 45%;
                font-size: 1.6rem;
                padding-top: 15px;
                color: #4D5C44;
            }

            .loginInP2 {
                margin-left: 45%;
                font-size: 1.6rem;
                margin-top: 20px;
                color: #4D5C44;
            }

            .inputClass {
                width: 47%;
                height: 6%;
                margin-left: 26%;
                margin-top: 1%;
                border-radius: 10px;
                border: 1pt solid #89A071;
                background-color: #FAF8ED;
            }

            .loginBtn {
                height: 10%;
                width: 10%;
                background-color: #F9B572;
                border: 1pt solid #F9B572;
                color: #FAF8ED;
                border-radius: 10px;
                margin-left: 46%;
                margin-top: 5%;
            }

            .warning {
                margin-left: 43%;
                color: #F5A352;
            }
        }
    }
}
</style>