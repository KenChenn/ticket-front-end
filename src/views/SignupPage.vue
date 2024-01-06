<template>
    <div class="main">
        <div class="up">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" class="search">
            <p class="signUpp">註冊</p>
            <p class="loginp" @click="this.goLogin()">登入</p>
        </div>
        <div class="down">
            <h1 class="ppp">帳號註冊</h1>
            <div class="signUp">
                
                <span class="allPP">使用者名稱</span>
                <br>
                <input type="text" class="allInput" v-model="username">
                <br>
                <span v-if="!isUsername" class="warning">請輸入使用者名稱</span>
                <br>

                <span class="allP">Email</span>
                <br>
                <input type="text" class="allInput" v-model="email">
                <br>
                <span v-if="!isValidEmail" class="warning">請輸入正確 Email 格式</span>
                <br>

                <span class="allP">生日</span>
                <br>
                <input type="date" class="allInput" v-model="birthday" :max="maxBirthday">
                <br>
                <span v-if="!isBirthday" class="warning">請輸入生日</span>
                <br>

                <span class="allP">密碼</span>
                <br>
                <input class="allInput" v-model="password" :type="showPassword ? 'text' : 'password'">
                <i class="fa-solid fa-eye-slash" v-show="!showPassword" @click="passwordVisibility()"></i>
                <i class="fa-solid fa-eye" v-show="showPassword" @click="passwordVisibility()"></i>
                <br>
                <span v-if="!isValidPassword" class="warning">請輸入 8 ~ 16 碼英文 + 數字</span>
                <br>

                <span class="allPP">手機號碼</span>
                <br>
                <input type="text" class="allInput" v-model="phoneNumber">
                <br>
                <span v-if="!isValidPhoneNumber" class="warning">請輸入 10 碼手機格式</span>
                <br>
                <button type="button" class="btn" @click="register()">註冊</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            username: "",
            email: "",
            birthday: "",
            password: "",
            phoneNumber: "",
            showPassword: false,
            isUsername: true,
            isBirthday: true,
            isValidEmail: true,
            isValidPassword: true,
            isValidPhoneNumber: true,
            accountList: []
        }
    },
    methods: {
        goLogin() {
            this.$router.push('/LoginPage')
        },
        register() {
            if (!this.username && !this.email && !this.birthday && !this.password && !this.phoneNumber) {
                alert("請輸入註冊資訊");
                return;
            }

            //確認輸入使用者名稱 + 生日
            this.isUsername = !!this.username;
            this.isBirthday = !!this.birthday;

            //確認mail格式
            const mail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
            this.isValidEmail = mail.test(this.email);
            //確認密碼格式
            const pwd = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/
            this.isValidPassword = pwd.test(this.password);
            //確認手機號碼格式
            const tel = /^09\d{8}$/
            this.isValidPhoneNumber = tel.test(this.phoneNumber);

            if (this.isUsername && this.isBirthday && this.isValidEmail && this.isValidPassword && this.isValidPhoneNumber) {
                const account = {
                    username: this.username,
                    email: this.email,
                    birthday: this.birthday,
                    password: this.password,
                    phoneNumber: this.phoneNumber,
                }
                // console.log(this.accountList);
                this.accountList.push(account)
                localStorage.setItem("account", JSON.stringify(this.accountList))
                this.$router.push('/LoginPage')
            }
        },
        passwordVisibility(){
            this.showPassword = !this.showPassword;
        }

    },
    mounted() {
        //獲取先前註冊帳號資料庫
        const storedAccountList = localStorage.getItem("account");
        // console.log(storedAccountList);
        if (storedAccountList) {
            this.accountList = JSON.parse(storedAccountList);
            // console.log(this.accountList);
        } else {
            this.accountList = []
        }
    },
    computed: {
        //生日最大值為今日
        maxBirthday() {
            const today = new Date().toISOString().split('T')[0];
            return today;
        }
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

        .search {
            width: 11%;
            height: 47%;
            border-radius: 10px;
            border: 1pt solid #FAF8ED;
            background-color: #FAF8ED;
            margin-left: 25%;
            margin-top: 1%;
        }

        .fa-solid {
            position: absolute;
            color: #E6E1C8;
            font-size: 1rem;
            top: 33%;
            left: 25.5%;
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
        height: 89%;
        .signUp {
            width: 48%;
            height: 75%;
            background-color: #89A071;
            margin: auto;
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
            font-size: 0.8rem;
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
</style>