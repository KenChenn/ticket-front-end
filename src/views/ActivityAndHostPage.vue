<template>
    <div class="main">
        <div class="up">
            <!-- 主辦單位管理按鈕 -->
            <button class="host" @click="this.goManageHostPage()">主辦單<br>位管理</button>
            
            <!-- 建立活動按鈕 -->
            <button class="act" @click="this.goCreateActivities()">建立<br>活動</button>
        </div>
        <div class="down">
            <div class="actSq">
                <div class="sqUp">
                    <br>
                    <span class="actSpan">活動名稱</span>
                </div>
                <div class="sqDown">

                    <!-- 活動區域 -->
                    <div class="plusAct">
                        <button class="hensyu">編輯</button>
                        <span class="spanName">xxxxLIve</span>
                        <button class="cencel">刪除</button>
                    </div>
                    <div class="plusAct">
                        <button class="hensyu">編輯</button>
                        <span class="spanName">xxxxLIve</span>
                        <button class="cencel">刪除</button>
                    </div>
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
        goManageHostPage() {
            this.$router.push('/ManageHostPage')
        },
        goCreateActivities() {
            this.$router.push('/CreateActivities')
        }
    },
    mounted() {

    }
}
</script>
<style lang="scss">
.main {
    width: 100%;
    height: 100%;
    background-color: #FAF8ED;

    // justify-content: center;
    .up {
        width: 70%;
        height: 20%;
        margin-left: 15%;
        display: flex;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .host {
            height: 70%;
            width: 25%;
            background-color: #89A071;
            border: 1pt solid #89A071;
            font-size: 3vh;
            line-height: 6vh;
            color: #FAF8ED;
            border-radius: 2vh;
        }
        .act {
            height: 70%;
            width: 25%;
            background-color: #89A071;
            border: 1pt solid #89A071;
            font-size: 3vh;
            line-height: 6vh;
            color: #FAF8ED;
            border-radius: 2vh;
        }
    }

    .down {
        width: 100%;
        height: 80%;
        // border: 1px solid black;

        .actSq {
            width: 70%;
            height: 90%;
            background-color: #F5BF89;
            margin-left: 15%;
            border-radius: 2vh;

            .sqUp {
                width: 100%;
                height: 15%;
                // border: 1px solid black;
                display: flex;
                justify-content: center;
                align-items: center;
                .actSpan {
                    color: #4D5C44;
                    font-size:3vh;
                }
            }

            .sqDown {
                width: 100%;
                height: 85%;
                padding: 2%;
                // border: 1px solid black;
                .plusAct{
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 2%;
                    .hensyu {
                        width: 10%;
                        height: 20%;
                        border-radius: 10vh;
                        font-size: 2vh;
                        background-color: #F5A352;
                        border: 1pt solid #F5A352;
                        color: #FAF8ED;
                    }
    
                    .spanName {
                        font-size: 2vh;
                        color: #4D5C44;
                        
                    }
                    .cencel {
                        width: 10%;
                        height: 20%;
                        border-radius: 10vh;
                        font-size: 2vh;
                        background-color: #DB3A3A;
                        border: 1pt solid #DB3A3A;
                        color: #FAF8ED;
                    }
    
                }
            }
        }
    }
}</style>