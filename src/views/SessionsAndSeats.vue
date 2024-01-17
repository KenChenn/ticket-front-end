<template>
<body>
    <div class="top">
        <span class="title">場次及座位</span>
        <button type="button" class="completeEditing">完成編輯</button>
    </div>
    <div class="content">
        <div class="startAll">
            <span class="start">活動開始時間</span>
            <input type="datetime-local" class="startAbout">
            <button type="button" class="deleteEvent">刪除場次</button>
        </div>

        <div class="onSaleAll">
            <span class="onSale">開售時間</span>
            <input type="datetime-local" class="onSaleAbout">
        </div>

        <div class="stopSaleAll">
            <span class="stopSale">停售時間</span>
            <input type="datetime-local" class="stopSaleAbout">
        </div>

        <div class="up">
            <span class="area">區域名稱</span>
            <span class="seat">可出售座位數</span>
            <span class="price">座位價格</span>
            <button type="button" class="addArea">新增區域</button>
        </div>
        <div class="down">
            <input type="text" class="areaAbout">
            <input type="number" class="seatAbout">
            <input type="number" class="priceAbout">
            <button type="button" class="deleteArea">刪除區域</button>
        </div>
        
    </div>
    <div class="footer">
        <button type="button" class="addEvent">新增場次</button>
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
body{
    background-color: #faf8ed;
}
.header{
    width: 100%;
    height: 10vh;
    margin-top: 0;
    background-color: #F9B572;
    position: fixed;
    top: 0;
    z-index: 5;
    .fa-solid{
        position: absolute;
        font-size: 30px;
        left:15.5%;
        top: 30%;
        color: #E6E1C8;
        z-index: 10;
        }
    .search{
        position: absolute;
        width: 17%;
        height: 70%;
        top: 15%;
        left: 15%;
        padding-left: 3%;
        border-radius: 15px;
        border: 0 ;
        background-color: #FAF8ED;
        font-size: 25px;
    }
    .signOut{
        position: absolute;
        background-color: transparent;
        color: #FAF8ED;
        font-size: 30px;
        right: 14%;
        top: 20%;
        border: 0;
    }
}
.top{
    width: 70vw;
    height: 100%;
    margin-left: 15vw;
    padding-right: 5%;
    display: flex;
    align-items: end;
    align-items: center;
    justify-content: space-between;

    .title{
        height: 10vh;
        margin-right: 44%;
        color: #c26202;
        font-size: 4dvh;
        display: flex;
        align-items: end;
    }
    .completeEditing{
        width: 11vw;
        margin: 0;
        color: #faf8ed;
        background-color: #748e63;
        border: 0;
        border-radius: 1.5vh;
        font-size: 4dvh;
    }
}

.content {
    width: 70vw;
    // height: 65vh;
    margin-left: 15vw;
    border: #F5A352 0.5vh solid;
    margin: auto;
    border-radius: 2vh;
    padding: 2% 5%;

    span {
        color: #4D5C44;
        font-size: 3dvh;
        margin: 0;
    }
    p{
        color: #4D5C44;
        font-size: 3dvh;
        margin: 0;
        font-weight: 600;
    }

    input {
        width: 30%;
        height: 11%;
        font-size: 2.5dvh;
        border: 0;
        background-color: #FAF8ED;
        border-bottom: #F5A352 0.3vh solid;
        color: #4D5C44;
        text-indent: 2%;
        &:focus {
            outline: none;
        }
    }
    .startAll{
        margin-bottom: 5%;
        display: flex;
        justify-content: space-between;
        // border: black 1px solid;
        .start{
            margin-right: 13.5%;
        }
        .startAbout{
            text-align: center;
            margin-right: 13.5%;
        }
        .deleteEvent{
            margin: 0;
            width: 11vw;
            background-color: #db3a3a;
            font-size: 4dvh;
            color: #faf8ed;
            border: 0;
            border-radius: 1.5vh;
        }
    }
    .onSaleAll{
        margin-bottom: 5%;
        .onSale{
            margin-left: 2.5%;
            margin-right: 15.5%;
        }
        .onSaleAbout{
            text-align: center;
        }
    }
    .stopSaleAll{
        margin-bottom: 8%;

        .stopSale{
            margin-left: 2.5%;
            margin-right: 15.5%;
        }
        .stopSaleAbout{
            text-align: center;
        }
    }
    .up{
        display: flex;
        justify-content: space-between;
        .area{
            margin-left: 2.5%;
            margin-right: 15.5%;
        }
        .seat{
            margin-right: 15.5%;
        }
        .price{
            margin-right: 15.5%;
        }
        .addArea{
        margin: 0;
        width: 11vw;
        background-color: #748e63;
        font-size: 4dvh;
        color: #faf8ed;
        border: 0;
        border-radius: 1.5vh;
        }
    }
    .down{
        display: flex;
        justify-content: space-between;
        margin-top: 1.5%;
        .areaAbout{
            margin-left: 2%;
            margin-right: 17%;
            width: 10%;
        }

        .seatAbout{
            margin-right: 17%;
            width: 10%;
        }
        .priceAbout{
            margin-right: 15%;
            width: 10%;
        }
        .deleteArea{
            margin: 0;
            width: 11vw;
            background-color: #db3a3a;
            font-size: 4dvh;
            color: #faf8ed;
            border: 0;
            border-radius: 1.5vh;
            
        }
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
    .addEvent{
        height: 10%;
        width: 14%;
        border:0.3vh solid #F5A352;
        background-color: #FAF8ED;
        color: #F5A352;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 1.5vh;
        margin: auto;
        margin-top: 3%;
        font-size: 2.5dvh;
        &:hover{
            transition: 0.1s linear;
            border:0;
            background-color: #748E63;
            color: #FAF8ED;
            scale: 1.1;
        }
        &:active{
            scale: 0.95;
        }
    }
}
</style>