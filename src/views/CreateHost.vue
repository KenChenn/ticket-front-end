<template>
    <div class="main">
        <div class="down">
            <div class="title">
                建立主辦單位
                <span>
                    *為必填
                </span>
            </div>
            <div class="create">
                <div class="allP">
                    <span>
                        主辦單位名稱*
                    </span>
                    <input type="text" class="allInput" v-model="name">
                    <div v-if="!isEntityName" class="warning">請輸入主辦單位名稱</div>
                    <div v-if="isReapeatName" class="warning">主辦單位名稱已存在</div>
                </div>
                <div class="allP">
                    <span>
                        mail*
                    </span>
                    <input type="text" class="allInput" v-model="email">
                    <div v-if="!isEntityEmail" class="warning">請輸入mail</div>
                    <div v-if="!isValidEmail" class="warning">mail格式輸入錯誤</div>
                </div>
                <div class="allP">
                    <span>
                        電話*
                    </span>
                    <input type="text" class="allInput" v-model="phone" @input="filterNonNumeric">
                    <div v-if="!isEntityPhone" class="warning">請輸入電話</div>
                    <div v-if="!isValidPhone" class="warning">請輸入 10 碼手機格式</div>
                </div>
                <div class="allP">
                    <span>
                        地址
                    </span>
                    <input type="text" class="allInput" v-model="address">
                </div>
                <div class="allP">
                    <span>
                        官方網址
                    </span>
                    <input type="text" class="allInput" v-model="url">
                </div>
                <div class="allP">
                    <span>
                        社交軟體連結
                    </span>
                    <input type="text" class="allInput" v-model="sns">
                </div>
                <button type="button" class="btn" @click="createHost()">確認</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            name: "",
            email: "",
            phone: "",
            address: "",
            url: "",
            sns: "",

            //確認必填是否輸入
            isEntityName: true,
            isEntityEmail: true,
            isEntityPhone: true,

            //確認格式
            isValidEmail: true,
            isValidPhone: true,

            isReapeatName: false
        }
    },
    methods: {
        createHost() {
            //確認必填是否輸入
            this.isEntityName = !!this.name
            this.isEntityEmail = !!this.email
            this.isEntityPhone = !!this.phone

            //確認mail格式
            const mail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
            this.isValidEmail = mail.test(this.email);
            //確認手機號碼格式
            const tel = /^09\d{8}$/
            this.isValidPhone = tel.test(this.phone);

            if (this.isEntityName && this.isEntityEmail && this.isEntityPhone && this.isValidEmail && this.isValidPhone) {
                fetch('http://localhost:8080/api/add_organizer',
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        credentials: 'include',
                        body: JSON.stringify({
                            name: this.name,
                            email: this.email,
                            phone: this.phone,
                            address: this.address,
                            url: this.url,
                            sns: this.sns,
                        }),
                    }).then(response => response.json())
                    .then(res => {
                        console.log(res.rtncode)
                        if (res.rtncode == "SUCCESSFUL") {
                            console.log("新增成功");
                            this.$router.push('/ManageHostPage');
                        } else if (res.rtncode == "ORGANIZER_EXISTED") {
                            this.isReapeatName = true
                        } else if (res.rtncode == "PLEASE_LOGIN_ADMIN_ACCOUNT_FIRST") {
                            alert("請先登入");
                            this.$router.push('/AdminLoginPage');
                        } else {
                            alert("新增失敗");
                            return;
                        }
                    })
            }
        },
        filterNonNumeric(event) {
            // console.log(event.target.value)
            // 使用正则表达式过滤非数字字符
            this.phone = event.target.value.replace(/[^\d]/g, '')
        },
    },
    mounted() {

    }

}
</script>
<style lang="scss" scoped>
.main {
    width: 100%;
    height: 100%;

    .down {
        width: 100%;
        height: 100%;

        .title {
            width: 70%;
            height: 10vh;
            margin-left: 15%;
            color: #c26202;
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

        .create {
            width: 70%;
            height: 80%;
            padding: 3%;
            border: #F5A352 0.3vh solid;
            border-radius: 2vh;
            margin: auto;
            display: flex;
            flex-wrap: wrap;
        }


        .allP {
            width: 50%;
            color: #4D5C44;
            font-size: 3dvh;
            // border: 1px black solid;

            span {
                width: 100%;
                height: 30%;
                display: flex;
                // border: 1px black solid;
            }
        }


        .allInput {
            width: 80%;
            font-size: 3dvh;
            border: 0;
            background-color: #FAF8ED;
            border-bottom: #F5A352 0.3vh solid;

            &:focus {
                outline: none;
            }
        }

        .btn {
            height: 10%;
            width: 14%;
            border: 0.3vh solid #F5A352;
            background-color: #FAF8ED;
            color: #F5A352;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 1.5vh;
            margin: auto;
            font-size: 2.5dvh;

            &:hover {
                transition: 0.1s linear;
                border: 0;
                background-color: #748E63;
                color: #FAF8ED;
                scale: 1.1;
            }

            &:active {
                scale: 0.95;
                background-color: #4D5C44
            }
        }

        .warning {
            width: 100%;
            color: #DB3A3A;
            font-size: 2dvh;
            // border: 1px black solid;
        }
    }
}
</style>