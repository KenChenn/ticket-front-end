<template>
    <body>
        <div class="top">
            <div class="title">
                編輯活動
                <div class="compel">
                    *為必填
                </div>
            </div>
        </div>
        <div class="content">
            <div class="name">
                <span>活動名稱*</span><br>
                <input type="text" class="nameAbout">
            </div>
            <div class="num">
                <span>活動代號*</span><br>
                <input type="text" class="numAbout">
            </div>

            <div class="entity">
                <span>是否為實體活動*</span><br>
                <div class="radio">
                    <span class="yes">是</span>
                    <input type="radio" name="radio">
                    <span class="no">否</span>
                    <input type="radio" name="radio">
                </div>
            </div>
            <div class="place">
                <span>地點</span> <br>
                <input type="text" class="placeAbout">
            </div>
            <div class="illustrate">
                <div class="illustrateAbout">活動說明</div>
                <textarea name="" id="" cols="30" rows="10">
            </textarea>
            </div>
            <div class="unit">
                <span>主辦單位*</span><br>
                <select name="" id="" class="unitAbout">
                    <option value="">主辦單位名稱</option>
                    <option value="">主辦單位名稱</option>
                </select>
            </div>
            <div class="vision">
                <span>主視覺圖</span>
                <input type="file" class="visionPicture">
            </div>
            <div class="vision">
                <span>座位或介紹圖片/1</span>
                <input type="file" class="visionPicture">
            </div>
            <div class="vision">
                <span>座位或介紹圖片/2</span>
                <input type="file" class="visionPicture">
            </div>

            <button type="button" class="establish">確認</button>
        </div>
        <div class="footer">

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
<style lang="scss" scoped>
body {
    background-color: #FAF8ED;
}

.title {
    width: 70%;
    margin-top: 10vh;
    margin-left: 15%;
    color: #c26202;
    font-size: 4dvh;
    display: flex;
    align-items: end;
    //  // border: 1px solid black;
    display: flex;
    justify-content: space-between;

    .compel {
        font-size: 2.5dvh;
        color: #c26202;
    }
}

.content {
    width: 70%;
    margin-left: 15%;
    background-color: #FAF8ED;
    border: #F5BF89 0.5vh solid;
    color: #4D5C44;
    border-radius: 2vh;
    font-size: 3dvh;
    padding: 2%;
    display: flex;
    flex-wrap: wrap;

    input {
        width: 70%;
        height: 5vh;
        font-size: 2.5dvh;
        color: #4D5C44;
        background-color: #FAF8ED;
        border: 0;
        text-indent: 2%;
        border-bottom: #F5A352 0.3vh solid;

        &:focus {
            outline: none;
        }
    }

    select {
        width: 70%;
        // height: 5vh;
        border-radius: 1.5vh;
        border: #F5A352 0.3vh solid;
        background-color: #FAF8ED;
        color: #4D5C44;
        font-size: 2.5dvh;
        text-align: center;
    }

    input[type="file"] {
        width: 70%;
        text-indent: 0;
        border-bottom: 0;
        // width: 50%;
        // height: 5vh;
        // // background-color: transparent;
        // border-radius: 0;
    }


    input[type="radio"] {
        width: 3vh;
        height: 3vh;
        accent-color: #748e63; //改變radio顏色
    }

    .name {
        width: 50%;
        // border: 1px solid black;
    }


    .num {
        width: 50%;
        // border: 1px solid black;
    }

    .unit {
        width: 50%;
        // border: 1px solid black;
    }


    .entity {
        width: 50%;
        height: 7vh;

        .radio {
            width: 35%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .yes {
            width: 1%;
            // border: 1px solid black;
        }

        .no {
            width: 1%;
            // border: 1px solid black;
        }
    }

    .place {
        width: 50%;
    }

    .illustrate {
        width: 100%;
        height: 30vh;
        margin-top: 1%;
        display: flex;
        // border: 1px solid black;

        .illustrateAbout {
            width: 15%;
            height: 100%;
            // border: 1px solid black;
        }

        textarea {
            width: 85%;
            font-size: 2.5dvh;
            resize: none;
            color: #4D5C44;
            background-color: #FAF8ED;
            border: #F5A352 0.3vh solid;

            &:focus {
                outline: none;
            }
        }
    }

    .vision {
        width: 35%;
        margin-right: 15%;
        // border: 1px solid black;

        .visionPicture {
            width: 100%;
            // border: 1px solid black;
        }
    }

    .warning {
        height: 10%;
        width: 100%;
        color: #DB3A3A;
        font-size: 2dvh;
        // border: 1px black solid;                
    }

    .error {
        height: 10%;
        width: 100%;
        color: #DB3A3A;
        font-size: 2dvh;
        // border: 1px black solid;                
    }

    .establish {
        //確認按鈕
        height: 10%;
        width: 14%;
        font-size: 2.5dvh;
        border-radius: 1vh;
        border: 0.3vh solid #F5A352;
        background-color: #FAF8ED;
        color: #F5A352;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 3% auto 0 auto;

        &:hover {
            transition: 0.1s linear;
            border: 0;
            background-color: #748E63;
            border: 0.3vh solid #748E63;
            color: #FAF8ED;
            scale: 1.2;
        }

        &:active {
            scale: 0.95;
        }
    }

    .footer {
        height: 5vh;
        width: 100%;
        background-color: #FAF8ED;
    }
}
</style>