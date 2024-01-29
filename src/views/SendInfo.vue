<template>
    <div class="main">
        <br><br><br><br>
        <h2 class="pClass">發送訊息</h2>
        <div class="infoSq">
            <br>
            <span class="sendPersonP">發送群體</span>
            <br>
            <select name="" id="" class="selectClass" v-model="target">
                <option disabled value="">請選擇發送群體</option>
                <option v-for="item in subscribeList"  :value="item" >{{ item.split('.')[1] }}</option>
            </select>
            <br><br>
            <span class="sendMessegeP" >發送訊息內容</span>
            <br>
            <input type="text" class="inputClass" v-model="message">
            <br>
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
            subscribeList:"",
            target:"",
            message:""
        }
    },
    methods: {
        getSubscribeData(){
            fetch('http://localhost:8080/api/getAllSubscribe', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
                .then(response => response.json())
                .then(data =>{
                    this.subscribeList = data.typeList
                    console.log(this.subscribeList);
                })
        },
        sendSubscribeMsg(){
            if(this.target.length<=0){
                console.log("請選擇發送群體");
                return;
            }
            if(this.message<=0){
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
                    message:this.message
                })
            }).then(response => response.json())
                .then(res => {
                    if(res.rtncode == "SUCCESSFUL"){
                        Swal.fire({
                            title:"發送成功",
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
    height: 100vh;
    width: 100vw;

    .pClass {
        margin-left: 21%;
        color: #4D5C44;
    }

    .infoSq {
        height: 70%;
        width: 60%;
        margin-left: 20%;
        background-color: #FFC68D;
        border-radius: 15px;

        .sendPersonP {
            color: #4D5C44;
            font-size: 1.2rem;
            margin-left: 45%;
        }

        .sendMessegeP {
            color: #4D5C44;
            font-size: 1.17rem;
            margin-left: 42.5%;

        }
        .selectClass{
            width: 75%;
            height: 8%;
            margin-left: 12%;
            border-radius: 15px;
            background-color: #FAF8ED;
            border: 1pt solid #FAF8ED;
            color: #4D5C44;
        }
        .inputClass{
            width: 75%;
            height: 8%;
            margin-left: 12%;
            border-radius: 15px;
            background-color: #FAF8ED;
            border: 1pt solid #FAF8ED;
        }
        .btn{
            width: 8%;
            height: 10%;
            background-color: #748E63;
            color: #FAF8ED;
            border-radius: 15px;
            margin-top: 20%;
            margin-left: 45%;
        }
    }
}</style>