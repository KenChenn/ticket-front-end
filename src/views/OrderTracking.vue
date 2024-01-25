<template>
    <body>
        <span class="title">訂單查詢</span>
        <div class="content" v-for="(item, index) in this.orderInfoList"
            :style="{ border: item.seatData.length > 0 ? (item.payment ? '0.5vh solid #89A071 ' : '1vh solid #f5a352') : '0.5vh solid #DB3A3A' }">

            <div class="left">
                <div class="picture">
                    <img :src="item.keyvisualImg">
                </div>

                <div class="order">
                    狀態：{{ (item.seatData.length > 0) ? (item.payment ? "已付款" : "未付款") : "已取消訂單" }}
                </div>

                <div class="order">
                    訂單編號：{{ item.buyNum }}
                </div>

            </div>
            <div class="middle">
                <p class="infoTitle">活動名稱</p>
                <p>{{ item.name }}
                </p>
                <p class="infoTitle">座位</p>
                <p v-for="item2 in item.seatData">{{ item2.area }} - {{ item2.seatNum }}</p>
                <p class="infoTitle">演出日期</p>
                <p>{{ item.showDateTime }}
                </p>
                <p class="infoTitle">演出地點</p>
                <p>{{ item.place }}</p>
            </div>
            <div class="right">
                <button type="button" @click="this.goCencel(item.buyNum)"
                    v-if="item.seatData.length > 0 && (new Date(item.startSellDateTime).toLocaleString() < this.nowDateTime) && (this.nowDateTime < new Date(item.endSellDateTime).toLocaleString())">取消訂單</button>

                <button type="button" @click="this.goPay(item.buyNum)"
                    v-if="item.seatData.length > 0 && item.payment == false">付款</button>
            </div>
        </div>
        <div class="footer">

        </div>
    </body>
</template>
<script>
import counter from '../stores/counter'
export default {
    data() {
        return {
            nowDateTime: new Date().toLocaleString(),
            nameAbout: "",
            orderNumberAbout: "",
            dateAbout: "",
            placeAbout: "",
            seatAbout: "",
            payment: true,   //付款狀態
            orderInfoList: []
        }
    },
    methods: {
        orderInfo() {
            fetch('http://localhost:8080/api/getOrderData', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({
                    account: $cookies.get("account"),
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data.data);
                    this.orderInfoList = data.data;
                    // console.log(this.orderInfoList)
                })
                .catch(error => console.log(error))
        },
        goPay(buyNum) {
            console.log(buyNum);
            fetch('http://localhost:8080/api/payment', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({
                    buyNum: buyNum,
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.$router.go(0)
                })
                .catch(error => console.log(error))
        },
        goCencel(buyNum) {
            fetch('http://localhost:8080/api/cancelOrder', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({
                    buyNum: buyNum,
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.$router.go(0)
                })
                .catch(error => console.log(error))
        }
    },
    mounted() {
        this.orderInfo()
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
}
</script>
<style scoped lang="scss" >
body {
    background-color: #FAF8ED;
}

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
    justify-content: space-between;
}

.content {
    width: 70%;
    height: 40vh;
    margin: auto;
    padding: 2%;
    border-radius: 2vh;
    font-size: 2.5dvh;
    margin-top: 2%;
    display: flex;
    justify-content: space-between;
    border: #99b080 0.5vh solid;
    color: #4D5C44;
    // border: 1px solid black;

    .left {
        width: 20vw;
        height: 100%;
        border: 1px black solid;

        .picture {
            width: 100%;
            height: 60%;
            background-color: #00000013;

            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
                display: flex;
                justify-content: center;
                border-radius: 1.5vh;
            }
        }

        .order {
            border: 1px black solid;

        }
    }

    .middle {
        width: 35vw;
        height: 100%;
        text-align: center;
        line-height: 3vh;

        .infoTitle {
            font-weight: bold;
        }
    }

    .right {
        width: 10%;
        border: 1px black solid;

    }

    .footer {
        height: 10vh;
    }
}
</style>