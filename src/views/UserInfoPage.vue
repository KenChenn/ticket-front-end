<template lang="">
<div class="main">
    <div class="down">
        <div class="title">
                個人資料
            </div>
            <div class="info">           
            <span class="spanP">使用者名稱</span>
            <span class="infoSpan">{{this.user}}</span>
                        
            <span class="spanP">Email</span>
            <span class="infoSpan">{{this.email}}</span>
                        
            <span class="spanP">生日</span>
            <span class="infoSpan">{{this.birth}}</span>
                        
            <span class="spanP">電話</span>
            <span class="infoSpan">{{this.phone}}</span>
                        
            <div class="btnArea">
                <button type="button" class="btn" @click="this.goUserRewrite()">編輯</button>
                <button type="button" class="btn" @click="this.goEditPwdPage()">修改密碼</button>
            </div>
        <!-- <UserRewritePage v-bind:user="this.user" :email="this.email" :birth="this.birth" :phone="this.phone" /> -->
        </div>
    </div>
</div>
</template>
<script>
import counter from '../stores/counter'
// import UserRewritePage from './UserRewritePage.vue'
export default {
    data() {
        return {
            user: "",
            email: "",
            birth: "",
            phone: "",
        }
    },
    methods: {
        goUserRewrite() {
            this.$router.push('/UserRewritePage')
        },
        goEditPwdPage() {
            this.$router.push('/EditPwdPage')
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
                this.user = res.data.username
                this.email = res.data.email
                this.birth = res.data.bornDate
                this.phone = res.data.phone
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
    
    // components: {
    //     UserRewritePage
    // }
}
</script>
<style lang="scss" scoped>
.main {
 
    .down {
        width: 100%;
        height: 89%;

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
        }

        .info {
            width: 70%;
            height: 70vh;
            border: 0.5vh solid#89A071;
            margin: auto;
            border-radius: 2vh;
            padding: 3% 0;
        }

        .spanP {
            height: 5vh;
            width: 100%;
            display: flex;
            justify-content: center;
            font-size: 3dvh;
            color: #4D5C44;
        }

        .infoSpan {
            height: 5vh;
            width: 100%;
            display: flex;
            justify-content: center;
            font-size: 2.5dvh;
            color: #4D5C44;
            margin-bottom: 1%;
        }

        .btnArea {
            width: 70%;
            height: 5vh;
            margin-left: 15%;
            display: flex;
            justify-content: space-around;

            // border: black 1px solid;
            .btn {
                width: 20%;
                height: 100%;
                background-color: #F9B572;
                border: 0;
                color: #FAF8ED;
                border-radius: 10vh;
                font-size: 2.5dvh;
                display: flex;
                justify-content: center;
                align-items: center;
                transition: 0.1s linear;
                &:hover {
                    transition: 0.2s linear;
                    scale: 1.05;
                    background-color: #FFC68D;
                }

                &:active {
                    scale: 0.95;
                    background-color: #c26202;
                }
            }


        }
    }
}
</style>