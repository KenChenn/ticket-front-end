<template>
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
                <input type="radio" name="radio" class="yesAbout">
                <span class="no">否</span>
                <input type="radio" name="radio" class="noAbout">
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
</template>
<script>
export default {

}
</script> 
<style lang="scss" scoped>
.title {
    width: 70%;
    height: 10vh;
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
        font-size: 2dvh;
        color: #c26202;
    }
}

.content {
    width: 70vw;
    height: 75vh;
    margin-left: 15vw;
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
        height: 10vh;

        // border: 1px solid black;
    }


    .num {
        width: 50%;
        height: 10vh;

        // border: 1px solid black;

    }


    .unit {
        width: 50%;
        height: 10vh;
        // border: 1px solid black;
    }


    .entity {
        width: 50%;
        height: 7vh;

        .radio {
            width: 50%;
            display: flex;
            justify-content: space-between;
        }

        .yes {
            width: 20%;
            // border: 1px solid black;
            .yesAbout {
                width: 50%;
                // border: 1px solid black;
            }
        }

        .no {
            width: 20%;
            // border: 1px solid black;

            .noAbout {
                width: 50%;
                // border: 1px solid black;
            }
        }
    }
    .place {
        width: 50%;
        height: 10vh;

    }

    .illustrate {
        width: 100%;
        // border: 1px solid black;
        display: flex;

        .illustrateAbout {
            width: 15%;
            // border: 1px solid black;
        }

        textarea {
            height: 20vh;
            width: 80%;
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
        height: 10vh;
        margin-right: 15%;
        // border: 1px solid black;

        .visionPicture {
            width: 100%;
            // border: 1px solid black;
        }
    }

    .establish {
        //確認按鈕
        height: 10%;
        width: 14%;
        border: 0.3vh solid #F5A352;
        background-color: #FAF8ED;
        color: #F5A352;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 1.5vh;
        margin: auto;
        font-size: 2.5dvh;

        &:hover {
            transition: 0.1s linear;
            border: 0;
            background-color: #748E63;
            color: #FAF8ED;
            scale: 1.1;
        }

        &:active {
            scale: 0.95;
        }
    }
}
</style>