<template>
    <body>
        <div class="top">
            <span class="title">訂單查詢</span>
        </div>
        <div class="content" :style="{ backgroundColor: payment ? '#99b080' : '#f5a352' }">
            <div class="left">
                <div class="picture">
                    <img
                        src="https://t.kfs.io/upload_images/187458/kktix%E4%B8%BB%E8%A6%96%E8%A6%BA_%E8%87%89%E6%9B%B8%E8%B2%BC%E6%96%87%E9%99%84%E5%9C%96_EDM1200x630_medium.jpg">
                </div>
                <span class="state">狀態</span>
                <span class="stateAbout" :style="{ color: payment ? '#FAF8ED' : '#DB3A3A' }">{{ payment ? '已付款' : '未付款'
                }}</span>
                <span class="orderNumber">訂單編號</span>
                <span class="orderNumberAbout">＃{{ this.orderNumberAbout }}</span>
                <span class="seat">座位</span>
                <span class="seatAbout">{{ this.seatAbout }}</span>
            </div>
            <div class="right">
                <div class="up">
                    <p class="name">活動名稱</p>
                    <p class="nameAbout">{{ this.nameAbout }}</p>
                </div>
                <div class="middle">
                    <p class="date">演出日期</p>
                    <p class="dateAbout">{{ this.dateAbout }}</p>
                </div>
                <div class="down">
                    <p class="place">演出地點</p>
                    <p class="placeAbout">{{ this.placeAbout }}</p>
                </div>
            </div>
        </div>
    </body>
</template>
<script>
export default {
    data() {
        return {
            nameAbout: "",
            orderNumberAbout: "",
            dateAbout: "",
            placeAbout: "",
            seatAbout: "",
            // payment:true,   //付款狀態
        }
    }
}
</script>
<style scoped lang="scss" >
body {
    background-color: #FAF8ED;
}

.title {
    width: 70%;
    height: 10vh;
    // border: 1px solid black;
    margin-left: 15%;
    color: #4D5C44;
    font-size: 4dvh;
    display: flex;
    align-items: end;
}

.content {
    width: 70%;
    height: 40vh;
    margin-left: 15%;
    padding: 3%;
    background-color: #99b080;
    border-radius: 2vh;
    font-size: 2.5dvh;

    .left {
        width: 30%;
        height: 90%;

        .picture {
            width: 100%;
            height: 60%;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 1.5vh;
            }
        }

        .state {
            color: #4D5C44;
            border: 1px black solid;
        }

        .stateAbout {
            border: 1px black solid;
            color: #FAF8ED;
        }
        
        .orderNumber {
            color: #5b6852;
            border: 1px black solid;
            font-weight: 600;
        }
        
        .orderNumberAbout {
            color: #FAF8ED;
            border: 1px black solid;

        }
        
        .seat {
            color: #5b6852;
            font-weight: 600;
        }

        .seatAbout {
            color: #FAF8ED;

        }
    }

    .right {
        width: 55%;
        height: 90%;


        p {
            margin: 0;
        }

        .up {
            width: 100%;
            top: 5%;

            .name {
                color: #5b6852;
                font-weight: 600;
                text-align: center;
            }

            .nameAbout {
                color: #FAF8ED;
                text-align: center;
            }
        }

        .middle {
            width: 100%;
            top: 34%;

            .date {
                color: #5b6852;
                font-weight: 600;
                text-align: center;
            }

            .dateAbout {
                color: #FAF8ED;
                text-align: center;
            }
        }

        .down {


            .place {
                color: #5b6852;
                font-weight: 600;
                text-align: center;
            }

            .placeAbout {
                color: #FAF8ED;
                text-align: center;
            }
        }
    }
}</style>