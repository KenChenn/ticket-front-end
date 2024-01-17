<template>
    <div class="top">
        <span class="title">最愛列表</span>
    </div>
    <div class="content" :style="{ backgroundColor: aboutToStart ? '#F5A352' : '#89A071' }">
        <div class="left">
            <div class="picture">
                <img
                    src="https://t.kfs.io/upload_images/187458/kktix%E4%B8%BB%E8%A6%96%E8%A6%BA_%E8%87%89%E6%9B%B8%E8%B2%BC%E6%96%87%E9%99%84%E5%9C%96_EDM1200x630_medium.jpg">
            </div>
            <div class="state">狀態
                <span class="stateAbout" :style="{ color: aboutToStart ? '#DB3A3A' : '#FAF8ED' }">{{ aboutToStart ? '即將開始' :
                    '尚未開始' }}</span>
            </div>
            <div class="orderNumber">訂單編號
                <span class="orderNumberAbout">＃{{ this.orderNumberAbout }}</span>
            </div>
            <div class="seat">座位
                <span class="seatAbout">{{ this.seatAbout }}</span>
            </div>
        </div>
        <div class="right">
            <div class="up">
                <p class="name">活動名稱</p>
                <p class="nameAbout">{{ this.nameAbout }}
                </p>
            </div>
            <div class="middle">
                <p class="date">演出日期</p>
                <p class="dateAbout">{{ this.dateAbout }}
                </p>
            </div>
            <div class="down">
                <p class="place">演出地點</p>
                <p class="placeAbout">{{ this.placeAbout }}
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
        }
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
    padding: 2%;
    background-color: #99b080;
    color: #FAF8ED;
    border-radius: 2vh;
    font-size: 2.5dvh;
    display: flex;
    justify-content: space-between;

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

        .state {
            display: flex;
            justify-content: space-between;
            font-weight: bold;

            .stateAbout {
                color: #FAF8ED;
            }
        }


        .orderNumber {
            display: flex;
            justify-content: space-between;
            font-weight: bold;

            .orderNumberAbout {
                color: #FAF8ED;
            }
        }

        .seat {
            display: flex;
            justify-content: space-between;
            font-weight: bold;

            .seatAbout {
                color: #FAF8ED;
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