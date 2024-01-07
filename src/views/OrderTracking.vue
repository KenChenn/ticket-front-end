<template>
<body>
    <div class="header">
        <i class="fa-solid fa-magnifying-glass" @click="search"></i>
        <input type="search" class="search">
        <button type="button" class="orderTracking">訂單查詢</button>
        <button type="button" class="signOut">登出</button>
    </div>
    <div class="top">
        <span class="title">訂單查詢</span>
        <span class="tip">未付款為橘色卡片</span>
    </div>
    <div class="alreadyPaid" >
        <div class="up">
            <p class="name">活動名稱</p>
            <p class="nameAbout">{{ this.nameAbout }}</p>
        </div>
        <div class="down">
            <div class="left">
                <img src="https://t.kfs.io/upload_images/187458/kktix%E4%B8%BB%E8%A6%96%E8%A6%BA_%E8%87%89%E6%9B%B8%E8%B2%BC%E6%96%87%E9%99%84%E5%9C%96_EDM1200x630_medium.jpg" class="picture">
                <span class="state">狀態</span>
                <span class="stateAbout">已付款</span>
                <p></p>
                <span class="orderNumber">訂單編號</span>
                <span class="orderNumberAbout">＃{{ this.orderNumberAbout }}</span>
            </div>
            <div class="right">
                <div class="one">
                    <p class="date">演出日期</p>
                    <p class="dateAbout">{{ this.dateAbout }}</p>
                </div>
                <div class="two">
                    <p class="place">演出地點</p>
                    <p class="placeAbout">{{ this.placeAbout }}</p>
                </div>
                <div class="three">
                    <p class="seat">座位</p>
                    <p class="seatAbout">{{ this.seatAbout }}</p>
                </div>
            </div>
        </div>


    </div>
    <div class="unpaid">

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
        }
    }
}
</script>
<style scoped lang="scss">
body{
    width: 100%;
    height: 110vh;
    background-color: #faf8ed;
}
.header{
    width: 100%;
    height: 10vh;
    margin-top: 0;
    background-color: #F9B572;
    position: fixed;
    top: 0;
    // position: relative;
    .fa-solid{
        position: absolute;
        font-size: 30px;
        left:10.5%;
        top: 30%;
        color: #E6E1C8;
        z-index: 10;
        }
    .search{
        position: absolute;
        width: 17%;
        height: 70%;
        top: 15%;
        left: 10%;
        padding-left: 3%;
        border-radius: 10px;
        border: 1pt solid #FAF8ED ;
        background-color: #FAF8ED;
        font-size: 25px;
    }
    .orderTracking{
        position: absolute;
        background-color: transparent;
        color: #FAF8ED;
        font-size: 30px;
        right: 18%;
        top: 20%;
        border: 0;
    }
    .signOut{
        position: absolute;
        background-color: transparent;
        color: #FAF8ED;
        font-size: 30px;
        right: 10%;
        top: 20%;
        border: 0;
    }
            
}
.top{
    margin-top: 10vh;
    margin-left: 10vw;
    .title{
        margin: 0;
        font-size: 50px;
        color: #4D5C44;
        font-weight: 500;
        margin-right: 54vw;
    }
    .tip{
        margin: 0;
        font-size: 25px;
        color: #4D5C44;
    }
}
    .alreadyPaid{
        width: 80vw;
        height: 85vh;
        margin-left: 10vw;
        background-color: #99b080;
        border-radius: 25px;
        font-size: 35px;
        margin-bottom: 15vh;
        .up{
            padding-top: 3vh;
            text-align: center;
            font-size: 40px;
            .name{
                margin: 0;
                font-weight: 600;
                color: #4D5C44;
            }
            .nameAbout{
                color: #FAF8ED;
                margin: 0;
            }
        }
        .down{
            position: absolute;
            width: 80vw;
            top: 40%;
            display: flex;
            .left{
                width: 40%;
                height: 60vh;
                padding-left: 3%;
                position: relative;
                .picture{
                    position: absolute;
                    border-radius: 20px;
                    width: 28vw;
                }
                .state{
                    position: absolute;
                    color: #4D5C44;
                    font-weight: 600;
                    top: 60%;
                }
                .stateAbout{
                    position: absolute;
                    color: #FAF8ED;
                    top: 60%;
                    left: 50%;
                }
                .orderNumber{
                    position: absolute;
                    color: #4D5C44;
                    top: 75%;
                    font-weight: 600;
                }
                .orderNumberAbout{
                    position: absolute;
                    color: #FAF8ED;
                    top: 75%;
                    left: 50%;
                }
            }
            .right{
                position: absolute;
                left: 40%;
                width: 58%;
                height: 60vh;
                // padding-right: 3%;
                // padding-left: 1%;
                .one{
                    position: absolute;
                    width: 100%;

                    .date{
                        color: #4D5C44;
                        margin: 1%;
                        margin-top: 0;
                        font-weight: 600;
                        text-align: center;
                    }
                    .dateAbout{
                        color: #FAF8ED;
                        margin: 0;
                        text-align: center;
                    }
                }
                .two{
                    position: absolute;
                    top: 25%;
                    width: 100%;
                    .place{
                        color: #4D5C44;
                        margin: 1%;
                        font-weight: 600;
                        text-align: center;
                    }
                    .placeAbout{
                        color: #FAF8ED;
                        margin: 0;
                        text-align: center;
                    }
                }
                .three{
                    position: absolute;
                    top: 73%;
                    width: 100%;
                    .seat{
                        color: #4D5C44;
                        margin: 1%;
                        font-weight: 600;
                        text-align: center;
                    }
                    .seatAbout{
                        color: #FAF8ED;
                        margin: 0;
                        text-align: center;
    
                    }
                }

            }
        }
    }
    .unpaid{
    }
</style>