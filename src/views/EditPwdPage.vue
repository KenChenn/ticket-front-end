<template>
    <div class="main">
        <div class="up">
            <div class="title">
                修改密碼
            </div>
        </div>
        <div class="down">
            <div class="editSq">
                <span class="spanP1">請輸入舊密碼</span>
                <input type="text" class="allInput" v-model="nowPwd">
                <div class="warning">
                    <span v-if="!isNowPwd">請輸入舊密碼</span>
                </div>
                <div class="warning">
                    <span v-if="!isCorrectNowPwd">舊密碼輸入錯誤</span>
                </div>
                <span class="spanP2">輸入新密碼</span>
                <input type="text" class="allInput" v-model="newPwd">
                <div class="warning">
                    <span v-if="!isNewPwd">請輸入新密碼</span>
                </div>
                <div class="warning">
                    <span v-if="!isValidNewPwd">請輸入 7 ~ 16 碼包含英文數字</span>
                    <span v-if="!isCorrectNewPwd">舊密碼與新密碼一致</span>
                </div>
                <span class="spanP3">確認密碼</span>

                <input type="text" class="allInput" v-model="againPwd">
                <div class="warning">
                    <span v-if="!isAgainPwd">請確認密碼</span>
                    <span v-if="!isCorrectAgainPwd">與新密碼輸入不一致</span>
                </div>
                <button type="button" class="btn" @click="changePwd()">確認</button>
            </div>
        </div>
    </div>
</template>
<script>
import counter from '../stores/counter'
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
                fetch('http://localhost:8080/api/user_pwd_change',
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        credentials: 'include',
                        body: JSON.stringify({
                            account: $cookies.get("account"),
                            oldPwd: this.nowPwd,
                            newPwd: this.newPwd,
                        }),
                    }).then(response => response.json())
                    .then(res => {
                        console.log(res)
                        if (res.rtncode == "SUCCESSFUL") {
                            this.$router.push('/UserInfoPage')
                        }
                        if (res.rtncode == "PWD_NOT_CORRECT") {
                            this.isCorrectNowPwd = false
                        } else {
                            this.isCorrectNowPwd = true
                        }
                        if (res.rtncode == "PLEASE_ENTER_NEW_PWD") {
                            this.isCorrectNewPwd = false
                        } else {
                            this.isCorrectNewPwd = true
                        }
                    })
            }
        }
    },
    mounted() {
        fetch('http://localhost:8080/api/get_user_basic_data',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    account: $cookies.get("account"),
                }),
            }).then(response => response.json())
            .then(res => {
                console.log(res)
                console.log($cookies.get("account"))
            })
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
<style lang="scss">
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
        justify-content: space-between;
    }

    .editSq {
        width: 70%;
        height: 70vh;
        border: 0.5vh solid#89A071;
        border-radius: 2vh;
        margin-left: 15%;
        padding: 3% 0;

        .spanP1 {
            width: 100%;
            display: flex;
            justify-content: center;
            // border: 1px black solid;
            font-size: 3dvh;
            color: #4D5C44;
        }

        .spanP2 {
            width: 100%;
            display: flex;
            justify-content: center;
            font-size: 3dvh;
            color: #4D5C44;
        }

        .spanP3 {
            width: 100%;
            display: flex;
            justify-content: center;
            font-size: 3dvh;
            color: #4D5C44;
        }

        .allInput {
            width: 50%;
            font-size: 2.5dvh;
            margin-bottom: 1%;
            border: 0;
            background-color: #FAF8ED;
            color: #4D5C44;
            border-bottom: 0.3vh solid #89A071;
            margin-left: 25%;
            text-align: center;
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

            &:hover {
                transition: 0.1s linear;
                color: #FAF8ED;
                border: 0;
                background-color: #F5A352;
                scale: 1.1;
            }

            &:active {
                background-color: #c26202;
                scale: 0.95;
            }
        }

        .warning {
            height: 5%;
            width: 100%;
            display: flex;
            justify-content: center;
            color: #DB3A3A;
            font-size: 2dvh;
            margin-bottom: 1%;
            // border: 1px solid black;
        }
    }
}
</style>