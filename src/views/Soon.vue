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
                <img src="../../public/material/ヘッダー_kktix_1200-630_medium.png">
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
        </div>

        <div class="show">
            <!-- 節目圖片 -->
            <div class="showImg">
                <img src="../../public/material/ヘッダー_kktix_1200-630_medium.png">
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
        </div>
        <div class="show">
            <!-- 節目圖片 -->
            <div class="showImg">
                <img src="../../public/material/ヘッダー_kktix_1200-630_medium.png">
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
        </div>
        <div class="show">
            <!-- 節目圖片 -->
            <div class="showImg">
                <img src="../../public/material/ヘッダー_kktix_1200-630_medium.png">
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
        </div>
        <div class="show">
            <!-- 節目圖片 -->
            <div class="showImg">
                <img src="../../public/material/ヘッダー_kktix_1200-630_medium.png">
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
        </div>
        <div class="show">
            <!-- 節目圖片 -->
            <div class="showImg">
                <img src="../../public/material/ヘッダー_kktix_1200-630_medium.png">
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
        </div>
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
        width: 60%;
        height: 20%;
        font-size: 1.5rem;
        display: flex;
        justify-content: end;
        align-items: center;
        // border: 1px black solid;
    }

    .showStatus {
        width: 30%;
        height: 15%;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 65%;
        background-color: #F5A352;
    }
}
</style>