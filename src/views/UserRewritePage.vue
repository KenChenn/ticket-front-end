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
                <span>
                    橘色為可更改
                </span>
            </div>
            <div class="reWriteSq">

                <div class="allP disable">帳號<br>
                    <input type="text" class="allInput disable" v-model="editedAccount" disabled>
                </div>
                <div class="allP">使用者名稱<br>
                    <input type="text" class="allInput" v-model="editedUser">
                    <div class="warning">
                        <span v-if="!isUsername">請輸入使用者名稱</span>
                        <span v-if="isReapeatUsername">此使用者名稱已被使用</span>
                        <span v-if="!isValidUsername">請輸入1 ~ 20位使用者名稱</span>
                    </div>
                </div>
                <div class="allP">
                    Email<br>
                    <input type="text" class="allInput" value="" v-model="editedEmail">
                    <div class="warning">
                        <span v-if="!isValidEmail">請輸入正確 Email 格式</span>
                    </div>
                </div>
                <div class="allP disable">生日<br>
                    <input type="date" class="allInput disable" disabled v-model="editedBirth">
                </div>
                <div class="allP">手機號碼<br>
                    <input type="text" class="allInput" value="" v-model="editedPhone" @input="filterNonNumeric">
                    <div class="warning">
                        <span v-if="!isValidPhoneNumber">請輸入 10 碼手機格式</span>
                    </div>
                </div>
                <button type="button" class="btn" @click="edit()">完成</button>

            </div>
        </div>
    </div>
</template>
<script>
import Swal from 'sweetalert2'
import counter from '../stores/counter'
export default {
    data() {
        return {
            editedUser: "",
            editedEmail: "",
            editedPhone: "",
            editedBirth: "",
            editedAccount: $cookies.get("account"),

            isUsername: true,
            isValidEmail: true,
            isValidUsername: true,
            isValidPhoneNumber: true,
            isReapeatUsername: false,

        }
    },

    methods: {
        edit() {
            //確認使用者名稱格式
            const username = /^[\w\p{Han}\p{P}]{1,20}$/
            this.isValidUsername = username.test(this.editedUser);
            //確認mail格式
            const mail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
            this.isValidEmail = mail.test(this.editedEmail);
            //確認手機號碼格式
            const tel = /^09\d{8}$/
            this.isValidPhoneNumber = tel.test(this.editedPhone);

            if (this.isUsername && this.isValidEmail && this.isValidPhoneNumber) {
                fetch('http://localhost:8080/api/user_data_update',
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        credentials: 'include',
                        body: JSON.stringify({
                            account: $cookies.get("account"),
                            username: this.editedUser,
                            email: this.editedEmail,
                            phone: this.editedPhone,
                        }),
                    }).then(response => response.json())
                    .then(res => {
                        console.log(res)
                        if (res.rtncode == "USERNAME_ALREADY_IN_USE") {
                            this.isReapeatUsername = true
                        } else {
                            this.isReapeatUsername = false
                        };
                        if (res.rtncode == "SUCCESSFUL") {
                            console.log(res);
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
                                    counter().username = res.data.username
                                })
                            Swal.fire({
                                title: "更改成功",
                                icon: "success",
                                color: "#4D5C44",
                                background: "#FAF8ED",
                                confirmButtonColor: "#748e63"
                            });
                            this.$router.push('/UserInfoPage')
                        }
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
                console.log(res.data)
                this.editedUser = res.data.username
                this.editedEmail = res.data.email
                this.editedBirth = res.data.bornDate
                this.editedPhone = res.data.phone
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
<style lang="scss" scoped>
.main {
    background-color: #FAF8ED;

    .down {

        .title {
            width: 70%;
            height: 10vh;
            margin-top: 10vh;
            margin-left: 15%;
            color: #4D5C44;
            font-size: 4dvh;
            // border: 1px solid black;
            display: flex;
            align-items: end;
            justify-content: space-between;

            span {
                font-size: 3dvh;
                color: #F5A352;
            }
        }

        .reWriteSq {
            width: 70%;
            height: 70vh;
            border: 0.5vh solid#89A071;
            margin: auto;
            border-radius: 2vh;
            padding: 2%;
            display: flex;
            flex-wrap: wrap;


            .allP {
                width: 50%;
                font-size: 3dvh;
                color: #F5A352;
            }

            .allInput {
                width: 80%;
                font-size: 3dvh;
                border: 0;
                color: #F5A352;
                background-color: #FAF8ED;
                border-bottom: 0.3vh solid#89A071;
            }

            .disable {
                color: #b7c4a8;
            }

            .warning {
                width: 80%;
                height: 3vh;
                text-align: center;
                color: #DB3A3A;
                font-size: 2dvh;
                // border: black solid 1px;
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
                    scale: 1.1;
                }

                &:active {
                    background-color: #c26202;
                    scale: 0.95;
                }
            }
        }
    }
}
</style>