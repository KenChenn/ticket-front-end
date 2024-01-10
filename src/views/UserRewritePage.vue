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
            <h1 class="ppp">編輯資訊</h1>
            <div class="reWriteSq">

                <br>
                <span class="allPP">使用者名稱</span>
                <br>
                <input type="text" class="allInput" v-model="editedUser">
                <span v-if="!isUsername" class="warning">請輸入使用者名稱</span>
                <span v-if="isReapeatUsername" class="warning">此使用者名稱已經註冊過</span>
                <br>
                <span class="allP">Email</span>
                <br>
                <input type="text" class="allInput" value="" v-model="editedEmail">
                <span v-if="!isValidEmail" class="warning">請輸入正確 Email 格式</span>
                <br>
                <span class="allP">生日</span>
                <br>
                <input type="date" class="allInput" disabled v-model="editedBirth">
                <br>
                <span class="allPP">手機號碼</span>
                <br>
                <input type="text" class="allInput" value="" v-model="editedPhone" @input="filterNonNumeric">
                <span v-if="!isValidPhoneNumber" class="warning">請輸入 10 碼手機格式</span>
                <br><br>
                <button type="button" class="btn" @click="edit()">完成</button>

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
            editedBirth:"",

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
.main{
    width: 100vw;
    height: 100vh;
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
        width: 100%;
        height: 89%;

        .ppp {
            margin-left: 27%;
            color: #4D5C44;
        }

        .reWriteSq {
            width: 48%;
            height: 75%;
            background-color: #89A071;
            margin: auto;
            margin-top: -10px;
            border-radius: 15px;

            .signUp {
                width: 48%;
                height: 75%;
                background-color: #89A071;
                margin: auto;
                margin-top: -10px;
                border-radius: 15px;
            }

            .ppp {
                margin-left: 27%;
                color: #4D5C44;
            }

            .allInput {
                width: 47%;
                height: 6%;
                margin-left: 28%;
                border-radius: 15px;
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
            }

            .btn {
                background-color: #F9B572;
                border: 1pt solid #F9B572;
                color: #FAF8ED;
                border-radius: 15px;
                margin-left: 48%;

            }

            .fa-solid {
                position: absolute;
                left: 61.5%;
                top: 65%
            }
        }
    }
}
</style>