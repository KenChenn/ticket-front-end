<template>
    <body>
        <span class="title">最愛列表</span>
        <div class="content" v-for="(item, index) in this.trackerList" :key="index" :class="{ 'first-item': index === 0 }">
            <div class="left">
                <div class="picture">
                    <img :src="item.keyvisualImg">
                </div>

            </div>
            <div class="middle">
                <p class="infoTitle">活動名稱</p>
                <p>{{ item.name }}
                </p>
                <p class="infoTitle">演出日期</p>
                <p>{{ item.startDate }}
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
import counter from '../stores/counter'
export default {
    data() {
        return {
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
    height: 30vh;
    margin: auto;
    padding: 2%;
    border: #99b080 0.5vh solid;
    color: #4D5C44;
    border-radius: 2vh;
    font-size: 2.5dvh;
    display: flex;
    justify-content: space-between;
    margin-top: 2%;

    .first-item {
        border: #F5A352 1vh solid;
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