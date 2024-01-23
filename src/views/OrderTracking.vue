<template>
    <body>
        <div class="top">
            <span class="title">訂單查詢</span>
        </div>
        <div class="content" :style="{ backgroundColor: payment ? '#89A071' : '#f5a352' }"
            v-for="(item, index) in this.orderInfoList">
            <!-- {{ item.startSellDateTime < this.nowDateTime < item.endSellDateTime}} -->
                <!-- {{ this.nowDateTime }} -->
            <div class="left">
                <div class="picture">
                    <img :src="item.keyvisualImg">
                </div>
                <div class="orderPayArea area">
                    <span>狀態：</span>
                    <div class="orderPay">{{ (item.seatData.length >0) ?  (item.payment ? "已付款" : "未付款"):"已取消訂單"}}</div>
                    <!-- <div class="orderPay">{{ item.payment}}</div> -->

                </div>
                <div class="orderNumArea area">
                    <span>訂單編號：</span>
                    <div class="orderNum">{{ item.buyNum }}</div>
                </div>
                <div class="seatArea area">
                    <p class="date">演出日期</p>
                    <p class="dateAbout">{{ item.showDateTime }}</p>

                </div>
                <button type="button" @click="this.goPay(item.buyNum)" v-if="item.payment == false">付款</button>
                <button type="button" @click="this.goCencel(item.buyNum)" v-if="item.seatData.length >0 && (new Date(item.startSellDateTime).toLocaleString() < this.nowDateTime) && (this.nowDateTime < new Date(item.endSellDateTime).toLocaleString())" >取消訂單</button>
            </div>
            <div class="right">
                <div class="up">
                    <p class="name">活動名稱</p>
                    <p class="nameAbout">{{ item.name }}</p>
                </div>
                <div class="middle">
                    <span>座位：</span>
                    <div class="seat" v-for="item2 in item.seatData">{{ item2.area }} - {{ item2.seatNum }}</div>
                </div>
                <div class="down">
                    <p class="place">演出地點</p>
                    <p class="placeAbout">{{ item.place }}</p>
                </div>
            </div>
        </div>
    </body>
</template>
<script>
import counter from '../stores/counter'
export default {
    data() {
        return {
            nowDateTime:  new Date().toLocaleString(),
            nameAbout: "",
            orderNumberAbout: "",
            dateAbout: "",
            placeAbout: "",
            seatAbout: "",
            // payment:true,   //付款狀態
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
                    console.log(data);
                    this.orderInfoList = data.data;
                    console.log(this.orderInfoList)
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
                    // this.$router.go(0)
                    // if( data.rtncode == "SUCCESSFUL" ){
                    //     this.myFav()
                    // }
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
    // border: 1px solid black;
    margin-top: 10vh;
    margin-left: 15%;
    color: #4D5C44;
    font-size: 4dvh;
    display: flex;
    align-items: end;
}

.content {
    width: 70%;
    height: 40vh;
    margin: auto;
    padding: 1%;
    background-color: #99b080;
    color: #FAF8ED;
    border-radius: 2vh;
    font-size: 2.5dvh;
    display: flex;
    justify-content: space-between;
    margin-top: 2%;

    .left {
        width: 20dvw;
        height: 100%;
        // border: 1px black solid;

        .picture {
            width: 100%;
            height: 20dvh;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                display: flex;
                justify-content: center;
                border-radius: 1.5vh;
            }
        }

        .area {
            display: flex;
            margin-top: 3%;
        }
    }

    .right {
        width: 65%;
        height: 100%;
        // border: 1px black solid;

        .up {
            // border: 1px black solid;
            width: 100%;

            .name {
                font-weight: bold;
                text-align: center;
            }

            .nameAbout {
                color: #FAF8ED;
                text-align: center;
            }
        }

        .middle {
            width: 100%;
            // border: 1px black solid;

            .date {
                font-weight: bold;
                text-align: center;
            }

            .dateAbout {
                color: #FAF8ED;
                text-align: center;
            }
        }

        .down {
            width: 100%;
            // border: 1px black solid;

            .place {
                font-weight: bold;
                text-align: center;
            }

            .placeAbout {
                color: #FAF8ED;
                text-align: center;
            }
        }
    }
}
</style>