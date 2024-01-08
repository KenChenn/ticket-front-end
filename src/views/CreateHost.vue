<template lang="">
<div class="main">
    <div class="down">
        <h1 class="pp">建立主辦單位</h1>
        <span class="spanP">*為必填</span>
        <div class="create">
            <br>
            <span class="allPP">主辦單位名稱*</span>
            <br>
            <input type="text" class="allInput">
            <br><br>
            <span class="allP">mail*</span>
            <br>
            <input type="text" class="allInput">
            <br><br>
            <span class="allP">電話*</span>
            <br>
            <input type="number" class="allInput">
            <br><br>
            <span class="allP">地址</span>
            <br>
            <input type="text" class="allInput">
            <br><br>
            <span class="allPPP">官方網址</span>
            <br>
            <input type="text" class="allInput">
            <br><br>
            <span class="allPP">社交軟體連結</span>
            <br>
            <input type="text" class="allInput">
            <br><br>
            <button type="button" class="btn">確認</button>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    methods: {

    },
    mounted() {

    }

}
</script>
<style lang="scss">
.main {
    width: 100vw;
    height: 100vh;
    background-color: #FAF8ED;

    .down {
        width: 100%;
        height: 100%;
        position: relative;
        .pp {
            margin-left: 27%;
            color: #4D5C44;
        }
        .create{
            width: 48%;
            height: 75%;
            background-color: #F5BF89;
            margin: auto;
            margin-top: -2%;
            border-radius: 10px;
        }
        .spanP{
            position: absolute;
            top:3.5%;
            left: 68%;
            color: #4D5C44;
        }
        .allP {
            margin-left: 48%;
            color: #4D5C44;
        }
        .allPP{
            margin-left: 43%;
            color: #4D5C44;
        }
        .allPPP{
            margin-left: 46%;
            color: #4D5C44;
        }
        .allInput {
            width: 47%;
            height: 4%;
            margin-left: 28%;
            border-radius: 10px;
            background-color: #FAF8ED;
            border: 1pt solid #FAF8ED;
        }
        .btn {
            background-color: #89A071;
            border: 1pt solid #89A071;
            color: #FAF8ED;
            border-radius: 10px;
            margin-left: 48%;
        }
    }
}
</style>