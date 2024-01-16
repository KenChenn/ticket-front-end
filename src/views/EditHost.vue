<template >
    <div class="main">
        <div class="down">
            <div class="title">
                編輯主辦單位
                <span>
                    *為必填
                </span>
            </div>
            <div class="edit">
                <div class="allP">主辦單位名稱*</div>
                <input type="text" class="allInput" v-model="editname">
                <div v-if="!isEntityName" class="warning">請輸入主辦單位名稱</div>
                <div v-if="isReapeatName" class="warning">主辦單位名稱已存在</div>
                <div class="allP">mail*</div>
                <input type="text" class="allInput" v-model="editemail">
                <div v-if="!isEntityEmail" class="warning">請輸入mail</div>
                <div v-if="!isValidEmail" class="warning">mail 格式輸入錯誤</div>
                <div class="allP">電話*</div>
                <input type="number" class="allInput" v-model="editphone" @input="filterNonNumeric">
                <div v-if="!isEntityPhone" class="warning">請輸入電話</div>
                <div v-if="!isValidPhone" class="warning">請輸入 10 碼手機格式</div>
                <div class="allP">地址</div>
                <input type="text" class="allInput" v-model="editaddress">
                <div class="allP">官方網址</div>
                <input type="text" class="allInput" v-model="editurl">
                <div class="allP">社交軟體連結</div>
                <input type="text" class="allInput" v-model="editsns">
                <button type="button" class="btn" @click="edit()">確認</button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            nowId: 0,
            id: 0,
            editname: "",
            editemail: "",
            editphone: "",
            editaddress: "",
            editurl: "",
            editsns: "",

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
        edit() {
            //確認必填是否輸入
            this.isEntityName = !!this.editname
            this.isEntityEmail = !!this.editemail
            this.isEntityPhone = !!this.editphone

            //確認mail格式
            const mail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
            this.isValidEmail = mail.test(this.editemail);
            //確認手機號碼格式
            const tel = /^09\d{8}$/
            this.isValidPhone = tel.test(this.editphone);

            if (this.isEntityName && this.isEntityEmail && this.isEntityPhone && this.isValidEmail && this.isValidPhone) {
                fetch('http://localhost:8080/api/update_organizer',
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        credentials: 'include',
                        body: JSON.stringify({
                            id: this.id,
                            name: this.editname,
                            email: this.editemail,
                            phone: this.editphone,
                            address: this.editaddress,
                            url: this.editurl,
                            sns: this.editsns,
                        }),
                    }).then(response => response.json())
                    .then(res => {
                        console.log(res.rtncode)
                        if (res.rtncode == "SUCCESSFUL") {
                            console.log("更新成功");
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
            this.editphone = event.target.value.replace(/[^\d]/g, '')
        },
    },
    mounted() {
        fetch('http://localhost:8080/api/get_organizer_data',
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
            }).then(response => response.json())
            .then(res => {
                // console.log(res.organizer)
                this.nowId = this.$route.params.id
                res.organizer.forEach(host => {
                    if (host.id == this.nowId) {
                        // console.log(host);
                        this.id = host.id
                        this.editname = host.name
                        this.editemail = host.email
                        this.editphone = host.phone
                        this.editaddress = host.address
                        this.editurl = host.url
                        this.editsns = host.sns
                    }
                });
            })
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


        .edit {
            width: 70%;
            height: 80%;
            padding-top: 1%;
            background-color: #F5BF89;
            margin-left:15%;
            border-radius: 2vh;
            // border: 1px solid black;
        }

        .allP {
            width: 100%;
            height: 6%;
            color: #4D5C44;
            // border: 1px solid black;
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
            border: 1pt solid #FAF8ED;
            text-align: center;
        }

        .btn {
            height: 5%;
            width: 10%;
            margin-top: 1%;
            background-color: #89A071;
            border: 1pt solid #89A071;
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
            // margin-left: 45%;
            color: #DB3A3A;
            font-size: 2dvh;
            // border: 1px solid black;
        }
    }
}
</style>