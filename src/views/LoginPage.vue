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
                    <span v-if="!isEntityAccount" class="warning">請輸入帳號</span>
                </div>

                <div class="loginInP">密碼</div>
                <input :type="showPassword ? 'text' : 'password'" class="inputClass" v-model="loginPassword">
                <i class="fa-solid fa-eye-slash eye" v-show="!showPassword" @click="passwordVisibility()"></i>
                <i class="fa-solid fa-eye eye" v-show="showPassword" @click="passwordVisibility()"></i>
                <div class="warning">
                    <span v-if="!isEntityPassword" class="warning">請輸入密碼</span>
                </div>

                <button type="button" class="loginBtn" @click="login()">登入</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import counter from '../stores/counter'
import { mapState, mapActions } from 'pinia'

</script>
<script>
import Swal from 'sweetalert2'
import counter from '../stores/counter'
export default {
    data() {
        return {
            ...mapState(counter, ['isLogIn']),

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
                            // this.isLogIn = true;
                            counter().isLogIn = true;
                            this.$forceUpdate();
                            // 設定過期時間60分鐘的 cookie
                            const now = new Date();
                            const expires = new Date(now.getTime() + 60 * 60 * 1000);
                            document.cookie = `account=${this.loginAccount}; expires=${expires.toUTCString()}; path=/`;
                            // $cookies.set("account", this.loginAccount)
                            this.$router.push('/');
                        } else {
                            // alert("登入失敗");
                            Swal.fire({
                                title: "登入失敗",
                                icon: "error",
                                color: "#4D5C44",
                                background: "#FAF8ED",
                                confirmButtonColor: "#DB3A3A"
                            });
                            return;
                        }
                    })
                // .then(
                //     this.$router.push('/')
                // )
            }
        },
        passwordVisibility() {
            this.showPassword = !this.showPassword;
        }
    },
    created() {
        // 創建頁面時設定
        counter().setUser({});
        if ($cookies.get("account") != null) {
            alert("已登入")
            this.$router.push('/')
        }
    },
    beforeRouteLeave(to, from, next) {
        // 離開頁面時清除
        counter().setUser(null);
        next();
    },
}
</script>
<style lang="scss" scoped>
.main {

    .title {
        width: 70%;
        height: 10vh;
        margin-top: 10vh;
        margin-left: 15%;
        color: #4D5C44;
        font-size: 4dvh;
        display: flex;
        align-items: end;
        // border: 1px solid black;
        display: flex;
    }

    .up {
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

        .login {
            width: 70%;
            height: 70vh;
            border: 0.5vh solid#89A071;
            margin: auto;
            border-radius: 2vh;
            padding: 5% 0;

            .loginInP {
                height: 5vh;
                width: 100%;
                display: flex;
                justify-content: center;
                font-size: 3dvh;
                color: #4D5C44;
                // border: 1px solid black;
            }

            .inputClass {
                width: 50%;
                margin-left: 25%;
                font-size: 2.5dvh;
                margin-bottom: 1%;
                border: 0;
                background-color: #FAF8ED;
                border-bottom: 0.3vh solid#89A071;
                color: #4D5C44;
            }

            i {
                margin-left: 1%;
                font-size: 3dvh;
                color: #4D5C44;
            }

            .loginBtn {
                width: 14%;
                height: 10%;
                border: 0.3vh solid #4D5C44;
                // border: 0;
                color: #4D5C44;
                background-color: #FAF8ED;
                border-radius: 1.5vh;
                margin-left: 43%;
                font-size: 2.5dvh;
                transition: 0.1s linear;

                &:hover {
                    transition: 0.2s linear;
                    color: #FAF8ED;
                    border: 0;
                    background-color: #F5A352;
                    scale: 1.05;
                }

                &:active {
                    background-color: #c26202;
                    scale: 0.95;
                }
            }
        }

        .warning {
            height: 10%;
            width: 100%;
            display: flex;
            justify-content: center;
            color: #DB3A3A;
            font-size: 2dvh;
            margin-bottom: 3%;
        }
    }
}
</style>