<template>
    <body>
        <span class="titleInterest">感興趣的分類</span>
        <div class="interest">
            <button type="button" class="area" v-if="!japan" @click="japanArea">日本</button>
            <button type="button" class="noArea" v-if="japan" @click="japanArea">日本</button>
            <button type="button" class="area" v-if="!korea" @click="koreaArea">韓國</button>
            <button type="button" class="noArea" v-if="korea" @click="koreaArea">韓國</button>
            <button type="button" class="area" v-if="!taiwan" @click="taiwanArea">台灣</button>
            <button type="button" class="noArea" v-if="taiwan" @click="taiwanArea">台灣</button>
        </div>
        <span class="titleFavorate">最愛列表</span>
        <div class="content" v-for="(item, index) in this.trackerList" :key="index" :class="{ 'first-item': index === 0 }">
            <div class="left">
                <div class="picture">
                    <img :src="item.keyvisualImg">
                </div>

            </div>
            <div class="middle">
                <p>活動名稱</p>
                <p class="infoTitle">{{ item.name }}
                </p>
                <p>演出日期</p>
                <p class="infoTitle">{{ item.startDate }}
                </p>
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
        }
    },
    methods: {
        japanArea() {
            this.japan = !this.japan
        },
        koreaArea(){
            this.korea = !this.korea
        },
        taiwanArea(){
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
        }
    },
    mounted() {
        this.myFav()
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
    // border: 1px solid black;
    display: flex;
    justify-content: space-between;
}

.interest {
    width: 40vw;
    margin-top: 1%;
    padding-left: 15%;
    display: flex;
    justify-content: space-between;

    .area {
        width: 5vw;
        border: 0;
        background-color: #FFC68D;
        font-size: 3dvh;
    }

    .noArea {
        width: 5vw;
        border: 0;
        background-color: #f5a352;
        font-size: 3dvh;
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
    }

}

.right {
    i {
        color: #DB3A3A;
        font-size: 5dvh;

        &:hover {
            transition: 0.1s linear;
            scale: 1.3;
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
}</style>