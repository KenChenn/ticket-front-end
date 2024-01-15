<template>
    <div class="main">
        <!-- <div class="up">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" class="search">
            <p class="signUpp" @click="this.goSignUp()">註冊</p>
            <p class="loginp">登入</p>
        </div> -->
        <div class="down">
            <div class="title">
                帳號登入
            </div>

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
        login() {
            //確認輸入帳號 + 密碼
            this.isEntityAccount = !!this.loginAccount
            this.isEntityPassword = !!this.loginPassword

            //確認輸入正確帳號 + 密碼
            if (this.loginAccount && this.loginPassword) {
                fetch('http://localhost:8080/admin/login', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        account: this.loginAccount,
                        password: this.loginPassword,
                    }),
                }).then(response => response.json())
                    .then(res => {
                        console.log(res.rtncode)
                        if (res.rtncode == "SUCCESSFUL") {
                            console.log("登入成功");
                            this.$router.push('/ActivityAndHostPage');
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
    mounted() {

    }
}
</script>
<style lang="scss">
.main {
    height: 90vh;
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
            border-radius: 2vh;
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

        .title {
            width: 70%;
            height: 10vh;
            // border: 1px solid black;
            margin-left: 15%;
            color: #4D5C44;
            font-size: 4vh;
            display: flex;
            align-items: end;
        }

        .login {
            width: 70%;
            height: 75%;
            background-color: #F9B572;
            margin: auto;
            border-radius: 2vh;

            .loginInP {
                width: 100%;
                height: 10vh;
                display: flex;
                justify-content: center;
                align-items: end;
                font-size: 3vh;
                color: #4D5C44;
                // border: 1px solid black;
            }

            .loginInP2 {
                width: 100%;
                height: 10vh;
                display: flex;
                justify-content: center;
                align-items: end;
                font-size: 3vh;
                color: #4D5C44;
                // border: 1px solid black;
            }

            .inputClass {
                // border: 1px solid black;
                width: 50%;
                height: 10%;
                margin-left: 25%;
                margin-top: 1%;
                border-radius: 10vh;
                border: 1pt solid #F9B572;
                background-color: #FAF8ED;
            }

            .fa-solid {
                font-size: 3vh;
                color: #FAF8ED;
            }

            .loginBtn {
                height: 10%;
                width: 10%;
                background-color: #748E63;
                border: 1pt solid #748E63;
                color: #FAF8ED;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 2vh;
                margin: auto;
                margin-top: 5%;
                font-size: 2.5vh;
            }

            .warning {
                // border: 1px solid black;
                margin-left: 43%;
                color: #4D5C44;
                font-size: 2.5vh;
            }
        }
    }
}
</style>