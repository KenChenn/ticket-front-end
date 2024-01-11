<template>
<body>
    <div class="top">
        <span class="title">訂單查詢</span>
        <span class="tip">未付款為橘色卡片</span>
    </div>
    <div class="content" >
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
<style scoped lang="scss" >
body{
    width: 100%;
    height: 110vh;
    padding: 0;
    margin: 0;
    background-color: #faf8ed;
}
.header{
    width: 100%;
    height: 10vh;
    margin-top: 0;
    background-color: #F9B572;
    position: fixed;
    top: 0;
    z-index: 5;
    .fa-solid{
        position: absolute;
        font-size: 30px;
        left:15.5%;
        top: 30%;
        color: #E6E1C8;
        z-index: 10;
        }
    .search{
        position: absolute;
        width: 17%;
        height: 70%;
        top: 15%;
        left: 15%;
        padding-left: 3%;
        border-radius: 15px;
        border: 0 ;
        background-color: #FAF8ED;
        font-size: 25px;
    }
    .orderTracking{
        position: absolute;
        background-color: transparent;
        color: #FAF8ED;
        font-size: 30px;
        right: 23%;
        top: 20%;
        border: 0;
    }
    .signOut{
        position: absolute;
        background-color: transparent;
        color: #FAF8ED;
        font-size: 30px;
        right: 14%;
        top: 20%;
        border: 0;
    }
            
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
    .tip{
        margin: 0;
        font-size: 25px;
        color: #4D5C44;
    }
}
    .content{
        width: 70vw;
        height: 80vh;
        margin-left: 15vw;
        background-color: #99b080;
        border-radius: 25px;
        font-size: 35px;
        margin-bottom: 15vh;
        position: relative;
        .up{
            position: absolute;
            width: 100%;
            top: 3vh;
            font-size: 40px;
            .name{
                margin: 0;
                font-weight: 600;
                color: #4D5C44;
                text-align: center;
            }
            .nameAbout{
                color: #FAF8ED;
                margin: 0;
                text-align: center;
            }
        }
        .down{
            position: absolute;
            width: 80vw;
            top: 25%;
            display: flex;
            .left{
                width: 40%;
                height: 60vh;
                padding-left: 3%;
                position: relative;
                .picture{
                    position: absolute;
                    top: 0;
                    border-radius: 20px;
                    width: 25vw;
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
                left: 36%;
                width: 50%;
                height: 60vh;
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
                    top: 23%;
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
                        word-wrap:break-word;
                    }
                }
                .three{
                    position: absolute;
                    top: 68%;
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
</style>