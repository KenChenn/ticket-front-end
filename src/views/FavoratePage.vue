<template>
    <body>
        <span class="titleInterest">感興趣的分類</span>
        <div class="interest">
            <div v-for="item in this.subscribeList">
                <button type="button" class="noArea" v-if="this.alreadySubscribeList.includes(item)"
                    @click="cancelSubscribe(item)">{{ item }}</button>
                <button type="button" class="area " v-else @click="subscribe(item)">{{ item }}</button>
            </div>
        </div>
        <span class="titleFavorate">最愛列表</span>
        <div class="content" v-for="(item, index) in this.trackerList" :key="index"
            :class="{ 'first-item': item.startDate === trackerList[0].startDate, 'content': item.startDate !== trackerList[0].startDate }">
            <div class="left">
                <div class="picture">
                    <img :src="item.keyvisualImg">
                </div>

            </div>
            <div class="middle">
                <div class="eventTitle">
                    <p>活動名稱</p>
                    <p class="infoTitle">{{ item.name }}
                    </p>
                </div>
                <div class="eventDate">
                    <div class="eventStartDate">
                        <p>活動開始日期</p>
                        <p class="infoTitle">{{ item.startDate }}
                        </p>
                    </div>
                    <div class="eventEndDate">
                        <p>活動結束日期</p>
                        <p class="infoTitle">{{ item.endDate }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="right">
                <i class="fa-solid fa-circle-xmark" @click="this.deleteFav(item.commodityCodename)"></i>
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
            japan: false,
            korea: false,
            taiwan: false,
            nameAbout: "",
            orderNumberAbout: "",
            dateAbout: "",
            placeAbout: "",
            seatAbout: "",
            // aboutToStart: true,   //開始狀態
            trackerList: [],
            myFavList: [],
            subscribeList: [],
            alreadySubscribeList: []
        }
    },
    methods: {
        japanArea() {
            this.japan = !this.japan
        },
        koreaArea() {
            this.korea = !this.korea
        },
        taiwanArea() {
            this.taiwan = !this.taiwan
        },
        myFav() {
            fetch('http://localhost:8080/api/getTrackingList', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    tracker: $cookies.get("account"),
                })
            })
                .then(response => response.json())
                .then(data => {
                    this.trackerList = data.data;
                    console.log(this.trackerList)
                })
                .catch(error => console.log(error))
        },
        deleteFav(commodityCodename) {
            Swal.fire({
                title: "是否移除最愛",
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
                        this.confirmDeleteFav(commodityCodename)
                        Swal.fire({
                            title: "移除最愛成功",
                            icon: "success",
                            color: "#4D5C44",
                            background: "#FAF8ED",
                            confirmButtonColor: "#748e63",
                        })
                    }
                })
        },
        confirmDeleteFav(commodityCodename) {
            fetch('http://localhost:8080/api/untrack', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    tracker: $cookies.get("account"),
                    commodityCodename: commodityCodename
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.myFavList = data;
                    console.log(this.myFavList)
                    if (data.rtncode == "SUCCESSFUL") {
                        this.myFav()
                    }
                })
                .catch(error => console.log(error))
        },
        getSubscribeData() {
            fetch('http://localhost:8080/api/getAllSubscribe', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
                .then(response => response.json())
                .then(data => {
                    for (let i = 0; i < data.typeList.length; i++) {
                        let str = data.typeList[i];
                        this.subscribeList.push(str.split('.')[1])
                    }
                    console.log(this.subscribeList);
                })
        },
        getAlreadySubscribeList() {
            fetch('http://localhost:8080/api/getSubscribeList', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include'
            })
                .then(response => response.json())
                .then(data => {
                    this.alreadySubscribeList = []
                    for (let i = 0; i < data.subscribeList.length; i++) {
                        this.alreadySubscribeList.push(data.subscribeList[i].subscribe)
                    }
                    console.log(this.alreadySubscribeList);
                })
        },
        subscribe(item) {
            fetch('http://localhost:8080/api/subscribe', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({
                    subscribe: item
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.rtncode == "SUCCESSFUL") {
                        Swal.fire({
                            title: "訂閱成功",
                            icon: "success",
                            color: "#4D5C44",
                            background: "#FAF8ED",
                            confirmButtonColor: "#748e63",
                        }).then(function (result) {
                            if (result.isConfirmed == true) {
                                this.getAlreadySubscribeList();
                            }
                        }.bind(this))
                    }
                })
        },
        cancelSubscribe(item) {
            fetch('http://localhost:8080/api/cancelSubscribe', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({
                    subscribe: item
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.rtncode == "SUCCESSFUL") {
                        Swal.fire({
                            title: "取消訂閱成功",
                            icon: "success",
                            color: "#4D5C44",
                            background: "#FAF8ED",
                            confirmButtonColor: "#748e63",
                        }).then(function (result) {
                            if (result.isConfirmed == true) {
                                this.getAlreadySubscribeList();
                            }
                        }.bind(this))
                    }
                })

        }
    },
    mounted() {
        this.myFav()
        this.getSubscribeData()
        this.getAlreadySubscribeList()
    },
    created() {
        // 在页面创建时设置特定的对象
        counter().setUser({});
    },

    beforeDestroy() {
        // 在页面销毁时清除特定的对象
        counter().setUser(null);
    },
    beforeRouteLeave(to, from, next) {
        // 在离开页面时清除特定的对象
        counter().setUser(null);
        next();
    },
}
</script>
<style scoped lang="scss" >
body {
    background-color: #FAF8ED;
}

.titleInterest {
    width: 70%;
    height: 10vh;
    margin-top: 10vh;
    margin-left: 15%;
    color: #4D5C44;
    font-size: 4dvh;
    display: flex;
    align-items: end;
    display: flex;
    justify-content: space-between;
    // border: 1px solid black;
}

.interest {
    width: 20%;
    margin-top: 1%;
    margin-left: 15%;
    display: flex;
    justify-content: space-between;
    // border: 1px solid black;

    .area {
        width: 5vw;
        font-size: 3dvh;
        border-radius: 1.5vh;
        border: 0.3vh solid #FFC68D;
        background-color: #FAF8ED;
        color: #4D5C44;
        transition: 0.1s linear;


        &:hover {
            transition: 0.2s linear;
            color: #FAF8ED;
            border: 0;
            background-color: #F5A352;
            scale: 1.05;
        }

        &:active {
            background-color: #c26202;
            scale: 0.95;
        }
    }

    .noArea {
        width: 5vw;
        border-radius: 1.5vh;
        font-size: 3dvh;
        border: 0.3vh solid #FFC68D;
        background-color: #FFC68D;
        color: #4D5C44;
        transition: 0.1s linear;
        
        &:hover {
            transition: 0.2s linear;
            border: 0;
            color: #F5A352;
            border: 0.3vh solid #FFC68D;
            background-color: #FAF8ED;
            scale: 1.05;
        }
        
        &:active {
            border: 0.3vh solid #FFC68D;
            background-color: #c26202;
            scale: 0.95;
        }
    }
}

.titleFavorate {
    width: 70%;
    height: 10vh;
    margin-top: 1vh;
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
    height: 30vh;
    margin: auto;
    padding: 2%;
    background-color: #CBDABA;
    color: #4D5C44;
    border-radius: 2vh;
    font-size: 2.5dvh;
    display: flex;
    justify-content: space-between;
    margin-top: 2%;
    box-shadow: 0 0 0.3vh #00000050;

    .first-item {
        background-color: #FFC68D;
    }

    .left {
        width: 20vw;
        height: 100%;
        // border: 1px black solid;

        .picture {
            width: 100%;
            height: 100%;
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
    }

    .middle {
        width: 35vw;
        height: 100%;
        text-align: center;
        // border: 1px black solid;
        line-height: 3vh;

        .infoTitle {
            // color: #c26202;
            font-weight: bold;
        }
        .eventDate{
            margin-top: 5%;
            display: flex;
            justify-content: space-between;
            padding: 0 15%;
            .eventStartDate{

            }
            .eventEndDate{

            }
        }
    }

}

.right {
    cursor: pointer;
    i {
        color: #DB3A3A;
        font-size: 5dvh;
        transition: 0.1s linear;

        &:hover {
            transition: 0.2s linear;
            scale: 1.2;
            color: #F14242;
        }

        &:active {
            scale: 0.95;
            color: #ab3131;
        }
    }
}

.footer {
    height: 10vh;
}
</style>