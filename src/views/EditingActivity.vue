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
            <span>活動名稱*</span>
            <input type="text" class="nameAbout">
        </div>
        <div class="num">
            <span>活動代號*</span>
            <input type="text" class="numAbout">
        </div>
        <div class="unit">
            <span>主辦單位*</span>
            <select name="" id="" class="unitAbout">
                <option value="">主辦單位名稱</option>
                <option value="">主辦單位名稱</option>
            </select>
        </div>
        <div class="entity">
            <span>是否為實體活動*</span>
            <span class="yes">是</span>
            <input type="radio" name="radio" class="yesAbout">
            <span class="no">否</span>
            <input type="radio" name="radio" class="noAbout">
        </div>
        <div class="place">
            <span>地點</span>
            <input type="text" class="placeAbout">
        </div>
        <div class="illustrate">
            <span>活動說明</span>
            <textarea name="" id="" cols="30" rows="10" class="illustrateAbout"></textarea>
        </div>
        <div class="vision">
            <span>主視覺圖</span>
            <input type="file" class="visionPicture">
        </div>
        <div class="introduce1">
            <span>座位或介紹圖片/1</span>
            <input type="file" class="introducePicture1">
        </div>
        <div class="introduce2">
            <span>座位或介紹圖片/2</span>
            <input type="file" class="introducePicture2">
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
    margin-left: 15%;
    color: #c26202;
    font-size: 4dvh;
    display: flex;
    align-items: end;
    // border: 1px solid black;
    display: flex;
    justify-content: space-between;

    .compel {
        font-size: 2dvh;
        color: #c26202;
    }
}

.content {
    width: 70vw;
    height: 70vh;
    margin-left: 15vw;
    background-color: #FAF8ED;
    border: #F5BF89 0.5vh solid;
    border-radius: 2vh;
    font-size: 3dvh;
    padding: 2%;
    // display: flex;
    // flex-wrap:wrap;

    span {
        color: #4D5C44;
        margin: 0;
    }

    input {
        width: 60%;
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
        width: 60%;
        height: 5vh;
        border-radius: 2vh;
        border: 0;
        background-color: #FAF8ED;
        color: #4D5C44;
        font-size: 2.5dvh;
        text-align: center;
    }

    input[type="file"] {
        width: 50%;
        height: 5vh;
        text-indent: 0;
        background-color: transparent;
        border-radius: 0;
    }


    input[type="radio"] {
        width: 30px;
        height: 30px;
        accent-color: #748e63; //改變radio顏色
    }

    .name {
        width: 50%;
        height: 10vh;
        border: 1px solid black;

        .nameAbout {
            border: 1px solid black;
        }
    }


    .num {
        width: 50%;
        height: 10vh;
        margin-left: 50%;
        margin-top: -10vh;
        border: 1px solid black;

        .numAbout {
            border: 1px solid black;
        }
    }


    .unit {
        width: 50%;
        height: 10vh;
        border: 1px solid black;

        .unitAbout {
            border: 1px solid black;
        }
    }


    .entity {
        width: 50%;
        height: 10vh;
        margin-left: 50%;
        margin-top: -10vh;
        border: 1px solid black;
        .yes {
            width: 50%;
            border: 1px solid black;
            .yesAbout {
                width: 50%;
                border: 1px solid black;
    
            }
        }
        .no {
            width: 50%;
    
            border: 1px solid black;
    
            .noAbout {
                width: 50%;
                border: 1px solid black;
            }
        }
    }




    .place {
        width: 50%;
        height: 10vh;
        border: 1px solid black;

        .placeAbout {
            width: 50%;
            border: 1px solid black;
        }
    }



    .illustrate {
        width: 50%;
        margin-left: 50%;
        margin-top: -10vh;
        border: 1px solid black;

        .illustrateAbout {

            border: 1px solid black;
        }
        textarea {
        height: 30vh;
        font-size: 2.5dvh;
        resize: none;
        color: #4D5C44;
        background-color: #FAF8ED;
        border: 0;
        border-radius: 2vh;
    }
    }

    .vision {
        width: 50%;
        margin-top: -25vh;
        height: 10vh;

        border: 1px solid black;

        .visionPicture {
            border: 1px solid black;
        }
    }


    .introduce1 {
        width: 50%;

        border: 1px solid black;

        .introducePicture1 {

            border: 1px solid black;
        }
    }


    .introduce2 {
        width: 50%;

        border: 1px solid black;

        .introducePicture2 {

            border: 1px solid black;
        }
    }

    .establish {
        //確認按鈕
        width: 14%;
        font-size: 3dvh;
        color: #FAF8ED;
        background-color: #748e63;
        border: 0;
        border-radius: 2vh;
        border: 1px solid black;
    }
}</style>