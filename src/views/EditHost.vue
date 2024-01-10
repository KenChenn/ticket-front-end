<template >
    <div class="main">
        <div class="down">
            <h1 class="pp">編輯主辦單位</h1>
            <div class="edit">
                <br>
                <span class="allPP">主辦單位名稱*</span>
                <br>
                <input type="text" class="allInput" v-model="editname">
                <br>
                <span v-if="!isEntityName" class="warning">請輸入主辦單位名稱</span>
                <span v-if="isReapeatName" class="warning">主辦單位名稱已存在</span>
                <br><br>
                <span class="allP">mail*</span>
                <br>
                <input type="text" class="allInput" v-model="editemail">
                <br>
                <span v-if="!isEntityEmail" class="warning">請輸入mail</span>
                <span v-if="!isValidEmail" class="warning">mail 格式輸入錯誤</span>
                <br><br>
                <span class="allP">電話*</span>
                <br>
                <input type="number" class="allInput" v-model="editphone" @input="filterNonNumeric">
                <br>
                <span v-if="!isEntityPhone" class="warning">請輸入電話</span>
                <span v-if="!isValidPhone" class="warning">請輸入 10 碼手機格式</span>
                <br><br>
                <span class="allP">地址</span>
                <br>
                <input type="text" class="allInput" v-model="editaddress">
                <br><br>
                <span class="allPPP">官方網址</span>
                <br>
                <input type="text" class="allInput" v-model="editurl">
                <br><br>
                <span class="allPP">社交軟體連結</span>
                <br>
                <input type="text" class="allInput" v-model="editsns">
                <br><br>
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

        .edit {
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
    }
}
</style>