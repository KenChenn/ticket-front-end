<template>
    <div class="main">
        <div class="up">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" class="search">
            <p class="signUpp" @click="this.goSignUp()">註冊</p>
            <p class="loginp">登入</p>
        </div>
        <div class="down">
            <h1 class="pp">帳號登入</h1>
            <div class="login">
                <h4 class="loginInP">Mail</h4>
                <input type="text" class="inputClass" v-model="loginEmail">
                <span v-if="!isEntityEmail" class="warning">請輸入 Email</span>
                <span v-if="!isCorrectEmail" class="warning">Email 輸入錯誤</span>
                <br>
                <h4 class="loginInP2">密碼</h4>
                <input type="text" class="inputClass" v-model="loginPassword">
                <span v-if="!isEntityPassword" class="warning">請輸入密碼</span>
                <span v-if="!isCorrectPassword" class="warning">密碼輸入錯誤</span>
                <br>
                <button type="button" class="loginBtn" @click="login()">登入</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            loginEmail: "",
            loginPassword: "",
            isEntityEmail: true,
            isEntityPassword: true,
            isCorrectEmail: true,
            isCorrectPassword: true,
        }
    },
    methods: {
        goSignUp() {
            this.$router.push('/SignupPage')
        },
        login() {
            //確認輸入帳號 + 密碼
            this.isEntityEmail = !!this.loginEmail
            this.isEntityPassword = !!this.loginPassword

            //確認輸入正確帳號 + 密碼
            const loginList = JSON.parse(localStorage.getItem("account"));
            if (this.loginEmail && this.loginPassword) {
                for (let i = 0; i < loginList.length; i++) {
                    if (loginList[i].email == this.loginEmail) {
                        this.isCorrectEmail = true
                        if (loginList[i].password == this.loginPassword) {
                            this.isCorrectPassword = true
                            console.log("登入成功");
                        } else {
                            this.isCorrectPassword = false
                        }
                        break;
                    } else {
                        this.isCorrectEmail = false
                    }
                }
            }
        }
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

        .signUpp {
            margin-left: 350px;
            margin-right: 15px;
            color: #FAF8ED;
            font-size: 1rem;
        }

        .loginp {
            color: #FAF8ED;
            font-size: 1rem;
        }
    }

    .down {
        .pp {
            margin-top: 20px;
            margin-left: 330px;
            color: #4D5C44;
        }

        .login {
            width: 600px;
            height: 350px;
            background-color: #89A071;
            margin: auto;
            margin-top: -25px;
            border-radius: 30px;

            .loginInP {
                margin-left: 280px;
                font-size: 25px;
                padding-top: 15px;
                color: #4D5C44;
            }

            .loginInP2 {
                margin-left: 280px;
                font-size: 25px;
                margin-top: 20px;
                color: #4D5C44;
            }

            .inputClass {
                height: 20px;
                width: 300px;
                margin-left: 150px;
                margin-top: 5px;
                border-radius: 5px;
                border: 1pt solid #89A071;
                background-color: #FAF8ED;
            }

            .loginBtn {
                height: 30px;
                width: 50px;
                background-color: #F9B572;
                border: 1pt solid #F9B572;
                color: #FAF8ED;
                margin-left: 280px;
                border-radius: 10px;
                margin-top: 10px;
            }

            .warning {
                margin-left: 43%;
                color: #F5A352;
            }
        }
    }
}
</style>