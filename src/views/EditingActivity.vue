<template>
    <body>
        <div class="header">
            <i class="fa-solid fa-magnifying-glass" @click="search"></i>
            <input type="search" class="search">
            <button type="button" class="signOut">登出</button>
        </div>
        <div class="top">
            <span class="title">編輯活動</span>
            <span class="tip">*為必填</span>
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
        
    </body>
    </template>
    <script>
    export default {
        
    }
    </script> 
    <style scoped lang="scss">
    body{
        width: 100%;
        height: 190vh;
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
            margin-right: 51vw;
        }
        .tip{
            margin: 0;
            font-size: 25px;
            color: #4D5C44;
        }
    }
    .content{
        width: 70vw;
        height: 160vh;
        margin-left: 15vw;
        background-color: #f5bf89;
        border-radius: 25px;
        font-size: 35px;
        margin-bottom: 15vh;
        position: relative;
    
        span{
            color: #4D5C44;
            margin: 0;
        }
        input{
            width: 60%;
            height: 4%;
            font-size: 25px;
            color: #4D5C44;
            background-color: #FAF8ED;
            border: 0;
            border-radius: 20px;
            text-indent: 2%;
            text-align: center;
    
        }
        select{
            width: 60%;
            height: 4%;
            border-radius: 20px;
            border: 0;
            background-color: #FAF8ED;
            color: #4D5C44;
            font-size: 25px;
            text-align: center;
        }
        input[type="file"]{
            width: 50%;
            height: 3.6%;
            text-indent: 0;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }
        textarea{
            width: 60%;
            height: 25%;
            text-indent: 2%;
            font-size: 25px;
            resize: none;
            color: #4D5C44;
            background-color: #FAF8ED;
            border: 0;
            border-radius: 20px;
        }
        input[type="radio"]{
        width: 30px;
        height: 30px;
        accent-color: #748e63;//改變radio顏色
        }
        .name{
            position: absolute;
            top: 5%;
            left: 10%;
        }
        .nameAbout{
            position: absolute;
            top: 5%;
            right: 10%;
        }
        .num{
            position: absolute;
            top: 12%;
            left: 10%;
        }
        .numAbout{
            position: absolute;
            top: 12%;
            right: 10%;
        }
        .unit{
            position: absolute;
            top: 19%;
            left: 10%;
        }
        .unitAbout{
            position: absolute;
            top: 19%;
            right: 10%;
        }
        .entity{
            position: absolute;
            top: 25%;
            left: 10%;
        }
        .yes{
            position: absolute;
            top: 25%;
            right: 50%;
        }
        .yesAbout{
            position: absolute;
            top: 25%;
            right: 45%;
        }
        
        .no{
            position: absolute;
            top: 25%;
            right: 30%;
        }
        .noAbout{
            position: absolute;
            top: 25%;
            right: 25%;
        }
        .place{
            position: absolute;
            top: 31.5%;
            left: 10%;
        }
        .placeAbout{
            position: absolute;
            top: 31.5%;
            right: 10%;
        }
        .illustrate{
            position: absolute;
            top: 38.5%;
            left: 10%;
        }
        .illustrateAbout{
            position: absolute;
            top: 38.5%;
            right: 10%;
        }
        .vision{
            position: absolute;
            top: 68%;
            left: 10%;
        }
        .visionPicture{
            position: absolute;
            top: 68%;
            right: 10%;
        }
        .introduce1{
            position: absolute;
            top: 75%;
            left: 10%;
        }
        .introducePicture1{
            position: absolute;
            top: 75%;
            right: 10%;
        }
        .introduce2{
            position: absolute;
            top: 82%;
            left: 10%;
        }
        .introducePicture2{
            position: absolute;
            top: 82%;
            right: 10%;
        }
        
        .establish{ //確認按鈕
            position: absolute;
            bottom: 5vh;
            left: 45%;
            width:12%;
            font-size: 30px;
            color: #FAF8ED;
            background-color: #748e63;
            border: 0;
            border-radius: 15px;
            
        }
    }
    </style>