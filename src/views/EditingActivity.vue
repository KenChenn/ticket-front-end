<template>
        <div class="top">
            <div class="title">
                編輯活動
                <span>
                    *為必填
                </span>
            </div>
        </div>
        <div class="content">
            <span class="name">活動名稱*</span>
            <input type="text" class="nameAbout">
            <span class="num">活動代號*</span>
            <input type="text" class="numAbout">
            <span class="unit">主辦單位*</span>
            <select name="" id="" class="unitAbout">
                <option value="">主辦單位名稱</option>
                <option value="">主辦單位名稱</option>
            </select>
            <span class="entity">是否為實體活動*</span>
            <span class="yes">是</span>
            <input type="radio" name="radio" class="yesAbout">
            <span class="no">否</span>
            <input type="radio" name="radio" class="noAbout">
            <span class="place">地點</span>
            <input type="text" class="placeAbout">
            <span class="illustrate">活動說明</span>
            <textarea name="" id="" cols="30" rows="10" class="illustrateAbout"></textarea>
            <span class="vision">主視覺圖</span>
            <input type="file" class="visionPicture">
            <span class="introduce1">座位或介紹圖片/1</span>
            <input type="file" class="introducePicture1">
            <span class="introduce2">座位或介紹圖片/2</span>
            <input type="file" class="introducePicture2">
            <button type="button" class="establish">確認</button>
        </div>
</template>
<script>
export default {

}
</script> 
<style lang="scss">

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

    span {
        font-size: 2dvh;
    }
}

.content {
    width: 70vw;
    height: 120vh;
    margin-left: 15vw;
    border: #F5BF89 0.5vh solid;
    border-radius: 2vh;
    font-size: 3dvh;
    position: relative;
    padding: 2%;

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
        border-radius: 2vh;
        text-indent: 2%;
        text-align: center;
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

    textarea {
        width: 60%;
        // height: 25%;
        font-size: 2.5dvh;
        resize: none;
        color: #4D5C44;
        background-color: #FAF8ED;
        border: 0;
        border-radius: 2vh;
        // border: 1px solid black;
    }

    input[type="radio"] {
        width: 30px;
        height: 30px;
        accent-color: #748e63; //改變radio顏色
    }

    .name {
        position: absolute;
        top: 5%;
        left: 10%;
        // border: 1px solid black;
        
    }
    
    .nameAbout {
        position: absolute;
        // border: 1px solid black;
        top: 5%;
        right: 10%;
    }

    .num {
        position: absolute;
        top: 12%;
        left: 10%;
    }

    .numAbout {
        position: absolute;
        top: 12%;
        right: 10%;
    }

    .unit {
        position: absolute;
        top: 19%;
        left: 10%;
    }

    .unitAbout {
        position: absolute;
        top: 19%;
        right: 10%;
    }

    .entity {
        position: absolute;
        top: 25%;
        left: 10%;
    }

    .yes {
        position: absolute;
        top: 25%;
        right: 50%;
    }

    .yesAbout {
        position: absolute;
        top: 25%;
        right: 45%;
    }

    .no {
        position: absolute;
        top: 25%;
        right: 30%;
    }

    .noAbout {
        position: absolute;
        top: 25%;
        right: 25%;
    }

    .place {
        position: absolute;
        top: 31.5%;
        left: 10%;
    }

    .placeAbout {
        position: absolute;
        top: 31.5%;
        right: 10%;
    }

    .illustrate {
        position: absolute;
        top: 38.5%;
        left: 10%;
    }

    .illustrateAbout {
        position: absolute;
        top: 38.5%;
        right: 10%;
    }

    .vision {
        position: absolute;
        top: 73%;
        left: 10%;
    }

    .visionPicture {
        position: absolute;
        top: 73%;
        right: 10%;
    }

    .introduce1 {
        position: absolute;
        top: 78%;
        left: 10%;
    }

    .introducePicture1 {
        position: absolute;
        top: 78%;
        right: 10%;
    }

    .introduce2 {
        position: absolute;
        top: 83%;
        left: 10%;
    }

    .introducePicture2 {
        position: absolute;
        top: 83%;
        right: 10%;
    }

    .establish {
        //確認按鈕
        position: absolute;
        top: 92%;
        left: 43%;
        width: 14%;
        font-size: 3dvh;
        color: #FAF8ED;
        background-color: #748e63;
        border: 0;
        border-radius: 2vh;
    }
}
</style>