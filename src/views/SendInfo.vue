<template>
    <div class="main">
        <div class="pClass">發送訊息</div>
        <div class="infoSq">
            <div class="title">發送群體
            </div>
            <select name="" id="" class="selectClass" v-model="target">
                <option disabled value="">請選擇發送群體</option>
                <option v-for="item in subscribeList" :value="item">{{ item.split('.')[1] }}</option>
            </select>
            <div class="title">發送訊息內容</div>
            <textarea name="" id="" cols="30" rows="10" class="inputClass" v-model="message"></textarea>
            <button class="btn" @click="sendSubscribeMsg()">確認</button>
        </div>
    </div>
</template>
<script>
import Swal from 'sweetalert2'
import counter from '../stores/counter'


export default {
    data() {
        return {
            subscribeList: "",
            target: "",
            message: ""
        }
    },
    methods: {
        getSubscribeData() {
            fetch('http://localhost:8080/api/getAllSubscribe', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
                .then(response => response.json())
                .then(data => {
                    this.subscribeList = data.typeList
                    console.log(this.subscribeList);
                })
        },
        sendSubscribeMsg() {
            if (this.target.length <= 0) {
                console.log("請選擇發送群體");
                return;
            }
            if (this.message <= 0) {
                console.log("請選擇輸入訊息");
                return;
            }
            fetch('http://localhost:8080/api/SendSubscribeMsg', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    subscribe: this.target,
                    message: this.message
                })
            }).then(response => response.json())
                .then(res => {
                    if (res.rtncode == "SUCCESSFUL") {
                        Swal.fire({
                            title: "發送成功",
                            icon: "success",
                            color: "#4D5C44",
                            background: "#FAF8ED",
                            confirmButtonColor: "#748e63",
                        })
                    }
                })

            console.log(this.target);
            console.log(this.message);
        }
    },
    mounted() {
        this.getSubscribeData()
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
<style scoped lang="scss">
.main {
    .pClass {
        width: 70%;
        height: 10vh;
        margin-top: 10vh;
        // border: 1px solid black;
        margin-left: 15%;
        color: #c26202;
        font-size: 4dvh;
        display: flex;
        align-items: end;
    }

    .infoSq {
        width: 70%;
        height: 70vh;
        border: #F5A352 0.3vh solid;
        margin: auto;
        border-radius: 2vh;
        padding: 2%;
        display: block;
        justify-content: center;
        align-items: center;

        .title {
            width: 100%;
            font-size: 3dvh;
            margin: 1% 0;
            text-align: center;
            color: #4D5C44;
            // border: 1px solid black;
        }

        .selectClass {
            width: 50%;
            height: 10%;
            margin: 1% 25%;

            font-size: 3dvh;
            text-align: center;
            border: 0;
            border-bottom: #F5A352 0.3vh solid;
            background-color: #FAF8ED;
            color: #4D5C44;

            :focus {
                outline: none;
            }
        }

        .inputClass {
            width: 70%;
            height: 30%;
            margin-left: 15%;
            background-color: #FAF8ED;
            border: #F5A352 0.3vh solid;
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
            margin-top: 5%;
            font-size: 2.5dvh;
            transition: 0.1s linear;

            &:hover {
                transition: 0.2s linear;
                border: 0;
                background-color: #748E63;
                color: #FAF8ED;
                scale: 1.1;
            }

            &:active {
                scale: 0.95;
            }
        }
    }
}
</style>