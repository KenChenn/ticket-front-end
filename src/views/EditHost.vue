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
                <div class="allP">
                    <span>
                        主辦單位名稱*
                    </span>
                    <input type="text" class="allInput" v-model="editname">
                    <div v-if="!isEntityName" class="warning">請輸入主辦單位名稱</div>
                    <div v-if="isReapeatName" class="warning">主辦單位名稱已存在</div>
                </div>
                <div class="allP">
                    <span>
                        mail*
                    </span>
                    <input type="text" class="allInput" v-model="editemail">
                    <div v-if="!isEntityEmail" class="warning">請輸入mail</div>
                    <div v-if="!isValidEmail" class="warning">mail 格式輸入錯誤</div>
                </div>
                <div class="allP">
                    <span>
                        電話*
                    </span>
                    <input type="number" class="allInput" v-model="editphone" @input="filterNonNumeric">
                    <div v-if="!isEntityPhone" class="warning">請輸入電話</div>
                    <div v-if="!isValidPhone" class="warning">請輸入 10 碼手機格式</div>
                </div>
                <div class="allP">
                    <span>
                        地址
                    </span>
                    <input type="text" class="allInput" v-model="editaddress">
                </div>
                <div class="allP">
                    <span>
                        官方網址
                    </span>
                    <input type="text" class="allInput" v-model="editurl">
                </div>
                <div class="allP">
                    <span>
                        社交軟體連結
                    </span>
                    <input type="text" class="allInput" v-model="editsns">
                </div>
                <button type="button" class="btn" @click="edit()">確認</button>
            </div>
        </div>
    </div>
</template>
<script>
import counter from '../stores/counter'
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
                console.log(res.organizer)
                console.log(this.$route.params.id)
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
    },
    created() {
        // 創建頁面時設定
        counter().setManager({});
    },
    beforeRouteLeave(to, from, next) {
        // 離開頁面時清除
        counter().setManager(null);
        next();
    },
}
</script>
<style lang="scss" scoped>
.main {
    width: 100%;
    height: 100%;
    margin-top: 10vh;
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
                font-size: 3dvh;
            }
        }


        .edit {
            width: 70%;
            height: 70vh;
            padding: 3%;
            border: #F5A352 0.3vh solid;
            border-radius: 2vh;
            margin: auto;
            display: flex;
            flex-wrap: wrap;
            // border: 1px solid black;
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
            // border: 1px solid black;
        }
    }
}
</style>