<template lang="">
<div class="main">
    <div class="down">
        <h1 class="pp">建立主辦單位</h1>
        <span class="spanP">*為必填</span>
        <div class="create">
            <br>
            <span class="allPP">主辦單位名稱*</span>
            <br>
            <input type="text" class="allInput" v-model="name">
            <span v-if="!isEntityName" class="warning">請輸入主辦單位名稱</span>
            <span v-if="isReapeatName" class="warning">主辦單位名稱已存在</span>
            <br><br>
            <span class="allP">mail*</span>
            <br>
            <input type="text" class="allInput" v-model="email">
            <span v-if="!isEntityEmail" class="warning">請輸入mail</span>
            <span v-if="!isValidEmail" class="warning">mail 格式輸入錯誤</span>
            <br><br>
            <span class="allP">電話*</span>
            <br>
            <input type="text" class="allInput" v-model="phone" @input="filterNonNumeric">
            <span v-if="!isEntityPhone" class="warning">請輸入電話</span>
            <span v-if="!isValidPhone" class="warning">請輸入 10 碼手機格式</span>
            <br><br>
            <span class="allP">地址</span>
            <br>
            <input type="text" class="allInput" v-model="address">
            <br><br>
            <span class="allPPP">官方網址</span>
            <br>
            <input type="text" class="allInput" v-model="url">
            <br><br>
            <span class="allPP">社交軟體連結</span>
            <br>
            <input type="text" class="allInput" v-model="sns">
            <br><br>
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
    width: 100vw;
    height: 100vh;
    background-color: #FAF8ED;

    .down {
        width: 100%;
        height: 100%;
        position: relative;

        .pp {
            margin-left: 27%;
            color: #4D5C44;
        }

        .create {
            width: 48%;
            height: 75%;
            background-color: #F5BF89;
            margin: auto;
            margin-top: -2%;
            border-radius: 10px;
        }

        .spanP {
            position: absolute;
            top: 3.5%;
            left: 68%;
            color: #4D5C44;
        }

        .allP {
            margin-left: 48%;
            color: #4D5C44;
        }

        .allPP {
            margin-left: 43%;
            color: #4D5C44;
        }

        .allPPP {
            margin-left: 46%;
            color: #4D5C44;
        }

        .allInput {
            width: 47%;
            height: 4%;
            margin-left: 28%;
            border-radius: 10px;
            background-color: #FAF8ED;
            border: 1pt solid #FAF8ED;
        }

        .btn {
            background-color: #89A071;
            border: 1pt solid #89A071;
            color: #FAF8ED;
            border-radius: 10px;
            margin-left: 48%;
        }

        .warning {
            margin-left: 43%;
            color: #4D5C44;
        }
    }
}
</style>