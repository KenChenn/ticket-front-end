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
                <div class="loginInP">帳號</div>
                <input type="text" class="inputClass" v-model="loginAccount">
                <div class="warning">
                    <span v-if="!isEntityAccount" >請輸入帳號</span>
                </div>

                <div class="loginInP">密碼</div>
                <input :type="showPassword ? 'text' : 'password'" class="inputClass" v-model="loginPassword">
                <i class="fa-solid fa-eye-slash" v-show="!showPassword" @click="passwordVisibility()"></i>
                <i class="fa-solid fa-eye" v-show="showPassword" @click="passwordVisibility()"></i>
                <div class="warning">
                <span v-if="!isEntityPassword" >請輸入密碼</span>
                    </div>
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
        background-color: #F5BF89;
        display: flex;
        position: relative;

        .fa-solid {
            position: absolute;
            color: #E6E1C8;
            font-size: 2dvh;
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
            font-size: 2dvh;
            margin-left: 30%;
            color: #FAF8ED;
        }

        .loginp {
            font-size: 2dvh;
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
            font-size: 4dvh;
            display: flex;
            align-items: end;
        }

        .login {
            width: 70%;
            height: 70vh;
            background-color: #F5BF89;
            margin: auto;
            border-radius: 2vh;
            padding: 5% 0;

            .loginInP {
                width: 100%;
                height: 5vh;
                display: flex;
                justify-content: center;
                align-items: end;
                font-size: 3dvh;
                color: #4D5C44;
                // border: 1px solid black;
            }

            .inputClass {
                // border: 1px solid black;
                width: 50%;
                margin-left: 25%;
                margin-bottom: 1%;
                border-radius: 2vh;
                font-size: 2.5dvh;
                border: 0;
                background-color: #FAF8ED;
                text-align: center;
            }
            i{
                margin-left: 1%;
                font-size: 3dvh;
                color: #FAF8ED;
            }

            .loginBtn {
                height: 10%;
                width: 14%;
                background-color: #748E63;
                border: 0;
                color: #FAF8ED;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 2vh;
                margin: auto;
                margin-top: 5%;
                font-size: 2.5dvh;
            }

            .warning {
                height: 5%;
                width: 100%;
                display: flex;
                justify-content: center;
                color: #DB3A3A;
                font-size: 2dvh;
                margin-bottom: 1%;
            }
        }
    }
}
</style>