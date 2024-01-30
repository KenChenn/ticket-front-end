<template>
    <body>
        <div class="title">
            <span>
                訂單查詢
            </span>
            <select name="" id="">
                <option value="1">未付款</option>
                <option value="2">已付款</option>
                <option value="3">已取消</option>
            </select>
        </div>
        <div class="content" v-for="(item, index) in this.orderInfoList" :style="{ backgroundColor: item.seatData.length > 0 ? (item.payment ? '#CBDABA ' : '#FFC68D') : '#c0c0c0' },
            { opacity: item.seatData.length > 0 ? '1' : '0.5' }">

            <div class="left">
                <div class="picture">
                    <img :src="item.keyvisualImg">
                </div>
                <div class="order">
                    訂單狀態：
                    <span>
                        {{ (item.seatData.length > 0) ? (item.payment ? "已付款" : "未付款") : "已取消訂單" }}
                    </span>
                </div>
                <div class="order">
                    訂單編號：
                    <span>
                        {{ item.buyNum }}
                    </span>
                </div>

            </div>
            <div class="middle">
                <div class="info">
                    <div class="comp">
                        <p>活動名稱</p>
                        <p class="infoTitle">{{ item.name }}
                        </p>
                    </div>
                    <div class="comp">
                        <p>演出地點</p>
                        <p class="infoTitle">{{ item.place }}</p>
                    </div>

                    <div class="comp">
                        <p>座位
                        </p>
                        <p class="infoTitle" v-for="item2 in item.seatData">{{ item2.area }} - {{ item2.seatNum }}</p>
                    </div>
                    <div class="comp">
                        <p>演出日期
                        </p>
                        <p class="infoTitle">{{ item.showDateTime }}</p>
                    </div>
                </div>

                <div class="btnArea">

                    <button type="button" @click="this.goCencel(item.buyNum, item.payFinalDate)" v-if="item.seatData.length > 0 &&
                        (new Date(item.startSellDateTime).toLocaleString() < this.nowDateTime) &&
                        (this.nowDateTime < new Date(item.endSellDateTime).toLocaleString()) &&
                        (new Date(item.payFinalDate) > new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000))" class="cancel">
                        取消訂單
                    </button>
                    <!-- payFinalDate+3日 小於今天按鈕隱藏 -->

                    <button type="button" @click="this.goPay(item.buyNum)"
                        v-if="item.seatData.length > 0 && item.payment == false" class="payment">付款</button>
                </div>
            </div>

        </div>
        <div class="footer">

        </div>
    </body>
</template>
<script>
import Swal from 'sweetalert2'
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
                    console.log(data);
                    console.log(data.data);
                    this.orderInfoList = data.data;
                    // console.log(this.orderInfoList)
                    this.orderInfoList.forEach(item => {
                        //時間格式調整
                        var showDateTime = new Date(item.showDateTime);
                        var showDateTimeYear = showDateTime.getFullYear()
                        var showDateTimeMonth = (showDateTime.getMonth() + 1).toString().padStart(2, '0')
                        var showDateTimeDate = (showDateTime.getDate()).toString().padStart(2, '0')
                        var showDateTimeHour = (showDateTime.getHours()).toString().padStart(2, '0')
                        var showDateTimeMin = (showDateTime.getMinutes()).toString().padStart(2, '0')
                        var space = "　"
                        item.showDateTime = showDateTimeYear + "-" + showDateTimeMonth + "-" + showDateTimeDate + space + showDateTimeHour + " : " + showDateTimeMin
                    })
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
                    Swal.fire({
                        title: "付款成功",
                        icon: "success",
                        color: "#4D5C44",
                        background: "#FAF8ED",
                        confirmButtonColor: "#748e63"
                    })
                        .then(() => {
                            location.href = location.href;
                        })
                    // this.$router.go(0)
                })
                .catch(error => console.log(error))
        },
        goCencel(buyNum, payFinalDate) {
            //payFinalDate+3日 小於 今天的話跳出通知說已過退票時間
            console.log(payFinalDate)
            Swal.fire({
                title: "是否取消訂單",
                text: "如果已付款，確認後請至退票規定內點選連結填寫退票申請書",
                icon: "warning",
                color: "#4D5C44",
                background: "#FAF8ED",
                confirmButtonText: "確認",
                confirmButtonColor: "#6e7881",
                showCancelButton: true,
                cancelButtonText: "取消",
                cancelButtonColor: "#F5A352",
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        this.confirmGoCencel(buyNum)
                        Swal.fire({
                            title: "取消訂單成功",
                            icon: "success",
                            color: "#4D5C44",
                            background: "#FAF8ED",
                            confirmButtonColor: "#748e63",
                        })
                            .then(() => {
                                location.href = location.href;
                            })
                    }
                })
        },
        confirmGoCencel(buyNum) {
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
        },
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

    select {
        width: 10%;
        border: 0;
        background-color: #FAF8ED;
        color: #4D5C44;
        border-bottom: 0.3vh solid #F5A352;
        font-size: 3dvh;
    }
}

.content {
    width: 70%;
    margin: auto;
    padding: 2%;
    border-radius: 2vh;
    font-size: 2.5dvh;
    margin-top: 2%;
    display: flex;
    justify-content: space-between;
    color: #4D5C44;
    // opacity: 0.4;
    // border: 1px solid black;
    box-shadow: 0 0 0.3vh #00000050;

    .left {
        width: 20vw;
        height: 100%;
        // border: 1px black solid;

        .picture {
            width: 100%;
            height: 20vh;
            background-color: #00000013;
            // border: 1px black solid;

            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
                display: flex;
                justify-content: center;
            }
        }

        .order {
            line-height: 5vh;

            span {
                // color: #c26202;
                font-weight: bold;
            }
        }
    }

    .middle {
        width: 45vw;
        height: 100%;
        padding: 1%;
        line-height: 3vh;
        // border: 1px solid black;

        .info {
            width: 100%;
            min-height: 5vh;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            // border: black 1px solid;
        }

        .comp {
            width: 50%;
            padding: 1%;

            .infoTitle {
                font-weight: bold;
                word-wrap: break-word;
            }
        }

        .btnArea {
            height: 5vh;
            display: flex;
            justify-content: space-between;

            button {
                height: 100%;
                width: 40%;
                border-radius: 1vh;
                font-size: 3dvh;
                background-color: #FAF8ED;
            }

            .cancel {
                height: 100%;
                width: 40%;
                border-radius: 1vh;
                font-size: 3dvh;
                background-color: #DB3A3A;
                color: #FAF8ED;
                border: 0;
                transition: 0.1s linear;

                &:hover {
                    transition: 0.2s linear;
                    scale: 1.05;
                    background-color: #F14242;
                }

                &:active {
                    scale: 0.95;
                    background-color: #ab3131;
                    color: #FAF8ED;
                }
            }

            .payment {
                color: #FAF8ED;
                background-color: #748E63;
                border: 0;
                transition: 0.1s linear;

                &:hover {
                    transition: 0.2s linear;
                    scale: 1.05;
                    background-color: #608349;
                    color: #ffffff;
                }

                &:active {
                    scale: 0.95;
                    background-color: #4D5C44;
                    color: #ffffff;
                }
            }
        }
    }

    .footer {
        height: 10vh;
    }
}
</style>