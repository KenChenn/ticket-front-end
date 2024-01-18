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
                <i class="fa-solid fa-eye-slash eye" v-show="!showPassword" @click="passwordVisibility()"></i>
                <i class="fa-solid fa-eye eye" v-show="showPassword" @click="passwordVisibility()"></i>
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
                fetch('http://localhost:8080/api/user_login',
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        credentials: 'include',
                        body: JSON.stringify({
                            account: this.loginAccount,
                            password: this.loginPassword,
                        })
                    }).then(response => response.json())
                    .then(res => {
                        console.log(res)
                        if (res.rtncode == "SUCCESSFUL") {
                            console.log("登入成功");
                            $cookies.set("account", this.loginAccount)
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
}
</script>
<style lang="scss" scoped>
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

        .search {
            width: 11%;
            height: 47%;
            border-radius: 15px;
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
            border-radius: 15px;

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
                border-radius: 15px;
                border: 1pt solid #89A071;
                background-color: #FAF8ED;
            }

            .loginBtn {
                height: 8%;
                width: 10%;
                background-color: #F9B572;
                border: 1pt solid #F9B572;
                color: #FAF8ED;
                border-radius: 15px;
                margin-left: 46%;
                margin-top: 5%;
                font-size: 1rem;
            }

            .warning {
                margin-left: 43%;
                color: #F5A352;
            }
        }
    }
}
</style>