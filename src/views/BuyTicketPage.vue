<template >
    <!-- <button @click="this.goNotice()">暫時用注意事項</button>
    <button @click="this.goBuyNotice()">暫時用購買提醒</button>
    <button @click="this.goGetTicketPage()">暫時取票說明</button>
    <button @click="this.goCencelTicketPage()">退票規定</button> -->
    <div class="up">
        <div class="showArea">
            <div class="showImg">
                <!-- 節目圖片 -->
                <img src="../../public/material/ヘッダー_kktix_1200-630_medium.png">
            </div>

            <!-- 節目資訊 -->
            <div class="showInfo">
                <i class="fa-regular fa-calendar-days"></i>
                <!-- 時間 -->
                <span>
                    2024/01/31(周三) 19:30(+0800)
                </span>
                <br>
                <i class="fa-solid fa-location-dot"></i>
                <!-- 地點 -->
                <span>
                    Legacy Taipei / 台北市中正區八德路一段一號
                </span>
                <br>
                <i class="fa-solid fa-user"></i>
                <!-- 主辦 -->
                <span>
                    主辦單位 躍演
                </span>
            </div>

        </div>
    </div>
    <div class="down">
        <div class="title">
            <span>票種</span>
            <span>售價</span>
            <span></span>
        </div>

        <div class="ticket">

            <span>預售票</span>
            <span>TWD$1200</span>
            <button class="btn">購買</button>
        </div>
        <br>
    </div>
</template>
<script>
import counter from '../stores/counter';
export default {
    data() {
        return {

        }
    },
    methods: {
        goNotice() {
            this.$router.push('/TicketNoticePage')
        },
        goBuyNotice() {
            this.$router.push('/BuyNoticePage')
        },
        goGetTicketPage() {
            this.$router.push('/GetTicketPage')
        },
        goCencelTicketPage() {
            this.$router.push('/CencelTicketPage')
        },
    },
    mounted() {

    },
    created() {
        // 創建頁面時設定
        counter().setHeaderLink({});
    },
    beforeRouteLeave(to, from, next) {
        // 離開頁面時清除
        counter().setHeaderLink(null);
        next();
    },
}
</script>
<style lang="scss" scoped>
.up {
    width: 100%;
    height: 90vh;
    display: flex;
    justify-content: center;

    .showArea {
        width: 70%;
        height: 90%;
        background-color: #F5A352;
        margin: auto;
        border-radius: 2vh;

        .showImg {
            width: 100%;
            height: 80%;

            img {
                border-radius: 2vh 2vh 0 0;
                height: 100%;
                width: 100%;
                object-fit: cover;
            }
        }

        .showInfo {
            width: 100%;
            height: 20%;

            // border: 1px black solid;
            i,
            span {
                color: #FAF8ED;
                font-size: 3dvh;
                margin-left: 5%;
                line-height: 5vh;
            }
        }
    }
}

.down {
    width: 100%;
    background-color: #99B080;
    padding: 0% 15% 5% 15%;

    // border: 1px solid black;
    .title {
        height: 10vh;
        color: #ffc68d;
        display: flex;
        // border: 1px solid black;
        align-items: center;
        justify-content: space-between;
        font-size: 4dvh;
        padding: 2%;

        span {
            width: 10%;
            // border: 1px solid black;
            margin-left: 0%;
        }
    }
}

.ticket {
    width: 100%;
    height: 10vh;
    background-color: #748E63;
    border-radius: 2vh;
    align-items: center;
    display: flex;
    padding: 2%;
    display: flex;
    justify-content: space-between;

    span {
        color: #FAF8ED;
        font-size: 2.5dvh;
    }
}


.btn {
    width: 10%;
    height: 100%;
    background-color: #F5A352;
    border: 0;
    border-radius: 1.5vh;
    font-size: 2.5dvh;
    color: #FAF8ED;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        transition: 0.1s linear;
        scale: 1.1;
    }

    &:active {
        scale: 0.95;
    }
}</style>