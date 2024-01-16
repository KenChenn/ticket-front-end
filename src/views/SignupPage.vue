<template>
    <div class="main">
        <!-- <div class="up">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" class="search">
            <p class="signUpp">註冊</p>
            <p class="loginp" @click="this.goLogin()">登入</p>
        </div> -->
        <div class="down">
            <div class="title">
                帳號註冊
                <span>
                    所有必填
                </span>
            </div>

            <div class="signUp">

                <div class="allP">帳號</div>
                <input type="text" class="allInput" v-model="account">
                <div class="warning">
                    <span v-if="!isAccount">請輸入帳號</span>
                    <span v-if="isReapeatAccount">此帳號已經註冊過</span>
                </div>
                <div class="allP">使用者名稱</div>
                <input type="text" class="allInput" v-model="username">
                <div class="warning">
                    <span v-if="!isUsername">請輸入使用者名稱</span>
                    <span v-if="isReapeatUsername">此使用者名稱已經註冊過</span>
                </div>
                <div class="allP">Email</div>
                <input type="text" class="allInput" v-model="email">
                <div class="warning">
                    <span v-if="!isValidEmail">請輸入正確 Email 格式</span>
                </div>
                <div class="allP">真實姓名</div>
                <input type="text" class="allInput" v-model="name">
                <div class="warning">
                    <span v-if="!isValidName">請輸入正確姓名格式</span>
                </div>
                <div class="allP">生日</div>
                <input type="date" class="allInput" v-model="birthday" :max="maxBirthday">
                <div class="warning">
                    <span v-if="!isBirthday">請輸入生日</span>
                </div>
                <div class="allP">密碼</div>
                <input class="allInput" v-model="password" :type="showPassword ? 'text' : 'password'">
                <i class="fa-solid fa-eye-slash eye" v-show="!showPassword" @click="passwordVisibility()"></i>
                <i class="fa-solid fa-eye eye" v-show="showPassword" @click="passwordVisibility()"></i>
                <div class="warning">
                    <span v-if="!isValidPassword">請輸入 7 ~ 16 碼英文 + 數字</span>
                </div>
                <div class="allP">手機號碼</div>
                <input type="text" class="allInput" v-model="phoneNumber" @input="filterNonNumeric">
                <div class="warning">
                    <span v-if="!isValidPhoneNumber">請輸入 10 碼手機格式</span>
                </div>

                <button type="button" class="btn" @click="register()">註冊</button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            account: "",
            username: "",
            email: "",
            name: "",
            birthday: "",
            password: "",
            phoneNumber: "",
            //確認是否輸入
            isAccount: true,
            isUsername: true,
            isBirthday: true,
            //確認輸入格式正確
            isValidEmail: true,
            isValidPassword: true,
            isValidPhoneNumber: true,
            isValidName: true,
            //確認輸入資料是否已存在
            isReapeatUsername: false,
            isReapeatAccount: false,

            showPassword: false,
            accountList: []
        }
    },
    methods: {
        goLogin() {
            this.$router.push('/LoginPage')
        },
        register() {
            if (!this.account && !this.username && !this.email && !this.birthday && !this.password && !this.phoneNumber && !this.name) {
                alert("請輸入註冊資訊");
                return;
            }

            //確認輸入帳號 + 使用者名稱 + 生日
            this.isUsername = !!this.username;
            this.isAccount = !!this.account
            this.isBirthday = !!this.birthday;


            //確認mail格式
            const mail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
            this.isValidEmail = mail.test(this.email);
            //確認密碼格式
            const pwd = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,16}$/
            this.isValidPassword = pwd.test(this.password);
            //確認手機號碼格式
            const tel = /^09\d{8}$/
            this.isValidPhoneNumber = tel.test(this.phoneNumber);
            //確認真實姓名格式
            const realName = /^[\u4e00-\u9fa5]{1,3}(?:·[\u4e00-\u9fa5]{1,2})*$/
            this.isValidName = realName.test(this.name)


            if (this.isAccount && this.isUsername && this.isBirthday && this.isValidEmail && this.isValidPassword && this.isValidPhoneNumber && this.isValidName) {
                const account = {
                    account: this.account,
                    username: this.username,
                    email: this.email,
                    birthday: this.birthday,
                    password: this.password,
                    phoneNumber: this.phoneNumber,
                    realName: this.name
                }
                // console.log(this.accountList);
                // this.accountList.push(account)
                axios({
                    url: 'http://localhost:8080/api/user_signup',
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: {
                        account: this.account,
                        password: this.password,
                        realname: this.name,
                        username: this.username,
                        email: this.email,
                        born_date: this.birthday,
                        phone: this.phoneNumber,
                    },
                }).then(res => {
                    console.log(res.data.rtncode);
                    if (res.data.rtncode == "ACCOUNT_EXISTED") {
                        this.isReapeatAccount = true
                    } else {
                        this.isReapeatAccount = false
                    };
                    if (res.data.rtncode == "USERNAME_ALREADY_IN_USE") {
                        this.isReapeatUsername = true
                    } else {
                        this.isReapeatUsername = false
                    };
                    if (res.data.rtncode == "SUCCESSFUL") {
                        this.$router.push('/LoginPage')
                        console.log("註冊成功");
                    }
                })
            }
        },
        filterNonNumeric(event) {
            // console.log(event.target.value)
            // 使用正则表达式过滤非数字字符
            this.phoneNumber = event.target.value.replace(/[^\d]/g, '')
        },
        passwordVisibility() {
            this.showPassword = !this.showPassword;
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
    // width: 100%;
    // // height: 130vh;

    .up {
        width: 100%;
        height: 0%;
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
        padding-bottom: 5%;
        background-color: #FAF8ED;

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
            justify-content: space-between;

            span {
                font-size: 2dvh;
            }
        }

        .signUp {
            width: 70%;
            height: auto;
            // background-color: #89A071;
            border: 5px solid#89A071;
            margin: auto;
            border-radius: 2vh;
            padding: 2%;
        }

        .allInput {
            width: 50%;
            height: 5%;
            font-size: 3dvh;
            margin-left: 25%;
            border-radius: 1vh;
            background-color: #FAF8ED;
            border: 0;
            border-bottom: #DB3A3A 1px solid;
            text-align: center;
        }

        .allP {
            width: 100%;
            height: 6%;
            font-size: 3dvh;
            color: #4D5C44;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        i {
            margin-left: 1%;
            font-size: 3dvh;
            color: #FAF8ED;
        }

        .warning {
            height: 3vh;
            width: 100%;
            display: flex;
            justify-content: center;
            color: #DB3A3A;
            font-size: 2dvh;
            // border: 1px solid black;
        }

        .btn {
            background-color: #F9B572;
            border: 1pt solid #F9B572;
            color: #FAF8ED;
            height: 5%;
            width: 10%;
            margin-top: 1%;
            border-radius: 2vh;
            margin-left: 45%;
            justify-content: center;
            align-items: center;
        }

    }
}
</style>