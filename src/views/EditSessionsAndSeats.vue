<template>
    <body>
        <div class="top">
            <span class="title">編輯場次及座位</span>
            <button type="button" class="completeEditing" @click="createActtivity">編輯活動完成</button>
        </div>
        <div class="content" v-for="(item, index) in this.sessionList" :key="index"
            :style="{ opacity: item.endDisabled ? '0.5' : '1' }">
            <div class="timesArea">

                <div class="timesAll" :style="{ opacity: item.startDisabled ? '0.5' : '1' }">
                    <div class="timesTitle">
                        <span>活動開始時間</span>
                        <input type="datetime-local" class="timesInput" v-model="item.showDateTime" :min="minShowDateTime"
                            :disabled="item.endDisabled || item.startDisabled">
                    </div>
                    <div v-if="item.isEmptyShowDateTime" class=" error">請輸入活動開始時間</div>
                </div>
                <div class="timesAll" :style="{ opacity: item.startDisabled ? '0.5' : '1' }">
                    <div class="timesTitle">
                        <span>開售時間</span>
                        <input type="datetime-local" class="timesInput" v-model="item.startSellDateTime"
                            :min="minStartSellDateTime" :max="maxStartSellDateTime"
                            :disabled="item.endDisabled || item.startDisabled">
                    </div>
                    <div v-if="item.isEmptyStartSellDateTime" class=" error">請輸入開售時間</div>
                    <div v-if="item.startIsAfterShow" class="error">開售時間已晚於活動開始時間</div>
                </div>

                <div class="timesAll">
                    <div class="timesTitle">
                        <span>停售時間</span>
                        <input type="datetime-local" class="timesInput" v-model="item.endSellDateTime"
                            @click="EndSellDateTime(item.startSellDateTime, item.showDateTime)" :min="minEndSellDateTime"
                            :max="maxEndSellDateTime" :disabled="item.endDisabled">
                    </div>
                    <div v-if="item.isEmptyEndSellDateTime" class=" error ">請輸入停售時間</div>
                    <div v-if="item.endIsafterShow" class=" error ">停售時間已晚於活動開始時間</div>
                </div>
            </div>

            <button type="button" class="delete" @click="deleteEvent(index)"
                :disabled="item.endDisabled || item.startDisabled"
                :style="{ opacity: item.startDisabled ? '0.5' : '1' }">刪除場次</button>

            <div class="seatArea" :style="{ opacity: item.startDisabled ? '0.5' : '1' }">
                <span>區域名稱</span>
                <span>可出售座位數</span>
                <span>座位價格</span>
                <button type="button" class="addArea" @click="addArea(index)"
                    :disabled="item.endDisabled || item.startDisabled">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
            <div class="inputArea" v-for="(areaItem, areaIndex) in item.seatData" :key="areaIndex"
                :style="{ opacity: item.startDisabled ? '0.5' : '1' }">
                <input type="text" class="areaInput" v-model="areaItem.area"
                    :disabled="item.endDisabled || item.startDisabled">
                <input type="number" class="areaInput" v-model="areaItem.maxSeatNum"
                    :disabled="item.endDisabled || item.startDisabled">
                <input type="number" class="areaInput" v-model="areaItem.price"
                    :disabled="item.endDisabled || item.startDisabled">
                <button type="button" class="delete" @click="deleteArea(index, areaIndex)"
                    :disabled="item.endDisabled || item.startDisabled">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
            <div class="areaError" v-for="(areaItem, areaIndex) in item.seatData">
                <div v-if="areaItem.isEmptyArea" class="error errorArea">請輸入區域名稱 </div>
                <div v-if="areaItem.isEmptySeat" class="error errorSeat">請輸入可出售座位數 </div>
                <div v-if="areaItem.isEmptyPrice" class="error errorPrice">請輸入座位價格 </div>
            </div>
        </div>

        <button type="button" class="addEvent" @click="addEvent">新增場次</button>
        <div class="footer">
        </div>
    </body>
</template>
<script>
import counter from '../stores/counter'
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

            EditActtivity: {},

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
                item.commodity_codename = this.EditActtivity.codename;
            })

            console.log(this.sessionList);
            for (const session of this.sessionList) {
                const areaMap = {}; //存已出現區域名稱
                for (const seat of session.seatData) {
                    // 防呆未輸入
                    if (session.showDateTime == "") {
                        alert("有活動開始時間未輸入")
                        session.isEmptyShowDateTime = true
                    } else {
                        session.isEmptyShowDateTime = false
                    }
                    if (session.startSellDateTime == "") {
                        alert("有開售時間未輸入")
                        session.isEmptyStartSellDateTime = true
                    } else {
                        session.isEmptyStartSellDateTime = false
                    }
                    if (session.endSellDateTime == "") {
                        alert("有停售時間未輸入")
                        session.isEmptyEndSellDateTime = true
                    } else {
                        session.isEmptyEndSellDateTime = false
                    }
                    if (seat.area == "") {
                        alert("有區域名稱未輸入")
                        seat.isEmptyArea = true
                    } else {
                        seat.isEmptyArea = false
                    }
                    if (seat.maxSeatNum <= 0) {
                        alert("有可出售座位數未輸入")
                        seat.isEmptySeat = true
                    } else {
                        seat.isEmptySeat = false
                    }
                    if (seat.price <= 0) {
                        alert("有座位價格未輸入")
                        seat.isEmptyPrice = true
                    } else {
                        seat.isEmptyPrice = false
                    }

                    // 防呆區域名稱相同
                    // 检查当前区域是否已经出现过
                    if (areaMap[seat.area] && seat.area != "") {
                        alert("有重複的區域名稱")
                        seat.isRepeatArea = true
                        return
                    } else {
                        // 如果没有出现过，将其添加到 areaMap 中
                        areaMap[seat.area] = true;
                        seat.isRepeatArea = false
                    }

                    //防呆時間早晚順序錯誤
                    if (session.showDateTime != "" && session.startSellDateTime != "" && session.showDateTime < session.startSellDateTime) {
                        session.startIsAfterShow = true
                        alert("開售時間已晚於活動開始時間")
                    } else {
                        session.startIsAfterShow = false
                    }
                    if (session.showDateTime != "" && session.endSellDateTime != "" && session.showDateTime < session.endSellDateTime) {
                        session.endIsafterShow = true
                        alert("停售時間已晚於活動開始時間")
                    } else {
                        session.endIsafterShow = false
                    }
                    if (session.startSellDateTime != "" && session.endSellDateTime != "" && session.endSellDateTime < session.startSellDateTime) {
                        session.endIsEarlyStart = true
                        alert("停售時間已早於開售時間")
                    } else {
                        session.endIsEarlyStart = false
                    }

                    this.isEmptyShowDateTime = session.isEmptyShowDateTime
                    this.isEmptyStartSellDateTime = session.isEmptyStartSellDateTime
                    this.isEmptyEndSellDateTime = session.isEmptyEndSellDateTime
                    this.isEmptyArea = seat.isEmptyArea
                    this.isEmptySeat = seat.isEmptySeat
                    this.isEmptyPrice = seat.isEmptyPrice
                    this.isRepeatArea = seat.isRepeatArea
                    this.startIsAfterShow = session.startIsAfterShow
                    this.endIsafterShow = session.endIsafterShow
                    this.endIsEarlyStart = session.endIsEarlyStart
                }
            }
            if (!this.isEmptyShowDateTime && !this.isEmptyStartSellDateTime && !this.isEmptyEndSellDateTime && !this.isEmptyArea && !this.isEmptySeat && !this.isEmptyPrice && !this.isRepeatArea && !this.startIsAfterShow && !this.endIsafterShow && !this.endIsEarlyStart) {
                this.EditActtivity.sessionData = this.sessionList

                const allShowDateTimes = this.sessionList.flatMap(item => item.showDateTime);

                const earliestDateTime = allShowDateTimes.reduce((earliest, current) => (current < earliest ? current : earliest), allShowDateTimes[0]);
                const latestDateTime = allShowDateTimes.reduce((latest, current) => (current > latest ? current : latest), allShowDateTimes[0]);

                this.EditActtivity.startDate = earliestDateTime
                this.EditActtivity.endDate = latestDateTime

                if (this.EditActtivity.keyvisualImg == undefined) {
                    this.EditActtivity.keyvisualImg = ""
                }
                if (this.EditActtivity.introduceImg1 == undefined) {
                    this.EditActtivity.introduceImg1 = ""
                }
                if (this.EditActtivity.introduceImg2 == undefined) {
                    this.EditActtivity.introduceImg2 = ""
                }
                console.log(this.EditActtivity);

                fetch('http://localhost:8080/api/update_commodity_and_session', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        id: this.EditActtivity.id,
                        codeName: this.EditActtivity.codename,
                        name: this.EditActtivity.name,
                        introduction: this.EditActtivity.introduction,
                        entity: this.EditActtivity.enity,
                        place: this.EditActtivity.place,
                        organizer: this.EditActtivity.organizer,
                        startDate: this.EditActtivity.startDate,
                        endDate: this.EditActtivity.endDate,
                        keyvisual_img: this.EditActtivity.keyvisualImg,
                        introduce_img1: this.EditActtivity.introduceImg1,
                        introduce_img2: this.EditActtivity.introduceImg2,
                        sessionData: this.EditActtivity.sessionData
                    }),
                }).then(response => response.json())
                    .then(res => {
                        console.log(res);
                        if (res.rtncode == "SUCCESSFUL") {
                            this.$router.push('/ActivityAndHostPage')
                        }
                        if (res.rtncode == "PLEASE_LOGIN_ADMIN_ACCOUNT_FIRST") {
                            alert("請先登入")
                            this.$router.push('/AdminLoginPage');
                        }
                        if (res.rtncode == "PARAM_ERROR") {
                            alert("請確認資料是否填寫完畢 或 填寫時間是否晚於本機時間")
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
        let EditActtivity = JSON.parse(localStorage.getItem("EditActtivity"))
        // console.log(EditActtivity);
        this.EditActtivity = EditActtivity
        fetch('http://localhost:8080/api/get_update_commmodity_data', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({
                codename: this.$route.params.codename
            })
        }).then(response => response.json())
            .then(res => {
                if (res.rtncode == "SUCCESSFUL") {
                    if (new Date(res.data.endDate) < new Date()) {
                        this.$router.push('/ActivityAndHostPage')
                    }
                    // console.log(res.data)
                    this.sessionList = res.data.sessionData
                    console.log(this.sessionList)
                    this.sessionList.forEach(item => {
                        var today = new Date();
                        var startSellDateTime = new Date(item.startSellDateTime);
                        if (startSellDateTime <= today) {
                            item.startDisabled = true
                            item.endDisabled = false
                        } else {
                            item.startDisabled = false
                        }

                        var endSellDateTime = new Date(item.endSellDateTime);
                        endSellDateTime.setDate(endSellDateTime.getDate() - 1)
                        endSellDateTime = new Date(endSellDateTime);
                        // console.log(endSellDateTime);
                        if (endSellDateTime <= today) {
                            item.endDisabled = true
                            item.startDisabled = false
                        } else {
                            item.endDisabled = false
                        }
                    })
                } else if (res.rtncode == "PLEASE_LOGIN_ADMIN_ACCOUNT_FIRST") {
                    alert("請先登入")
                }
            })
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
        transition: 0.1s linear;

        &:hover {
            transition: 0.2s linear;
            color: #FAF8ED;
            background-color: #89A071;
            scale: 1.05;
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
        transition: 0.1s linear;

        &:hover {
            transition: 0.2s linear;
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
            transition: 0.1s linear;

            &:hover {
                transition: 0.2s linear;
                color: #FAF8ED;
                background-color: #89A071;
                scale: 1.05;
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
    transition: 0.1s linear;

    &:hover {
        transition: 0.2s linear;
        border: 0;
        background-color: #748E63;
        border: 0.3vh solid #748E63;
        color: #FAF8ED;
        scale: 1.05;
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