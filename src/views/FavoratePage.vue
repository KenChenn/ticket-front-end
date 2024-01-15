<template>
    <body>
        <div class="top">
            <span class="title">最愛列表</span>
        </div>
        <div class="content" :style="{ backgroundColor: aboutToStart ? '#f5a352' : '#99b080' }">
            <div class="left">
                <div class="picture">
                    <img src="https://t.kfs.io/upload_images/187458/kktix%E4%B8%BB%E8%A6%96%E8%A6%BA_%E8%87%89%E6%9B%B8%E8%B2%BC%E6%96%87%E9%99%84%E5%9C%96_EDM1200x630_medium.jpg">
                </div>
                <span class="state">狀態</span>
                <span class="stateAbout" :style="{ color: aboutToStart ? '#DB3A3A' : '#FAF8ED' }">{{ aboutToStart ? '即將開始' : '尚未開始' }}</span>
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
        data(){
            return{
                nameAbout:"",
                orderNumberAbout:"",
                dateAbout:"",
                placeAbout:"",
                seatAbout:"",
                aboutToStart:true,   //開始狀態
            }
        }
    }
</script>
<style scoped lang="scss" >
    body{
        width: 100%;
        height: 110vh;
        padding: 0;
        margin: 0;
        background-color: #faf8ed;
    }
    .top{
        margin-left: 15vw;
        padding-top: 5vh;
        .title{
            margin: 0;
            font-size: 50px;
            color: #4D5C44;
            font-weight: 600;
            margin-right: 44vw;
        }
    }
    .content{
        width: 70vw;
        height: 40vh;
        margin-left: 15vw;
        background-color: #99b080;
        border-radius: 15px;
        position: relative;
        font-size: 20px;
    
        .left{
            position: absolute;
            width: 30%;
            height: 90%;
            top: 5%;
            left: 5%;
            position: relative;
            .picture{
                width: 100%;
                height: 60%;
                
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 15px;
                }
            }
            .state{
                position: absolute;
                color: #5b6852;
                font-weight: 600;
                top: 63%;
                left: 3%;
            }
            .stateAbout{
                position: absolute;
                color: #FAF8ED;
                top: 63%;
                left: 55%;
    
            }
            .orderNumber{
                position: absolute;
                color: #5b6852;
                font-weight: 600;
                top: 76.5%;
                left: 3%;
            }
            .orderNumberAbout{
                position: absolute;
                color: #FAF8ED;
                top: 76.5%;
                left: 55%;
            }
            .seat{
                position: absolute;
                color: #5b6852;
                font-weight: 600;
                top: 90%;
                left: 3%;
            }
            .seatAbout{
                position: absolute;
                color: #FAF8ED;
                top: 90%;
                left: 55%;
            }
        }
        .right{
            position: absolute;
            width: 55%;
            height: 90%;
            top: 5%;
            right: 5%;
            p{
                margin: 0;
            }
            .up{
                position: absolute;
                width: 100%;
                top: 5%;
                .name{
                    color: #5b6852;
                    font-weight: 600;
                    text-align: center;
                }
                .nameAbout{
                    color: #FAF8ED;
                    text-align: center;
                }
            }
            .middle{
                position: absolute;
                width: 100%;
                top: 34%;
                .date{
                    color: #5b6852;
                    font-weight: 600;
                    text-align: center;
                }
                .dateAbout{
                    color: #FAF8ED;
                    text-align: center;
                }
            }
            .down{
                position: absolute;
                width: 100%;
                top: 60%;
                .place{
                    color: #5b6852;
                    font-weight: 600;
                    text-align: center;
                }
                .placeAbout{
                    color: #FAF8ED;
                    text-align: center;
                }
            }
        }
    }
</style>