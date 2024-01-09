<template>
    <div class="main">
        <div class="up">
            <h1 class="hostName">主辦單位名稱</h1>
            <button class="plusBtn">新增</button>
        </div>
        <div class="down">
            <div class="hostSq">
                <div class="host">
                    <br>
                    <button class="editBtn">編輯</button>
                    <span class="kaisyaiName">xxxx演藝公司</span>
                    <button class="cencelBtn">刪除</button>
                </div>
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

        .hostName {
            color: #4D5C44;
            margin-left: 20%;
            margin-top: 4%;
        }

        .plusBtn {
            width: 6%;
            height: 30%;
            background-color: #89A071;
            border: 1pt solid #89A071;
            border-radius: 10px;
            font-size: 1.2rem;
            color: #FAF8ED;
            margin-top: 4.5%;
            margin-left: 37%;
        }
    }

    .down {
        width: 100%;
        height: 80%;

        .hostSq {
            width: 59%;
            height: 90%;
            background-color: #F5BF89;
            margin-left: 20%;
            border-radius: 10px;

            .editBtn {
                width: 13%;
                height: 1.6rem;
                border-radius: 10px;
                background-color: #F5A352;
                border: 1pt solid #F5A352;
                color: #FAF8ED;
                margin-left: 3%;
                margin-right: 26%;
            }

            .cencelBtn {
                width: 13%;
                height: 1.6rem;
                border-radius: 10px;
                background-color: #DB3A3A;
                border: 1pt solid #DB3A3A;
                color: #FAF8ED;
            }

            .kaisyaiName {
                font-size: 1.3rem;
                margin-right: 26%;
                color: #4D5C44;
            }
        }
    }
}</style>