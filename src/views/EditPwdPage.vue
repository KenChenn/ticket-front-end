<template>
    <div class="main">
        <div class="up">
            <br>
            <h1 class="editP">編輯資訊</h1>
        </div>
        <div class="down">
            <div class="editSq">
                <br><br>
                <span class="spanP1">請輸入舊密碼</span>
                <br>
                <input type="number" class="allInput">
                <br>
                <span class="spanP2">輸入新密碼</span>
                <br>
                <input type="number" class="allInput">
                <br>
                <span class="spanP3">確認密碼</span>
                <br>
                <input type="number" class="allInput">
                <br><br>
                <button type="button" class="btn">確認</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="scss">
.main {
    width: 100vw;
    height: 100vh;
    background-color: #FAF8ED;

    .up {
        width: 100%;
        height: 20%;
        .editP{
            color: #4D5C44;
            margin-left: 20%;
        }
    }
    .down{
        width: 100%;
        height: 80%;
        .editSq{
            width: 59%;
            height: 90%;
            background-color: #89A071;
            margin-left: 20%;
            margin-top: -1%;
            border-radius: 10px;
            .spanP1{
                margin-left: 43%;
                font-size: 1.2rem;
                color: #4D5C44;
            }
            .spanP2{
                margin-left: 44%;
                font-size: 1.2rem;
                color: #4D5C44;
            }
            .spanP3{
                margin-left: 45%;
                font-size: 1.2rem;
                color: #4D5C44;
            }
            .allInput{
                height: 5%;
                width: 44%;
                border-radius: 10px;
                border: 1pt solid #FAF8ED;
                background-color: #FAF8ED;
                margin-left: 28%;
                margin-bottom: 3%;
            }
            .btn{
                width: 10%;
                height: 7%;
                background-color: #F5A352;
                border: 1pt solid #F5A352;
                color: #FAF8ED;
                border-radius: 10px;
                margin-left: 46%;
            }
        }
    }
}
</style>