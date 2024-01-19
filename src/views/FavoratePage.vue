<template>
<body>

    <div class="top">
        <span class="title">最愛列表</span>
    </div>
    <div class="content" v-for="(item,index) in this.trackerList" :key="index" :class="{ 'first-item': index === 0 }">
        <div class="left">
            <div class="picture">
                <img
                :src="item.keyvisualImg">
            </div>
            
            <!-- <button type="button" @click="this.deleteFav(item.commodityCodename)">刪除</button> -->
        </div>
        <div class="middle">
            <div class="nameAll">
                <p class="name">活動名稱</p>
                <p class="nameAbout">{{ item.name }}
                </p>
            </div>
            <div class="dateAll">
                <p class="date">演出日期</p>
                <p class="dateAbout">{{ item.startDate }}
                </p>
            </div>
            <!-- <div class="placeAll">
                <p class="place">演出地點</p>
                <p class="placeAbout">{{ item.place }}
                </p>
            </div> -->
        </div>
        <div class="right">
            <i class="fa-solid fa-circle-xmark" @click="this.deleteFav(item.commodityCodename)"></i>
        </div>
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
body {
    background-color: #FAF8ED;
}
.top {
    margin-top: 10vh;
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
    height: 30vh;
    margin: auto;
    padding: 2%;
    border: #99b080 0.5vh solid;
    // background-color: #99b080;
    color: #4D5C44;;
    border-radius: 2vh;
    font-size: 2.5dvh;
    display: flex;
    justify-content: space-between;
    margin-top: 2%;

    .first-item {
        border: #F5A352 1vh solid;
    }

    .left {
        width: 20dvw;
        height: 100%;
        // border: 1px black solid;

        .picture {
            width: 100%;
            height: 100%;

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

    .middle {
        width: 20dvw;
        height: 100%;
        // border: 1px black solid;

        .nameAll {
            // border: 1px black solid;
            width: 100%;

            .name {
                font-weight: bold;
                text-align: center;
            }

            .nameAbout {
                color: #4D5C44;
                text-align: center;
            }
        }
        .dateAll {
            width: 100%;
            // border: 1px black solid;

            .date {
                font-weight: bold;
                text-align: center;
            }

            .dateAbout {
                color: #4D5C44;
                text-align: center;
            }
        }


        // .placeAll {
        //     width: 100%;
        //     // border: 1px black solid;

        //     .place {
        //         font-weight: bold;
        //         text-align: center;
        //     }

        //     .placeAbout {
        //         color: #FAF8ED;
        //         text-align: center;
        //     }
        // }
    }
    .right{
        // border: 1px solid black;
        i{
            color: #DB3A3A;
            font-size: 7dvh;
            // background-color: #FAF8ED;
            // border-radius: 100% ;
            // clip-path: circle(47% at 50% 50%);
            
        }
    }
}
</style>