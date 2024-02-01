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

                <div class="allP">
                    <span>帳號</span>
                    <input type="text" class="allInput" v-model="account">
                    <div class="warning">
                        <span v-if="isReapeatAccount">此帳號已經註冊過</span>
                        <span v-if="!isValidAccount">請輸入1 ~ 20碼的英文或數字</span>
                    </div>
                </div>
                <div class="allP">
                    <span>使用者名稱</span>
                    <input type="text" class="allInput" v-model="username">
                    <div class="warning">
                        <span v-if="isReapeatUsername">此使用者名稱已經註冊過</span>
                        <span v-if="!isValidUsername">請輸入1 ~ 20碼的英文或數字</span>
                    </div>
                </div>
                <div class="allP">
                    <span>Email</span>
                    <input type="text" class="allInput" v-model="email">
                    <div class="warning">
                        <span v-if="!isValidEmail">請輸入正確 Email 格式</span>
                    </div>
                </div>
                <div class="allP">
                    <span>真實姓名</span>
                    <input type="text" class="allInput" v-model="name">
                    <div class="warning">
                        <span v-if="!isValidName">請輸入正確姓名格式</span>
                    </div>
                </div>
                <div class="allP">
                    <span>生日</span>
                    <input type="date" class="allInput" v-model="birthday" :max="maxBirthday" :min="minBirthday">
                    <div class="warning">
                        <span v-if="!isBirthday">請輸入生日</span>
                        <span v-if="!isValidBirthday">請輸入有效生日</span>
                        <span v-if="!isEnoughBirthday">未滿7歲請勿註冊</span>
                    </div>
                </div>
                <div class="allP">
                    <span>密碼</span>
                    <input class="allInput" v-model="password" :type="showPassword ? 'text' : 'password'">
                    <i class="fa-solid fa-eye-slash eye" v-show="!showPassword" @click="passwordVisibility()"></i>
                    <i class="fa-solid fa-eye eye" v-show="showPassword" @click="passwordVisibility()"></i>
                    <div class="warning">
                        <span v-if="!isValidPassword">請輸入 7 ~ 16 碼英文 + 數字</span>
                    </div>
                </div>
                <div class="allP">
                    <span>手機號碼</span>
                    <input type="text" class="allInput" v-model="phoneNumber" @input="filterNonNumeric">
                    <div class="warning">
                        <span v-if="!isValidPhoneNumber">請輸入 10 碼手機格式</span>
                    </div>
                </div>
                <div class="allP">
                    <div class="allP2">
                        <input type="checkbox" v-model="checkbox" v-if="isCheckboxOpen">
                        <span>我同意</span>
                        <a @click="warning">免責說明</a>
                    </div>
                    <div class="warning" v-if="!isCheckbox">
                        <span v-if="!isCheckbox">註冊前請詳閱免責說明</span>
                    </div>
                </div>
                <button type="button" class="btn" @click="register()">
                    註冊
                </button>


            </div>
        </div>
    </div>
</template>
<script>
import Swal from 'sweetalert2'
import counter from '../stores/counter'
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
            checkbox: false,
            //確認是否輸入
            isBirthday: true,
            isCheckbox: true,
            //確認輸入格式正確
            isValidAccount: true,
            isValidUsername: true,
            isValidEmail: true,
            isValidPassword: true,
            isValidPhoneNumber: true,
            isValidName: true,
            isValidBirthday: true,
            isEnoughBirthday: true,
            //確認輸入資料是否已存在
            isReapeatUsername: false,
            isReapeatAccount: false,

            isCheckboxOpen: false,
            showPassword: false,
            accountList: []
        }
    },
    methods: {
        goLogin() {
            this.$router.push('/LoginPage')
        },
        register() {
            console.log("註冊功能啟動");
            console.log(this.account);
            console.log(this.username);

            if (!this.account && !this.username && !this.email && !this.birthday && !this.password && !this.phoneNumber && !this.name && !this.checkbox) {
                Swal.fire({
                    title: "請輸入註冊資訊",
                    icon: "warning",
                    color: "#4D5C44",
                    background: "#FAF8ED",
                    confirmButtonColor: "#F5A352"
                });
                return;
            }

            //確認輸入生日 + 免責
            this.isBirthday = !!this.birthday;
            this.isCheckbox = !!this.checkbox


            //確認帳號格式
            const account = /^[\w\p{Han}\p{P}]{1,20}$/
            this.isValidAccount = account.test(this.account);
            //確認使用者名稱格式
            const username = /^[\w\p{Han}\p{P}]{1,20}$/
            this.isValidUsername = username.test(this.username);
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

            if (new Date(this.birthday) < new Date(this.minBirthday)) {
                this.isValidBirthday = false
            } else {
                this.isValidBirthday = true
            }
            // 檢查是否已滿7歲
            var ageDifMs = Date.now() - new Date(this.birthday).getTime();
            // 年齡的日期差
            var ageDate = new Date(ageDifMs);
            // 取得年份差
            var age = Math.abs(ageDate.getUTCFullYear() - 1970);
            if (this.isBirthday && age >= 7) {
                this.isEnoughBirthday = true
            } else if (this.isBirthday && age < 7) {
                this.isEnoughBirthday = false
            }

            if (this.account && this.username && this.isBirthday && this.isValidEmail && this.isValidPassword && this.isValidPhoneNumber && this.isValidName && this.isValidBirthday && this.isEnoughBirthday && this.isCheckbox && this.isValidAccount && this.isValidUsername) {
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
                        console.log("註冊成功");
                        Swal.fire({
                            title: "註冊成功",
                            icon: "success",
                            color: "#4D5C44",
                            background: "#FAF8ED",
                            confirmButtonColor: "#748e63"
                        });
                        this.$router.push('/LoginPage')
                    }else{
                        console.log("出錯");
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
        },
        warning() {
            this.isCheckboxOpen = true
            Swal.fire({
                html: "本系統不接受未滿7歲之無行為能力人註冊會員。<br>若您是7歲以上、未滿18歲之未成年人，應由您的法定代理人閱讀、暸解、並同意服務條款之所有內容，始得開始使用或繼續使用此售票系統提供之服務。<br>如您開始使用或繼續使用本系統，即推定您的法定代理人已閱讀、暸解、並同意服務條款之所有內容",
                icon: "warning",
                color: "#4D5C44",
                background: "#FAF8ED",
                confirmButtonColor: "#F5A352"
            });
        }
    },
    computed: {
        //生日最大值為今日
        maxBirthday() {
            const today = new Date().toISOString().split('T')[0];
            return today;
        },
        minBirthday() {
            return '1900-01-01';
        }
    },
    created() {
        // 創建頁面時設定
        counter().setUser({});
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
            margin-top: 10vh;
            margin-left: 15%;
            color: #4D5C44;
            font-size: 4dvh;
            display: flex;
            align-items: end;
            // border: 1px solid black;
            display: flex;
            justify-content: space-between;

            span {
                font-size: 3dvh;
                color: #DB3A3A;
            }
        }

        .signUp {
            width: 70%;
            height: 70vh;
            border: 0.5vh solid#89A071;
            margin: auto;
            border-radius: 2vh;
            padding: 3%;
            display: flex;
            flex-wrap: wrap;
        }

        .allInput {
            width: 80%;
            font-size: 3dvh;
            margin-top: 1%;
            border: 0;
            background-color: #FAF8ED;
            border-bottom: #89A071 0.3vh solid;
            color: #4D5C44;

            &:focus {
                outline: 0;
            }
        }

        .allP {
            width: 50%;
            font-size: 3dvh;
            color: #4D5C44;
            // border: 1px black solid;
        }

        .allP span {
            width: 100%;
            height: 30%;
            display: flex;
        }

        i {
            margin-left: 1%;
            font-size: 2dvh;
            color: #4D5C44;
        }

        .warning {
            height: 3vh;
            width: 100%;
            display: flex;
            justify-content: center;
            color: #DB3A3A;
            font-size: 2dvh;
        }

        .allP2 {
            display: flex;
            align-items: center;
            margin-top: 5%;

            // border: 1px solid black;
            span {
                width: 15%;
                margin: 0 2%;
            }

            a {
                color: #DB3A3A;
                text-decoration: underline;
                cursor: pointer;
            }
        }

        .btn {
            width: 14%;
            height: 10%;
            border: 0.3vh solid #4D5C44;
            // border: 0;
            color: #4D5C44;
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
                scale: 0.95;
            }
        }

    }
}
</style>