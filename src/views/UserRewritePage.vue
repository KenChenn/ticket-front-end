<template >
    <div class="main">
        <!-- <div class="up">
            <i class="fa-solid fa-magnifying-glass"></i>
        <input type="text" class="search">
        <p class="favorateP" @click="this.goFavorate()">最愛清單</p>
        <p class="orderP">訂單查詢</p>
        <p class="logoutP">登出</p>
        </div> -->
        <div class="down">
            <div class="title">
                編輯資訊
            </div>
            <div class="reWriteSq">

                <span class="allP">使用者名稱</span>
                <input type="text" class="allInput" v-model="editedUser">
                <div class="warning">
                    <span v-if="!isUsername">請輸入使用者名稱</span>
                    <span v-if="isReapeatUsername">此使用者名稱已經註冊過</span>
                </div>
                <span class="allP">Email</span>
                <input type="text" class="allInput" value="" v-model="editedEmail">
                <div class="warning">
                    <span v-if="!isValidEmail">請輸入正確 Email 格式</span>
                </div>
                <span class="allP">生日</span>
                <input type="date" class="allInput" disabled v-model="editedBirth" style="text-align: center;">
                <span class="allP">手機號碼</span>
                <input type="text" class="allInput" value="" v-model="editedPhone" @input="filterNonNumeric">
                <div class="warning">
                    <span v-if="!isValidPhoneNumber">請輸入 10 碼手機格式</span>
                </div>
                <br> <button type="button" class="btn" @click="edit()">完成</button>

            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            editedUser: "",
            editedEmail: "",
            editedPhone: "",
            editedBirth: "",

            isUsername: true,
            isValidEmail: true,
            isValidPhoneNumber: true,
            isReapeatUsername: false,

        }
    },

    methods: {
        edit() {
            this.isUsername = !!this.editedUser;
            //確認mail格式
            const mail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
            this.isValidEmail = mail.test(this.editedEmail);
            //確認手機號碼格式
            const tel = /^09\d{8}$/
            this.isValidPhoneNumber = tel.test(this.editedPhone);

            if (this.isUsername && this.isValidEmail && this.isValidPhoneNumber) {
                axios({
                    url: 'http://localhost:8080/api/user_data_update',
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: {
                        account: $cookies.get("account"),
                        username: this.editedUser,
                        email: this.editedEmail,
                        phone: this.editedPhone,
                    },
                }).then(res => {
                    console.log(res.data)
                    if (res.data.rtncode == "USERNAME_ALREADY_IN_USE") {
                        this.isReapeatUsername = true
                    } else {
                        this.isReapeatUsername = false
                    };
                    if (res.data.rtncode == "SUCCESSFUL") {
                        this.$router.push('/UserInfoPage')
                        console.log("更改成功");
                    }
                    // this.user = res.data.data.username
                    // this.email = res.data.data.email
                    // this.birth = res.data.data.bornDate
                    // this.phone = res.data.data.phone
                })

            }
        },
        filterNonNumeric(event) {
            // console.log(event.target.value)
            // 使用正则表达式过滤非数字字符
            this.editedPhone = event.target.value.replace(/[^\d]/g, '')
        },
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
            // console.log(res.data.data)
            this.editedUser = res.data.data.username
            this.editedEmail = res.data.data.email
            this.editedBirth = res.data.data.bornDate
            this.editedPhone = res.data.data.phone
        })
    }
}
</script>
<style lang="scss" scoped>
.main {
    background-color: #FAF8ED;

    .up {
        width: 100%;
        height: 11%;
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

        .reWriteSq {
            width: 70%;
            height: 70vh;
            border: 0.5vh solid#89A071;
            margin: auto;
            border-radius: 2vh;
            padding: 3% 0;

            .allInput {
                width: 50%;
                margin-left: 25%;
                font-size: 2.5dvh;
                margin-bottom: 1%;
                border: 0;
                color: #4D5C44;
                background-color: #FAF8ED;
                border-bottom: 0.3vh solid#89A071;
            }

            .allP {
                height: 5vh;
                width: 100%;
                display: flex;
                justify-content: center;
                font-size: 3dvh;
                color: #4D5C44;
            }

            .warning {
                height: 5%;
                width: 100%;
                display: flex;
                justify-content: center;
                color: #DB3A3A;
                font-size: 2dvh;
            }

            .btn {
                width: 14%;
                height: 7%;
                background-color: #F9B572;
                border: 0;
                color: #FAF8ED;
                border-radius: 10vh;
                margin-left: 43%;
                margin-bottom: 3%;
                font-size: 2.5dvh;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }
}
</style>