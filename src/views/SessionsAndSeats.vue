<template>
<body>
    <div class="top">
        <span class="title">場次及座位</span>
        <button type="button" class="completeEditing">完成編輯</button>
    </div>
    <div class="content">
        <div class="startAll">
            <span class="start">活動開始時間</span>
            <input type="datetime-local" class="startAbout">
            <button type="button" class="deleteEvent">刪除場次</button>
        </div>

        <div class="onSaleAll">
            <span class="onSale">開售時間</span>
            <input type="datetime-local" class="onSaleAbout">
        </div>

        <div class="stopSaleAll">
            <span class="stopSale">停售時間</span>
            <input type="datetime-local" class="stopSaleAbout">
        </div>

        <div class="up">
            <span class="area">區域名稱</span>
            <span class="seat">可出售座位數</span>
            <span class="price">座位價格</span>
            <button type="button" class="addArea">新增區域</button>
        </div>
        <div class="down">
            <input type="text" class="areaAbout">
            <input type="number" class="seatAbout">
            <input type="number" class="priceAbout">
            <button type="button" class="deleteArea">刪除區域</button>
        </div>
        
    </div>
    <div class="footer">
        <button type="button" class="addEvent">新增場次</button>
    </div>
</body>
</template>
<script>
export default {
    
}
</script>
<style scoped lang="scss">
body{
    background-color: #faf8ed;
}
.top{
    width: 70vw;
    height: 100%;
    margin-left: 15vw;
    padding-right: 5%;
    display: flex;
    align-items: end;
    align-items: center;
    justify-content: space-between;

    .title{
        height: 10vh;
        margin-right: 44%;
        color: #c26202;
        font-size: 4dvh;
        display: flex;
        align-items: end;
    }
    .completeEditing{
        width: 11vw;
        margin: 0;
        color: #faf8ed;
        background-color: #748e63;
        border: 0;
        border-radius: 1.5vh;
        font-size: 4dvh;
    }
}
.content{
    width: 70vw;
    // height: 65vh;
    margin-left: 15vw;
    border: #F5A352 0.5vh solid;
    margin: auto;
    border-radius: 2vh;
    padding: 2% 5%;

    span{
        color: #4D5C44;
        font-size: 3dvh;
        margin: 0;
    }
    p{
        color: #4D5C44;
        font-size: 3dvh;
        margin: 0;
    }
    input{
        width: 40%;
        height: 11%;
        font-size: 2.5dvh;
        border: 0;
        background-color: #FAF8ED;
        border-bottom: #F5A352 0.3vh solid;
        color: #4D5C44;
        text-indent: 2%;
        &:focus {
            outline: none;
        }
    }
    .startAll{
        margin-bottom: 5%;
        display: flex;
        justify-content: space-between;
        // border: black 1px solid;
        .start{
            margin-right: 13.5%;
        }
        .startAbout{
            text-align: center;
            margin-right: 13.5%;
        }
        .deleteEvent{
            margin: 0;
            width: 11vw;
            background-color: #db3a3a;
            font-size: 4dvh;
            color: #faf8ed;
            border: 0;
            border-radius: 1.5vh;
        }
    }
    .onSaleAll{
        margin-bottom: 5%;
        .onSale{
            margin-left: 2.5%;
            margin-right: 15.5%;
        }
        .onSaleAbout{
            text-align: center;
        }
    }
    .stopSaleAll{
        margin-bottom: 8%;

        .stopSale{
            margin-left: 2.5%;
            margin-right: 15.5%;
        }
        .stopSaleAbout{
            text-align: center;
        }
    }
    .up{
        display: flex;
        justify-content: space-between;
        .area{
            margin-left: 2.5%;
            margin-right: 15.5%;
        }
        .seat{
            margin-right: 15.5%;
        }
        .price{
            margin-right: 15.5%;
        }
        .addArea{
        margin: 0;
        width: 11vw;
        background-color: #748e63;
        font-size: 4dvh;
        color: #faf8ed;
        border: 0;
        border-radius: 1.5vh;
        }
    }
    .down{
        display: flex;
        justify-content: space-between;
        margin-top: 1.5%;
        .areaAbout{
            margin-left: 2%;
            margin-right: 17%;
            width: 10%;
        }

        .seatAbout{
            margin-right: 17%;
            width: 10%;
        }
        .priceAbout{
            margin-right: 15%;
            width: 10%;
        }
        .deleteArea{
            margin: 0;
            width: 11vw;
            background-color: #db3a3a;
            font-size: 4dvh;
            color: #faf8ed;
            border: 0;
            border-radius: 1.5vh;
            
        }
    }
}
.footer{
    width: 100%;
    text-align: center;
    .addEvent{
        height: 10%;
        width: 14%;
        border:0.3vh solid #F5A352;
        background-color: #FAF8ED;
        color: #F5A352;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 1.5vh;
        margin: auto;
        margin-top: 3%;
        font-size: 2.5dvh;
        &:hover{
            transition: 0.1s linear;
            border:0;
            background-color: #748E63;
            color: #FAF8ED;
            scale: 1.1;
        }
        &:active{
            scale: 0.95;
        }
    }
}
</style>