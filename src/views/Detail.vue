<template >
    <div class="up">
        <div class="showArea">
            <div class="showImg">
                <!-- 節目圖片 -->
                <img v-if="this.codeList[0]" :src="this.codeList[0].keyvisualImg">
            </div>

            <!-- 節目資訊 -->
            <div class="showInfo">
                <i class="fa-regular fa-calendar-days"></i>
                <!-- 時間 -->
                <span v-if="this.codeList[0]">
                    {{ this.codeList[0].startDate }}
                </span>
                <br>
                <i class="fa-solid fa-location-dot"></i>
                <!-- 地點 -->
                <span v-if="this.codeList[0]">
                    {{ this.codeList[0].place }}
                </span>
                <br>
                <i class="fa-solid fa-user"></i>
                <!-- 主辦 -->
                <span v-if="this.codeList[0]">
                    {{ this.codeList[0].organizer }}
                </span>
            </div>

        </div>
    </div>

    <div class="mid">

        <!-- 加入最愛按鈕 -->
        <div class="likeArea">
            <button>
                <i class="fa-solid fa-heart-circle-plus"> 加入最愛</i>
            </button>
        </div>

        <div class="linkArea">
            <RouterLink to="/BuyTicketPage" class="link">
                立即購票
            </RouterLink>
            <RouterLink to="/Introduction" class="link">
                活動介紹
            </RouterLink>
            <RouterLink to="/TicketNoticePage" class="link">
                注意事項
            </RouterLink>
            <RouterLink to="/BuyNoticePage" class="link">
                購買提醒
            </RouterLink>
            <RouterLink to="/GetTicketPage" class="link">
                取票方式
            </RouterLink>
            <RouterLink to="/CencelTicketPage" class="link">
                退票規定
            </RouterLink>
        </div>

    </div>

    <div class="down">
        <div class="title">
            相關討論
        </div>

        <div class="forum">
            <!-- 討論區發言 -->
            <div class="discussion">
                <div class="circle"></div>
                <div class="info">
                    <!-- 使用者名字 -->
                    <div class="user">
                        <span>
                            user
                        </span>
                    </div>
                    <!-- 發言內容 -->
                    <div class="content">
                        <span>
                            Hello world
                        </span>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            codeList: [],
            trackerList:[],
            commodityCodenameList:[]
        }
    },
    methods: {
        codeInfo() {
            fetch('http://localhost:8080/api/get_commodity', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    codename: this.$route.params.codename
                })
            })
                .then(response => response.json())
                .then(data => {
                    this.codeList = data.commodityList;
                    console.log(this.codeList)
                })
                .catch(error => console.log(error))
        },
        searchFavorate(){
            fetch('http://localhost:8080/api/checktrack', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    tracker:
                    commodityCodename
                })
            })
                .then(response => response.json())
                .then(data => {
                    this.codeList = data.commodityList;
                    console.log(this.codeList)
                })
                .catch(error => console.log(error))
        }
    },
    mounted() {
        
    },
    created() {
        this.codeInfo()
    }
}

</script>

<style lang="scss" scoped>
.up {
    width: 100%;
    height: 90vh;
    display: flex;
    justify-content: center;

    .showArea {
        width: 70%;
        height: 90%;
        background-color: #F5A352;
        margin: auto;
        border-radius: 2vh;

        .showImg {
            width: 100%;
            height: 80%;

            img {
                border-radius: 2vh 2vh 0 0;
                height: 100%;
                width: 100%;
                object-fit: cover;
            }
        }

        .showInfo {
            width: 100%;
            height: 20%;

            // border: 1px black solid;
            i,
            span {
                color: #FAF8ED;
                font-size: 3vh;
                margin-left: 5%;
                line-height: 5vh;
            }
        }
    }
}

.mid {
    height: 50vh;
    background-color: #FAF8ED;
    padding: 0% 15% 5% 15%;
    // border: 1px solid black;
}

.likeArea {
    width: 100%;
    height: 10vh;
    // border: 1px black solid;
    margin-bottom: 5vh;

    button {
        width: 100%;
        height: 100%;
        border-radius: 2vh;
        border: none;
        font-size: 3vh;
        color: #DB3A3A;
        background-color: none;
        border: #DB3A3A solid 5px;

        button:active {
            background-color: none;
            border: solid #DB3A3A 1px;
        }
    }
}

.linkArea {
    height: 70%;
    // border: 1px solid black;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .link {
        width: 30%;
        height: 40%;
        margin-bottom: 5vh;
        background-color: #748E63;
        border-radius: 15px;
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        color: #FAF8ED;
    }
}


.down {
    // height: auto;
    background-color: #99B080;
}

.title {
    // border: 1px solid black;
    height: 10vh;
    color: #FAF8ED;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
}

.forum {
    padding: 0% 15% 5% 15%;
}

.discussion {
    width: 100%;
    height: auto;
    margin-bottom: 10vh;
    // border: 1px solid black;
    background-color: #89A071;
    border-radius: 15px;
    display: flex;
}

.circle {
    width: 3vw;
    height: 3vw;
    background-color: #F5A352;
    margin: 2% 2% 0% 2%;
    clip-path: circle(50% at 50% 50%);
}

.info {
    width: auto;
    margin: 2%;
    color: #FAF8ED;

    // border: 1px black solid;
    .user {
        font-size: 2rem;
    }

    .content {
        margin: 1%;
        font-size: 1.5rem;
    }
}
</style>