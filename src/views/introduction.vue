<template >
    <div class="up">
        <div class="showArea">
            <div class="showImg">
                <!-- 節目圖片 -->
                <img src="../../public/material/3-4_1200X630_V3_medium.png">
            </div>

            <!-- 節目資訊 -->
            <div class="showInfo">
                <i class="fa-regular fa-calendar-days"></i>
                <!-- 時間 -->
                <span>
                    2024/01/31(周三) 19:30(+0800)
                </span>
                <br>
                <i class="fa-solid fa-location-dot"></i>
                <!-- 地點 -->
                <span>
                    Legacy Taipei / 台北市中正區八德路一段一號
                </span>
                <br>
                <i class="fa-solid fa-user"></i>
                <!-- 主辦 -->
                <span>
                    主辦單位 躍演
                </span>
            </div>

        </div>
    </div>



    <div class="down">
        <div class="introduction">
            一盒10入，980元 <br>
            紅土蛋黃酥 <br>
            世界麵包大賽冠軍陳耀訓團隊手作出品 <br>
            嚴選紅土醃漬鹹蛋黃、減醣豆沙、丹麥冠軍奶油 <br>
            繁複層層技法， <br>
            詮釋紅土蛋黃酥之香、酥、化口與鹹甜平衡風味 <br>
        </div>

        <div class="information">
            <div class="title">
                節目資訊
            </div>
            預購開放日：2023年12月5日(二)，中午12:30 <br>
            提貨時間：2023年12月16日～2024年02月08日（營業時間12:00-19:30） <br>
            提貨地點：台北市松山區敦化北路244巷51號1樓（陳耀訓·麵包埠） <br>
        </div>

    </div>
</template>

<script>
import counter from '../stores/counter'
export default {
    data() {
        return {

        }
    },
    created() {
        // 創建頁面時設定
        counter().setHeaderLink({});
    },
    beforeRouteLeave(to, from, next) {
        // 離開頁面時清除
        counter().setHeaderLink(null);
        next();
    },

}
</script>

<style lang="scss" scoped>
.up {
    width: 100%;
    height: 90vh;
    display: flex;
    justify-content: center;

    .showArea {
        width: 70%;
        height: 90%;
        background-color: #F5A352;
        margin: auto;
        border-radius: 2vh;

        .showImg {
            width: 100%;
            height: 80%;

            img {
                border-radius: 2vh 2vh 0 0;
                height: 100%;
                width: 100%;
                object-fit: cover;
            }
        }

        .showInfo {
            width: 100%;
            height: 20%;

            // border: 1px black solid;
            i,
            span {
                color: #FAF8ED;
                font-size: 3vh;
                margin-left: 5%;
                line-height: 5vh;
            }
        }
    }
}

.down {
    // height: auto;
    background-color: #99B080;
    padding: 5% 15% 5% 15%;
    color: #FAF8ED;

    .introduction {
        font-size: 2.5dvh;
    }
    
    .title {
        // border: 1px solid black;
        height: 10vh;
        color: #ffc68d;
        display: flex;
        align-items: center;
        font-size: 4dvh;
    }
    .information {
        font-size: 2.5dvh;
    }
}
</style>