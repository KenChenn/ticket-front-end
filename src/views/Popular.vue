<script >
export default {
    data() {
        return {

        }
    },
    methods: {
    },

}
</script>

<template>
    <div class="showArea">

        <!-- 節目卡片區域 -->
        <div class="show">
            <!-- 節目圖片 -->
            <div class="showImg">
                <img src="" alt="">
            </div>
            <!-- 節目開售日期 -->
            <div class="showDate">
                <span>
                    2024/12/31 Wed
                </span>
            </div>
            <!-- 節目狀態 -->
            <div class="showStatus">
                <p>
                    ON SALE
                </p>
            </div>
        </div>

    </div>
</template>


<style scoped lang="scss">
.showArea {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background-color: #99B080;
    padding: 5% 10%;
}

.show {
    width: 30%;
    height: 40vh;
    margin-bottom:10vh;
    background-color: #748E63;
    color: #FAF8ED;
    border-radius: 10px;
    .showImg{
        height: 60%;
        background-color: aqua;
        border-radius: 10px 10px 0 0;
    }
    .showDate{
        width: 70%;
        height: 15%;
        font-size: 1.3rem;
        display: flex;
        justify-content: end;
        align-items: center;
        border: 1px black solid;
    }
    .showStatus{
        width: 30%;
        height: 15%;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #F5A352;
    }
}
</style>