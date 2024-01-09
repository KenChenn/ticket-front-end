<template>
    <div class="main">
        <div class="up">
            <button class="host">主辦單<br>位管理</button>
            <button class="act">建立<br>活動</button>
        </div>
        <div class="down">
            <div class="actSq">
                <div class="sqUp">
                    <br>
                    <span class="actSpan">活動名稱</span>
                </div>
                <div class="sqDown">
                    <div class="plusAct">
                        <button class="hensyu">編輯</button>
                        <span class="spanName">xxxxLIve</span>
                        <button class="cencel">刪除</button>
                    </div>
                </div>
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
.main{
    width: 100%;
    height: 110%;
    background-color: #FAF8ED;
    .up{
        width: 100%;
        height: 30%;
        display: flex;
        .host{
            height: 60%;
            width: 12%;
            background-color: #89A071;
            border: 1pt solid #89A071;
            font-size: 1.5rem;
            color: #FAF8ED;
            border-radius: 10px;
            margin-left: 20%;
            margin-right: 35%;
            margin-top: 2%;
        }
        .act{
            height: 60%;
            width: 12%;
            background-color: #89A071;
            border: 1pt solid #89A071;
            font-size: 1.5rem;
            color: #FAF8ED;
            border-radius: 10px;
            margin-top: 2%;
        }
    }
    .down{
        width: 100%;
        height: 70%;
        .actSq{
            width: 59%;
            height: 90%;
            background-color: #F5BF89;
            margin-left: 20%;
            border-radius: 10px;
            .sqUp{
                width: 100%;
                height: 15%;
                .actSpan{
                    color: #4D5C44;
                    font-size: 1.3rem;
                    margin-left: 44%;
                }
            }
            .sqDown{
                width: 100%;
                height: 85%;
                .hensyu{
                    width: 13%;
                    height: 1.6rem;
                    border-radius: 10px;
                    background-color: #F5A352;
                    border: 1pt solid #F5A352;
                    color: #FAF8ED;
                    margin-left: 3%;
                    margin-right: 28%;
                }
                .cencel{
                    width: 13%;
                    height: 1.6rem;
                    border-radius: 10px;
                    background-color: #DB3A3A;
                    border: 1pt solid #DB3A3A;
                    color: #FAF8ED;
                }
                .spanName{
                    font-size: 1.3rem;
                    margin-right: 28%;
                    color: #4D5C44;
                }
            }
        }
    }
}
</style>