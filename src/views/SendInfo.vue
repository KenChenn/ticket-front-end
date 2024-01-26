<template>
    <div class="main">
        <br><br><br><br>
        <h2 class="pClass">發送訊息</h2>
        <div class="infoSq">
            <br>
            <span class="sendPersonP">發送群體</span>
            <br>
            <select name="" id="" class="selectClass"></select>
            <br><br>
            <span class="sendMessegeP">發送訊息內容</span>
            <br>
            <input type="text" class="inputClass">
            <br>
            <button class="btn">確認</button>
        </div>

    </div>
</template>
<script>
export default {

}
</script>
<style scoped lang="scss">
.main {
    height: 100vh;
    width: 100vw;

    .pClass {
        margin-left: 21%;
        color: #4D5C44;
    }

    .infoSq {
        height: 70%;
        width: 60%;
        margin-left: 20%;
        background-color: #FFC68D;
        border-radius: 15px;

        .sendPersonP {
            color: #4D5C44;
            font-size: 1.2rem;
            margin-left: 45%;
        }

        .sendMessegeP {
            color: #4D5C44;
            font-size: 1.17rem;
            margin-left: 42.5%;

        }
        .selectClass{
            width: 75%;
            height: 8%;
            margin-left: 12%;
            border-radius: 15px;
            background-color: #FAF8ED;
            border: 1pt solid #FAF8ED;
            color: #4D5C44;
        }
        .inputClass{
            width: 75%;
            height: 8%;
            margin-left: 12%;
            border-radius: 15px;
            background-color: #FAF8ED;
            border: 1pt solid #FAF8ED;
        }
        .btn{
            width: 8%;
            height: 10%;
            background-color: #748E63;
            color: #FAF8ED;
            border-radius: 15px;
            margin-top: 20%;
            margin-left: 45%;
        }
    }
}</style>