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
                <div class="allP">主辦單位名稱*</div>
                <input type="text" class="allInput" v-model="name">
                <div v-if="!isEntityName" class="warning">請輸入主辦單位名稱</div>
                <div v-if="isReapeatName" class="warning">主辦單位名稱已存在</div>
                <div class="allP">mail*</div>
                <input type="text" class="allInput" v-model="email">
                <div v-if="!isEntityEmail" class="warning">請輸入mail</div>
                <div v-if="!isValidEmail" class="warning">mail 格式輸入錯誤</div>

                <div class="allP">電話*</div>

                <input type="text" class="allInput" v-model="phone" @input="filterNonNumeric">
                <div v-if="!isEntityPhone" class="warning">請輸入電話</div>
                <div v-if="!isValidPhone" class="warning">請輸入 10 碼手機格式</div>

                <div class="allP">地址</div>

                <input type="text" class="allInput" v-model="address">

                <div class="allP">官方網址</div>

                <input type="text" class="allInput" v-model="url">

                <div class="allP">社交軟體連結</div>

                <input type="text" class="allInput" v-model="sns">

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

        .create {
            width: 70%;
            height: 80%;
            padding-top: 1%;
            background-color: #F5BF89;
            margin: auto;
            border-radius: 2vh;
        }


        .allP {
            width: 100%;
            height: 6%;
            color: #4D5C44;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 2.5dvh;
        }


        .allInput {
            width: 50%;
            height: 5%;
            margin-left: 25%;
            border-radius: 2vh;
            background-color: #FAF8ED;
            border: 0;
            text-align: center;
        }

        .btn {
            height: 5%;
            width: 10%;
            margin-top: 1%;
            background-color: #89A071;
            border: 0;
            color: #FAF8ED;
            border-radius: 2vh;
            margin-left: 45%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .warning {
            height: 5%;
            width: 100%;
            display: flex;
            justify-content: center;
            color: #DB3A3A;            
            font-size: 2dvh;
        }
    }
}
</style>