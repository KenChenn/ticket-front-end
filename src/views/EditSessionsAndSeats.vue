<template>
    <body>
        <div class="header">
            <i class="fa-solid fa-magnifying-glass" @click="search"></i>
            <input type="search" class="search">
            <button type="button" class="signOut">登出</button>
        </div>
        <div class="top">
            <span class="title">場次及座位</span>
            <button type="button" class="completeEditing">完成編輯</button>
        </div>
        <div class="content">
            <span class="start">活動開始時間</span>
            <input type="datetime-local" class="startAbout">
            <button type="button" class="deleteEvent">刪除場次</button>
            <span class="onSale">開售時間</span>
            <input type="datetime-local" class="onSaleAbout">
            <span class="stopSale">停售時間</span>
            <input type="datetime-local" class="stopSaleAbout">
            <span class="area">區域名稱</span>
            <span class="seat">可出售座位數</span>
            <input type="text" class="areaAbout">
            <input type="number" class="seatAbout">
            <button type="button" class="addArea">新增區域</button>
        </div>
        <div class="footer">
            <button type="button" class="addEvent">新增場次</button>
        </div>
    </body>
    </template>
    <script>
    import counter from '../stores/counter'
    export default {
        created() {
            // 創建頁面時設定
            counter().setManager({});
        },
        beforeRouteLeave(to, from, next) {
            // 離開頁面時清除
            counter().setManager(null);
            next();
        },
    }
    </script>
    <style scoped lang="scss">
    body{
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
            margin-right: 39vw;
        }
        .completeEditing{
            margin: 0;
            width: 11vw;
            font-size: 30px;
            color: #faf8ed;
            background-color: #748e63;
            border: 0;
            border-radius: 17px;
        }
    }
    .content{
        width: 70vw;
        height: 65vh;
        margin-left: 15vw;
        background-color: #f5bf89;
        border-radius: 25px;
        font-size: 35px;
        margin-bottom: 3vh;
        position: relative;
    
        span{
            color: #4D5C44;
            margin: 0;
            font-weight: 600;
        }
        input{
            width: 40%;
            height: 11%;
            font-size: 26px;
            color: #4D5C44;
            background-color: #FAF8ED;
            border: 0;
            border-radius: 20px;
            text-indent: 2%;
            text-align: center;
        }
        .start{
            position: absolute;
            top: 10%;
            left: 5%;
        }
        .startAbout{
            position: absolute;
            top: 10%;
            right: 27%;
        }
        .deleteEvent{
            position: absolute;
            margin: 0;
            width: 11vw;
            background-color: #db3a3a;
            font-size: 30px;
            color: #faf8ed;
            border: 0;
            border-radius: 17px;
            top: 10%;
            right: 5%;
        }
        .onSale{
            position: absolute;
            top: 27%;
            left: 8.5%;
        }
        .onSaleAbout{
            position: absolute;
            top: 27%;
            right: 27%;
        }
        .stopSale{
            position: absolute;
            top: 44%;
            left: 8.5%;
        }
        .stopSaleAbout{
            position: absolute;
            top: 44%;
            right: 27%;
        }
        .area{
            position: absolute;
            top: 67%;
            left: 8.5%;
        }
        .seat{
            position: absolute;
            top: 67%;
            right: 40%;
        }
        .areaAbout{
            position: absolute;
            width: 17%;
            top: 80%;
            left: 6%;
        }
        .seatAbout{
            position: absolute;
            top: 80%;
            right: 27%;
        }
        
        .addArea{
            position: absolute;
            margin: 0;
            width: 11vw;
            background-color: #748e63;
            font-size: 30px;
            color: #faf8ed;
            border: 0;
            border-radius: 17px;
            top: 80%;
            right: 5%;
        }
    }
    .footer{
        width: 100%;
        text-align: center;
        .addEvent{
            margin: 0;
                width: 11vw;
                background-color: #748e63;
                font-size: 30px;
                color: #faf8ed;
                border: 0;
                border-radius: 17px;
        }
    }
    </style>