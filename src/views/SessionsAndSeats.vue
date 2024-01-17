<template>
    <body>
        <div class="header">
            <i class="fa-solid fa-magnifying-glass" @click="search"></i>
            <input type="search" class="search">
            <button type="button" class="signOut">登出</button>
        </div>
        <div class="top">
            <span class="title">場次及座位</span>
            <button type="button" class="completeEditing" @click="createActtivity">建立活動</button>
        </div>
        <div class="content" v-for="(item, index) in this.sessionList" :key="index">
            <span class="start">活動開始時間</span>
            <input type="datetime-local" class="startAbout" v-model="item.showDateTime" :min="minShowDateTime">
            <span v-if="!isEmptyShowDateTime" class="error errorShowDateTime">請輸入活動開始時間</span>
            <button type="button" class="deleteEvent" @click="deleteEvent(index)">刪除場次</button>
            <span class="onSale">開售時間</span>
            <input type="datetime-local" class="onSaleAbout" v-model="item.startSellDateTime" :min="minStartSellDateTime">
            <span v-if="!isEmptyStartSellDateTime" class="error errorStartSellDateTime">請輸入開售時間</span>
            <span class="stopSale">停售時間</span>
            <input type="datetime-local" class="stopSaleAbout" v-model="item.endSellDateTime"
                @click="EndSellDateTime(item.startSellDateTime)" :min="minEndSellDateTime">
            <span v-if="!isEmptyEndSellDateTime" class="error errorEndSellDateTime">請輸入停售時間</span>
            <span class="area">區域名稱</span>
            <span class="seat">可出售座位數</span>
            <span class="price">座位價格</span>
            <span v-if="!isEmptyArea" class="error errorArea">請輸入區域名稱 </span>
            <span v-if="!isEmptySeat" class="error errorSeat">請輸入可出售座位數 </span>
            <span v-if="!isEmptyPrice" class="error errorPrice">請輸入座位價格 </span>
            <button type="button" class="addArea" @click="addArea(index)">新增區域</button>
            <div class="aboutArea">
                <div class="aboutLeft">
                    <div class="About" v-for="(areaItem, areaIndex) in item.seatData" :key="areaIndex">
                        <input type="text" class="areaAbout" v-model="areaItem.area">
                        <input type="number" class="seatAbout" v-model="areaItem.maxSeatNum">
                        <input type="number" class="priceAbout" v-model="areaItem.price">
                        <button type="button" class="deleteArea" @click="deleteArea(index, areaIndex)">刪除區域</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <button type="button" class="addEvent" @click="addEvent">新增場次</button>
        </div>
    </body>
</template>
<script>
// import { tr } from 'element-plus/es/locale';

export default {
    data() {
        return {
            codename: "",
            name: "",
            introduction: "",
            enity: false,
            place: "",
            organizer: "",
            keyvisualImg: "",
            introduceImg1: "",
            introduceImg2: "",
            minEndSellDateTime: null,

            activity: {},

            //新增用
            sessionList: [
                {
                    commodity_codename: "",
                    showDateTime: "",
                    startSellDateTime: "",
                    endSellDateTime: "",
                    seatData: [{
                        // num: 0,
                        area: "",
                        maxSeatNum: 0,
                        price: 0,
                    },],
                }
            ],

            //防呆用
            isEmptyShowDateTime: true,
            isEmptyStartSellDateTime: true,
            isEmptyEndSellDateTime: true,
            isEmptyArea: true,
            isEmptySeat: true,
            isEmptyPrice: true,

            isRepeatArea: true,
        }
    },
    methods: {
        createActtivity() {
            this.sessionList.forEach(item => {
                item.commodity_codename = this.activity.codename;
            })

            // 防呆區域名稱相同
            for (const session of this.sessionList) {
                const areaMap = {}; //存已出現區域名稱
                for (const seat of session.seatData) {
                    // 检查当前区域是否已经出现过
                    if (areaMap[seat.area]) {
                        alert("有重複的區域名稱")
                        this.isRepeatArea = false
                        return
                    } else {
                        // 如果没有出现过，将其添加到 areaMap 中
                        areaMap[seat.area] = true;
                        this.isRepeatArea = true
                    }
                }
            }

            // 防呆未輸入
            for (const session of this.sessionList) {
                for (const seat of session.seatData) {
                    if (session.showDateTime == "") {
                        alert("有活動開始時間未輸入")
                        this.isEmptyShowDateTime = false
                    }
                    if (session.startSellDateTime == "") {
                        alert("有開售時間未輸入")
                        this.isEmptyStartSellDateTime = false
                    }
                    if (session.endSellDateTime == "") {
                        alert("有停售時間未輸入")
                        this.isEmptyEndSellDateTime = false
                    }
                    if (seat.area == "") {
                        alert("有區域名稱未輸入")
                        this.isEmptyArea = false
                    }
                    if (seat.maxSeatNum <= 0) {
                        alert("有可出售座位數未輸入")
                        this.isEmptySeat = false
                    }
                    if (seat.price <= 0) {
                        alert("有座位價格未輸入")
                        this.isEmptyPrice = false
                    }
                }
            }

            if (this.isEmptyShowDateTime && this.isEmptyStartSellDateTime && this.isEmptyEndSellDateTime && this.isEmptyArea && this.isEmptySeat && this.isEmptyPrice && this.isRepeatArea) {
                this.activity.sessionData = this.sessionList
            
                const allShowDateTimes = this.sessionList.flatMap(item => item.showDateTime);

                const earliestDateTime = allShowDateTimes.reduce((earliest, current) => (current < earliest ? current : earliest), allShowDateTimes[0]);
                const latestDateTime = allShowDateTimes.reduce((latest, current) => (current > latest ? current : latest), allShowDateTimes[0]);

                this.activity.startDate = earliestDateTime
                this.activity.endDate = latestDateTime

                if (this.activity.keyvisualImg == undefined) {
                this.activity.keyvisualImg = ""
            }
            if (this.activity.introduceImg1 == undefined) {
                this.activity.introduceImg1 = ""
            }
            if (this.activity.introduceImg2 == undefined) {
                this.activity.introduceImg2 = ""
            }
            console.log(this.activity);

            fetch('http://localhost:8080/api/add_commodity_and_session', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    codeName: this.activity.codename,
                    name: this.activity.name,
                    introduction: this.activity.introduction,
                    entity: this.activity.enity,
                    place: this.activity.place,
                    organizer: this.activity.organizer,
                    startDate: this.activity.startDate,
                    endDate: this.activity.endDate,
                    keyvisual_img: this.activity.keyvisualImg,
                    introduce_img1: this.activity.introduceImg1,
                    introduce_img2: this.activity.introduceImg2,
                    sessionData: this.activity.sessionData
                }),
            }).then(response => response.json())
                .then(res => {
                    console.log(res.rtncode);
                    if (res.rtncode == "SUCCESSFUL"){
                        this.$router.push('/ActivityAndHostPage')
                    }
                    if (res.rtncode == "PLEASE_LOGIN_ADMIN_ACCOUNT_FIRST"){
                        alert("請先登入")
                    }
                    if (res.rtncode == "PARAM_ERROR"){
                        alert("請確認資料是否填寫完畢")
                    }
                    if (res.rtncode == "CODENAME_EXISTED"){
                        alert("活動代號已存在，請重新輸入")
                        this.$router.push('/CreateActivities')
                    }
                })
            }
        },
        addArea(index) {
            this.sessionList[index].seatData.push({
                // num: 0,
                area: "",
                maxSeatNum: 0,
                price: 0,
            })
        },
        addEvent() {
            const index = this.sessionList.length - 1
            if (this.sessionList[index].showDateTime == "") {
                this.isEmptyShowDateTime = false
            }
            if (this.sessionList[index].startSellDateTime == "") {
                this.isEmptyStartSellDateTime = false
            }
            if (this.sessionList[index].endSellDateTime == "") {
                this.isEmptyEndSellDateTime = false
            }
            if (this.sessionList[index].seatData[this.sessionList[index].seatData.length - 1].area == "") {
                this.isEmptyArea = false
            }
            if (this.sessionList[index].seatData[this.sessionList[index].seatData.length - 1].maxSeatNum <= 0) {
                this.isEmptySeat = false
            } else {
                this.isEmptySeat = true
            }
            if (this.sessionList[index].seatData[this.sessionList[index].seatData.length - 1].price <= 0) {
                this.isEmptyPrice = false
            } else {
                this.isEmptyPrice = true
            }

            if (this.sessionList[index].showDateTime != ""
                && this.sessionList[index].startSellDateTime != ""
                && this.sessionList[index].endSellDateTime != ""
                && this.sessionList[index].seatData[this.sessionList[index].seatData.length - 1].area != ""
                && this.sessionList[index].seatData[this.sessionList[index].seatData.length - 1].maxSeatNum > 0
                && this.sessionList[index].seatData[this.sessionList[index].seatData.length - 1].price > 0) {
                this.isEmptyShowDateTime = true
                this.isEmptyStartSellDateTime = true
                this.isEmptyEndSellDateTime = true

                this.sessionList.push({
                    commodity_codename: "",
                    showDateTime: "",
                    startSellDateTime: "",
                    endSellDateTime: "",
                    seatData: [{
                        // num: 0,
                        area: "",
                        maxSeatNum: 0,
                        price: 0,
                    }],
                })
            }
            // console.log(this.sessionList);
        },
        EndSellDateTime(startSellDateTime) {
            this.minEndSellDateTime = startSellDateTime;
        },
        deleteArea(sessionIndex, areaIndex) {
            console.log(areaIndex);
            if (this.sessionList[sessionIndex].seatData.length > 1) {
                this.sessionList[sessionIndex].seatData.splice(areaIndex, 1);
            } else {
                this.sessionList[sessionIndex].seatData = this.sessionList[sessionIndex].seatData
            }
        },
        deleteEvent(index) {
            if (this.sessionList.length > 1) {
                this.sessionList.splice(index, 1);
            } else {
                this.sessionList = this.sessionList
            }
        },

    },
    mounted() {
        let activity = JSON.parse(localStorage.getItem("acttivity"))
        // console.log(activity);
        this.activity = activity
    },
    computed: {
        //活動開始時間最小值為今日
        minShowDateTime() {
            const minDateTime = new Date().toISOString().slice(0, 16);
            return minDateTime;
        },
        minStartSellDateTime() {
            const minDateTime = new Date().toISOString().slice(0, 16);
            return minDateTime;
        }
    }
}
</script>
<style scoped lang="scss">
body {
    background-color: #faf8ed;
}

.header {
    width: 100%;
    height: 10vh;
    margin-top: 0;
    background-color: #F9B572;
    position: fixed;
    top: 0;
    z-index: 5;

    .fa-solid {
        position: absolute;
        font-size: 30px;
        left: 15.5%;
        top: 30%;
        color: #E6E1C8;
        z-index: 10;
    }

    .search {
        position: absolute;
        width: 17%;
        height: 70%;
        top: 15%;
        left: 15%;
        padding-left: 3%;
        border-radius: 15px;
        border: 0;
        background-color: #FAF8ED;
        font-size: 25px;
    }

    .signOut {
        position: absolute;
        background-color: transparent;
        color: #FAF8ED;
        font-size: 30px;
        right: 14%;
        top: 20%;
        border: 0;
    }
}

.top {
    margin-left: 15vw;
    padding-top: 5vh;

    .title {
        margin: 0;
        font-size: 50px;
        color: #4D5C44;
        font-weight: 600;
        margin-right: 39vw;
    }

    .completeEditing {
        margin: 0;
        width: 11vw;
        font-size: 30px;
        color: #faf8ed;
        background-color: #748e63;
        border: 0;
        border-radius: 17px;
    }
}

.content {
    width: 70vw;
    height: 100vh;
    margin-left: 15vw;
    background-color: #f5bf89;
    border-radius: 25px;
    font-size: 35px;
    margin-bottom: 3vh;
    position: relative;

    span {
        color: #4D5C44;
        // margin: 0;
        font-weight: 600;
    }

    input {
        width: 30%;
        height: 11%;
        font-size: 26px;
        color: #4D5C44;
        background-color: #FAF8ED;
        border: 0;
        border-radius: 20px;
        text-indent: 2%;
        text-align: center;
    }

    .error {
        font-size: 20px;
        font-weight: 600;
    }

    .start {
        position: absolute;
        // top: 10%;
        // left: 5%;
        margin-top: 5%;
        margin-left: 5%;
    }

    .startAbout {
        position: absolute;
        margin-top: 5.5%;
        margin-left: 42%;
        // right: 27%;
    }

    .errorShowDateTime {
        position: absolute;
        margin-top: 8%;
        margin-left: 75%;
    }

    .deleteEvent {
        position: absolute;
        // margin: 0;
        width: 11vw;
        background-color: #db3a3a;
        font-size: 30px;
        color: #faf8ed;
        border: 0;
        border-radius: 17px;
        // top: 10%;
        // right: 5%;
        margin-top: 1.5%;
        margin-left: 80%;
    }

    .onSale {
        position: absolute;
        // top: 27%;
        // left: 8.5%;
        margin-top: 14%;
        margin-left: 10%;
    }

    .onSaleAbout {
        position: absolute;
        // top: 29%;
        // right: 27%;
        margin-top: 14%;
        margin-left: 42%;

    }

    .errorStartSellDateTime {
        position: absolute;
        margin-top: 16%;
        margin-left: 75%;
    }

    .stopSale {
        position: absolute;
        // top: 44%;
        // left: 8.5%;
        margin-top: 22%;
        margin-left: 10%;
    }

    .stopSaleAbout {
        position: absolute;
        // top: 45%;
        // right: 27%;
        margin-top: 22%;
        margin-left: 42%;
    }

    .errorEndSellDateTime {
        position: absolute;
        margin-top: 24%;
        margin-left: 75%;
    }

    .area {
        position: absolute;
        // top: 67%;
        // left: 7.5%;
        margin-top: 29%;
        margin-left: 10%;
    }

    .seat {
        position: absolute;
        // top: 67%;
        // right: 51%;
        margin-top: 29%;
        margin-left: 30%;
    }

    .price {
        position: absolute;
        // top: 67%;
        // right: 28%;
        margin-top: 29%;
        margin-left: 60%;
    }

    .errorArea {
        position: absolute;
        margin-top: 34%;
        margin-left: 10%;
    }

    .errorSeat {
        position: absolute;
        margin-top: 34%;
        margin-left: 30%;
    }

    .errorPrice {
        position: absolute;
        margin-top: 34%;
        margin-left: 60%;
    }

    .addArea {
        position: absolute;
        margin: 0;
        width: 11vw;
        background-color: #748e63;
        font-size: 30px;
        color: #faf8ed;
        border: 0;
        border-radius: 17px;
        top: 47%;
        right: 5%;
    }

    .aboutArea {
        width: 100%;
        height: 44%;
        position: absolute;
        margin-top: 35%;
        // z-index: -1;
        // background-color: black;
        display: flex;

        .aboutLeft {
            width: 100%;
            overflow-y: auto;

            .About {
                width: 100%;
                height: 20%;
                margin-top: 10px;
                // border: 1px solid black;

                .areaAbout {
                    width: 17%;
                    height: 80%;
                    margin-left: 8%;
                }

                .seatAbout {
                    width: 23%;
                    height: 80%;
                    margin-left: 4%;
                }

                .priceAbout {
                    width: 23%;
                    height: 80%;
                    margin-left: 3%;
                }

                .deleteArea {
                    width: 11vw;
                    background-color: #db3a3a;
                    font-size: 30px;
                    color: #faf8ed;
                    border: 0;
                    border-radius: 17px;
                    margin-top: 0.5%;
                    margin-left: 2%;
                }
            }

        }

        .aboutRight {
            width: 20%;


        }
    }


}

.footer {
    width: 100%;
    text-align: center;

    .addEvent {
        margin: 0;
        width: 11vw;
        background-color: #748e63;
        font-size: 30px;
        color: #faf8ed;
        border: 0;
        border-radius: 17px;
    }
}
</style>