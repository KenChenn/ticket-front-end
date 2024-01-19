<template>
    <div class="top">
        <span class="title">最愛列表</span>
    </div>
    <div class="content"  :style="{ backgroundColor: aboutToStart ? '#F5A352' : '#89A071' }" v-for="(item,index) in this.trackerList">
        <div class="left">
            <div class="picture">
                <img :src="item.keyvisualImg">
            </div>
            <button type="button" @click="this.deleteFav(item.commodityCodename)">刪除</button>
        </div>
        <div class="right">
            <div class="up">
                <p class="name">活動名稱</p>
                <p class="nameAbout">{{ item.name }}
                </p>
            </div>
            <div class="middle">
                <p class="date">演出日期</p>
                <p class="dateAbout">{{ item.startDate }}
                </p>
            </div>
            <div class="down">
                <p class="place">演出地點</p>
                <p class="placeAbout">{{ item.place }}
                </p>
            </div>
        </div>
    </div>
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
            aboutToStart: true,   //開始狀態
            trackerList:[],
            myFavList:[],
        }
    },
    methods:{
        myFav(){
            fetch('http://localhost:8080/api/getTrackingList', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    tracker:$cookies.get("account"),
                })
            })
                .then(response => response.json())
                .then(data => {
                    this.trackerList = data.data;
                    console.log(this.trackerList)
                })
                .catch(error => console.log(error))
        },
        deleteFav(commodityCodename){
            fetch('http://localhost:8080/api/untrack', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    tracker:$cookies.get("account"),
                    commodityCodename:commodityCodename
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.myFavList = data;
                    console.log(this.myFavList)
                    if( data.rtncode == "SUCCESSFUL" ){
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
        counter().setHeaderLink({});
    },

    beforeDestroy() {
        // 在页面销毁时清除特定的对象
        counter().setHeaderLink(null);
    },
    beforeRouteLeave(to, from, next) {
        // 在离开页面时清除特定的对象
        counter().setHeaderLink(null);
        next();
    },
}
</script>
<style scoped lang="scss" >
.top {
    .title {
        width: 70%;
        height: 10vh;
        margin-left: 15%;
        color: #4D5C44;
        font-size: 4dvh;
        display: flex;
        align-items: end;
        // border: 1px solid black;
        display: flex;
        justify-content: space-between;
    }
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