<template>
    <body>
        <div class="top">
            <span class="title">場次及座位</span>
            <button type="button" class="completeEditing" @click="createActtivity">建立活動</button>
        </div>
        <div class="content" v-for="(item, index) in this.sessionList" :key="index">
            <div class="timesArea">

                <div class="timesAll">
                    <div class="timesTitle">
                        <span>活動開始時間</span>
                        <input type="datetime-local" class="timesInput" v-model="item.showDateTime" :min="minShowDateTime">
                    </div>
                    <div v-if="!isEmptyShowDateTime" class=" error">請輸入活動開始時間</div>
                </div>
                <div class="timesAll">
                    <div class="timesTitle">
                        <span>開售時間</span>
                        <input type="datetime-local" class="timesInput" v-model="item.startSellDateTime"
                            :min="minStartSellDateTime" :max="maxStartSellDateTime">
                    </div>
                    <div v-if="!isEmptyStartSellDateTime" class=" error">請輸入開售時間</div>
                    <div v-if="!startIsAfterShow" class="error">開售時間已晚於活動開始時間</div>
                </div>

                <div class="timesAll">
                    <div class="timesTitle">
                        <span>停售時間</span>
                        <input type="datetime-local" class="timesInput" v-model="item.endSellDateTime"
                            @click="EndSellDateTime(item.startSellDateTime, item.showDateTime)" :min="minEndSellDateTime"
                            :max="maxEndSellDateTime">
                    </div>
                    <div v-if="!isEmptyEndSellDateTime" class=" error ">請輸入停售時間</div>
                    <div v-if="!endIsafterShow" class=" error ">停售時間已晚於活動開始時間</div>
                </div>
            </div>

            <button type="button" class="delete" @click="deleteEvent(index)">刪除場次</button>

            <div class="seatArea">
                <span>區域名稱</span>
                <span>可出售座位數</span>
                <span>座位價格</span>
                <button type="button" class="addArea" @click="addArea(index)">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
            <div class="inputArea" v-for="(areaItem, areaIndex) in item.seatData" :key="areaIndex">
                <input type="text" class="areaInput" v-model="areaItem.area">
                <input type="number" class="areaInput" v-model="areaItem.maxSeatNum">
                <input type="number" class="areaInput" v-model="areaItem.price">
                <button type="button" class="delete" @click="deleteArea(index, areaIndex)">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
            <div class="areaError">
                <div v-if="!isEmptyArea" class="error errorArea">請輸入區域名稱 </div>
                <div v-if="!isEmptySeat" class="error errorSeat">請輸入可出售座位數 </div>
                <div v-if="!isEmptyPrice" class="error errorPrice">請輸入座位價格 </div>
            </div>

        </div>
        <button type="button" class="addEvent" @click="addEvent">新增場次</button>
        <div class="footer">
        </div>
    </body>
</template>
<script>
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
            startIsAfterShow: true,
            endIsafterShow: true,
            endIsEarlyStart: true
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
            console.log(this.isEmptyPrice);
            // 防呆未輸入
            for (const session of this.sessionList) {
                for (const seat of session.seatData) {
                    if (session.showDateTime == "") {
                        alert("有活動開始時間未輸入")
                        this.isEmptyShowDateTime = false
                    } else {
                        this.isEmptyShowDateTime = true
                    }
                    if (session.startSellDateTime == "") {
                        alert("有開售時間未輸入")
                        this.isEmptyStartSellDateTime = false
                    } else {
                        this.isEmptyStartSellDateTime = true
                    }
                    if (session.endSellDateTime == "") {
                        alert("有停售時間未輸入")
                        this.isEmptyEndSellDateTime = false
                    } else {
                        this.isEmptyEndSellDateTime = true
                    }
                    if (seat.area == "") {
                        alert("有區域名稱未輸入")
                        this.isEmptyArea = false
                    } else {
                        this.isEmptyArea = true
                    }
                    if (seat.maxSeatNum <= 0) {
                        alert("有可出售座位數未輸入")
                        this.isEmptySeat = false
                    } else {
                        this.isEmptySeat = true
                    }
                    if (seat.price <= 0) {
                        alert("有座位價格未輸入")
                        this.isEmptyPrice = false
                    } else {
                        this.isEmptyPrice = true
                    }
                }
            }

            //防呆時間早晚順序錯誤
            for (const session of this.sessionList) {
                if (session.showDateTime < session.startSellDateTime) {
                    this.startIsAfterShow = false
                    alert("開售時間已晚於活動開始時間")
                } else {
                    this.startIsAfterShow = true
                }
                if (session.showDateTime < session.endSellDateTime) {
                    this.endIsafterShow = false
                    alert("停售時間已晚於活動開始時間")
                } else {
                    this.endIsafterShow = true
                }
                if (session.endSellDateTime < session.startSellDateTime) {
                    this.endIsEarlyStart = false
                    alert("停售時間已早於開售時間")
                } else {
                    this.endIsEarlyStart = true
                }
            }

            if (this.isEmptyShowDateTime && this.isEmptyStartSellDateTime && this.isEmptyEndSellDateTime && this.isEmptyArea && this.isEmptySeat && this.isEmptyPrice && this.isRepeatArea && this.startIsAfterShow && this.endIsafterShow && this.endIsEarlyStart) {
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
                        if (res.rtncode == "SUCCESSFUL") {
                            this.$router.push('/ActivityAndHostPage')
                        }
                        if (res.rtncode == "PLEASE_LOGIN_ADMIN_ACCOUNT_FIRST") {
                            alert("請先登入")
                            this.$router.push('/AdminLoginPage');
                        }
                        if (res.rtncode == "PARAM_ERROR") {
                            alert("請確認資料是否填寫完畢")
                        }
                        if (res.rtncode == "CODENAME_EXISTED") {
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
            const item = this.sessionList[index]

            if (item.showDateTime == "") {
                this.isEmptyShowDateTime = false
            } else {
                this.isEmptyShowDateTime = true
            }
            if (item.showDateTime < item.startSellDateTime) {
                this.startIsAfterShow = false
            } else {
                this.startIsAfterShow = true
            }
            if (item.showDateTime < item.endSellDateTime) {
                this.endIsafterShow = false
            } else {
                this.endIsafterShow = true
            }

            if (item.startSellDateTime == "") {
                this.isEmptyStartSellDateTime = false
            } else {
                this.isEmptyStartSellDateTime = true
            }

            if (item.endSellDateTime == "") {
                this.isEmptyEndSellDateTime = false
            } else {
                this.isEmptyEndSellDateTime = true
            }
            if (item.endSellDateTime < item.startSellDateTime) {
                this.endIsEarlyStart = false
            } else {
                this.endIsEarlyStart = true
            }

            if (item.seatData[item.seatData.length - 1].area == "") {
                this.isEmptyArea = false
            } else {
                this.isEmptyArea = true
            }
            if (item.seatData[item.seatData.length - 1].maxSeatNum <= 0) {
                this.isEmptySeat = false
            } else {
                this.isEmptySeat = true
            }
            if (item.seatData[item.seatData.length - 1].price <= 0) {
                this.isEmptyPrice = false
            } else {
                this.isEmptyPrice = true
            }

            if (this.isEmptyShowDateTime &&
                this.isEmptyStartSellDateTime &&
                this.isEmptyEndSellDateTime && this.startIsAfterShow && this.endIsafterShow && this.endIsEarlyStart && this.isEmptyArea && this.isEmptySeat && this.isEmptyPrice) {
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
        EndSellDateTime(startSellDateTime, showDateTime) {
            this.minEndSellDateTime = startSellDateTime
            this.maxEndSellDateTime = showDateTime;
        },
        updateMaxEndSellDateTime(sessionList) {
            const validDates = sessionList
                .map(item => new Date(item.showDateTime))
                .filter(date => !isNaN(date.getTime()));

            if (validDates.length > 0) {
                const maxShowDateTime = Math.max(...validDates.map(date => date.getTime()));
                this.maxEndSellDateTime = new Date(maxShowDateTime).toISOString().slice(0, 16);
            } else {
                this.maxEndSellDateTime = '';
            }
        },
        StartSellDateTime(showDateTime) {
            this.maxStartSellDateTime = showDateTime;
        },
        updateMaxStartSellDateTime(sessionList) {
            const validDates = sessionList
                .map(item => new Date(item.showDateTime))
                .filter(date => !isNaN(date.getTime()));

            if (validDates.length > 0) {
                const maxShowDateTime = Math.max(...validDates.map(date => date.getTime()));
                this.maxStartSellDateTime = new Date(maxShowDateTime).toISOString().slice(0, 16);
            } else {
                this.maxStartSellDateTime = '';
            }
        },
        deleteArea(sessionIndex, areaIndex) {
            // console.log(areaIndex);
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
            const minDateTime = new Date();
            return minDateTime.toISOString().slice(0, 16);
        },
        minStartSellDateTime() {
            const minStartSellDateTime = new Date();
            return minStartSellDateTime.toISOString().slice(0, 16);
        }
    },
    watch: {
        'sessionList': {
            handler: function (newSessionList, oldSessionList) {
                this.updateMaxStartSellDateTime(newSessionList);
                this.updateMaxEndSellDateTime(newSessionList);
            },
            deep: true
        }
    },
}
</script>
<style scoped lang="scss">
body {
    background-color: #faf8ed;
}

.top {
    width: 70%;
    height: 100%;
    margin-left: 15%;
    margin-top: 10vh;
    display: flex;
    align-items: end;
    align-items: center;
    justify-content: space-between;

    .title {
        height: 10vh;
        margin-right: 44%;
        color: #c26202;
        font-size: 4dvh;
        display: flex;
        align-items: end;
    }

    .completeEditing {
        width: 10vw;
        margin-top: 3%;
        border: 0;
        border-radius: 1.5vh;
        font-size: 3dvh;
        border: 0.3vh solid #89A071;
        color: #89A071;
        background-color: #FAF8ED;

        &:hover {
            transition: 0.1s linear;
            color: #FAF8ED;
            background-color: #89A071;
            scale: 1.1;
        }

        &:active {
            scale: 0.95;
            background-color: #4D5C44;
        }

    }
}

.content {
    width: 70vw;
    margin-left: 15%;
    border-radius: 2vh;
    padding: 2%;
    margin-bottom: 2%;
    border: #F5A352 0.5vh solid;
    display: flex;
    flex-wrap: wrap;

    span {
        color: #4D5C44;
        font-size: 3dvh;
    }

    input {
        width: 30%;
        font-size: 3dvh;
        border: 0;
        background-color: #FAF8ED;
        border-bottom: #F5A352 0.3vh solid;
        color: #4D5C44;

        &:focus {
            outline: none;
        }
    }

    .error {
        width: 25%;
        color: #DB3A3A;
        font-size: 2dvh;
        // border: 1px black solid;
    }

    .delete {
        width: 15%;
        height: 10%;
        border-radius: 1.5vh;
        border: none;
        font-size: 3dvh;
        background-color: #FAF8ED;
        color: #DB3A3A;
        border: #DB3A3A solid 0.3vh;

        &:hover {
            transition: 0.1s linear;
            scale: 1.05;
            background-color: #ffffff;
        }

        &:active {
            scale: 0.95;
            background-color: #DB3A3A;
            color: #FAF8ED;
        }
    }

    .timesArea {
        width: 85%;
        height: 20vh;
        // border: black 1px solid;
    }

    .timesAll {
        margin-bottom: 1%;
        display: flex;
        // border: black 1px solid;

        .timesTitle {
            width: 65%;
            margin-right: 5%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .timesInput {
            width: 60%;
            min-height: 30%;
            text-align: center;
        }
    }



    .seatArea {
        width: 100%;
        height: 20%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        // border: black 1px solid;

        .addArea {
            width: 15%;
            font-size: 3dvh;
            border-radius: 1.5vh;
            border: 0;
            border: 0.3vh solid #89A071;
            color: #89A071;
            background-color: #FAF8ED;

            &:hover {
                transition: 0.1s linear;
                color: #FAF8ED;
                background-color: #89A071;
                scale: 1.1;
            }

            &:active {
                scale: 0.95;
                background-color: #4D5C44;
            }
        }
    }

    .inputArea {
        width: 100%;
        height: 20%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 2%;

        // border: black 1px solid;
        .areaInput {
            width: 13%;
            text-align: center;
        }
    }
}

.areaError {
    width: 75%;
    display: flex;
    justify-content: space-between;
}

.addEvent {
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
    margin-top: 2%;
    font-size: 3dvh;

    &:hover {
        transition: 0.1s linear;
        border: 0;
        background-color: #748E63;
        border: 0.3vh solid #748E63;

        color: #FAF8ED;
        scale: 1.1;
    }

    &:active {
        scale: 0.95;
    }
}

.footer {
    height: 10vh;
    width: 100%;
    // text-align: center;
    // border: black 1px solid;


}
</style>