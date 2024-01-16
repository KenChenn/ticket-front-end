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
        <router-link to="/Detail" class="show">
            <!-- 節目圖片 -->
            <div class="showImg">
                <img src="../../public/material/3-4_1200X630_V3_medium.png">
            </div>
            <!-- 節目開售日期 -->
            <div class="showDate">
                <p>
                    2024/12/31 Wed
                </p>
            </div>
            <!-- 節目狀態 -->
            <div class="showStatus">
                <p>
                    ON SALE
                </p>
            </div>
        </router-link>

    </div>
</template>


<style scoped lang="scss">
.showArea {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background-color: #99B080;
    padding: 5% 10% 0% 10%;
}

.show {
    width: 30%;
    height: 40vh;
    margin-bottom: 10vh;
    background-color: #748E63;
    color: #FAF8ED;
    text-decoration: none;
    border-radius: 20px;
    
    .showImg {
        height: 60%;
        width: 100%;

        img {
            object-fit: cover;
            width: 100%;
            height: 100%;
            border-radius: 20px 20px 0 0;
        }
    }

    .showDate {
        width: 80%;
        height: 20%;
        font-size: 3.2dvh;
        margin-left: 5%;
        display: flex;
        align-items: center;

        // border: 1px black solid;
    }

    .showStatus {
        width: 40%;
        height: 15%;
        border-radius: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 55%;
        background-color: #F5A352;
        font-size: 2dvh;

    }

}</style>