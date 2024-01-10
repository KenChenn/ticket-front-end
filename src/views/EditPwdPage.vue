<template>
    <div class="main">
        <div class="up">
            <br>
            <h1 class="editP">編輯資訊</h1>
        </div>
        <div class="down">
            <div class="editSq">
                <br><br>
                <span class="spanP1">請輸入舊密碼</span>
                <br>
                <input type="text" class="allInput" v-model="nowPwd">
                <br>
                <span v-if="!isNowPwd" class="warning">請輸入舊密碼</span>
                <span v-if="!isCorrectNowPwd" class="warning">舊密碼輸入錯誤</span>
                <br>
                <span class="spanP2">輸入新密碼</span>
                <br>
                <input type="text" class="allInput" v-model="newPwd">
                <br>
                <span v-if="!isNewPwd" class="warning">請輸入新密碼</span>
                <span v-if="!isValidNewPwd" class="warning">請輸入 7 ~ 16 碼密碼格式</span>
                <span v-if="!isCorrectNewPwd" class="warning">舊密碼與新密碼一致</span>
                <br>
                <span class="spanP3">確認密碼</span>
                <br>
                <input type="text" class="allInput" v-model="againPwd">
                <br>
                <span v-if="!isAgainPwd" class="warning">請確認密碼</span>
                <span v-if="!isCorrectAgainPwd" class="warning">與新密碼輸入不一致</span>
                <br><br>
                <button type="button" class="btn" @click="changePwd()">確認</button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            nowPwd: "",
            newPwd: "",
            againPwd: "",

            isNowPwd: true,
            isNewPwd: true,
            isAgainPwd: true,
            isValidNewPwd: true,

            isCorrectNowPwd: true,
            isCorrectNewPwd: true,
            isCorrectAgainPwd: true,
        }
    },
    methods: {
        changePwd() {
            //確認輸入
            this.isNowPwd = !!this.nowPwd;
            this.isNewPwd = !!this.newPwd;
            this.isAgainPwd = !!this.againPwd;

            //確認密碼格式
            const pwd = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,16}$/
            this.isValidNewPwd = pwd.test(this.newPwd);

            //確認密碼
            if (this.newPwd != this.againPwd) {
                this.isCorrectAgainPwd = false
            } else {
                this.isCorrectAgainPwd = true
            }

            if (this.isValidNewPwd && this.isAgainPwd && this.nowPwd && this.newPwd && this.againPwd) {
                axios({
                    url: 'http://localhost:8080/api/user_pwd_change',
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: {
                        account: $cookies.get("account"),
                        oldPwd: this.nowPwd,
                        newPwd: this.newPwd,
                    },
                }).then(res => {
                    console.log(res.data.rtncode)
                    if (res.data.rtncode == "SUCCESSFUL") {
                        this.$router.push('/UserInfoPage')
                    } else if (res.data.rtncode == "PWD_NOT_CORRECT") {
                        this.isCorrectNowPwd = false
                    } else if (res.data.rtncode == "PLEASE_ENTER_NEW_PWD") {
                        this.isCorrectNewPwd = false
                    }
                })
            }
        }
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
            console.log(res.data.data)
        })
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
        height: 20%;

        .editP {
            color: #4D5C44;
            margin-left: 20%;
        }
    }

    .down {
        width: 100%;
        height: 80%;

        .editSq {
            width: 59%;
            height: 90%;
            background-color: #89A071;
            margin-left: 20%;
            margin-top: -1%;
            border-radius: 10px;

            .spanP1 {
                margin-left: 43%;
                font-size: 1.2rem;
                color: #4D5C44;
            }

            .spanP2 {
                margin-left: 44%;
                font-size: 1.2rem;
                color: #4D5C44;
            }

            .spanP3 {
                margin-left: 45%;
                font-size: 1.2rem;
                color: #4D5C44;
            }

            .allInput {
                height: 5%;
                width: 44%;
                border-radius: 10px;
                border: 1pt solid #FAF8ED;
                background-color: #FAF8ED;
                margin-left: 28%;
                margin-bottom: 3%;
            }

            .btn {
                width: 10%;
                height: 7%;
                background-color: #F5A352;
                border: 1pt solid #F5A352;
                color: #FAF8ED;
                border-radius: 10px;
                margin-left: 46%;
            }
        }
    }
}
</style>