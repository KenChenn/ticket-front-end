<template >
    <div class="up">
        <div class="showArea">
            <div class="showImg">
                <!-- 節目圖片 -->
                <img src="../../public/material/3-4_1200X630_V3_medium.png">
            </div>

            <!-- 節目資訊 -->
            <div class="showInfo">
                <br>
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
        <div class="title">取票方式</div>
        <div class="textArea">
            開放取票日期為該場次開演前 5 天，故 2024/01/14 起，可至訂單查詢查看取票資訊，方可至7-11 ibon取票。<br>
            取票方式為【ibon取票】，取票時每筆將酌收$30手續費，於7-11超商門市付款時以現金方式支付。<br>
            ibon取票流程說明：<br>
            (1)請於ibon機台點選：【購票/取票/訂房】→【售票系統】→【取票】→【拓元售票系統】。<br>
            (2)請依照系統畫面指示，分別輸入【取票序號、取票號碼】，並列印取票繳費單。（取票序號及取票號碼，可於【訂單查詢】中查看）<br>
            (3)請持取票繳費單至該門市櫃台付款及領取正式ibon票券。<br>
            付款完成之訂單，逾期未取票者視同售出，恕不接受退票或退費。<br>
            現場票務服務處恕無法提供取票服務，請於節目演出結束前自行至7-11超商門市完成取票。<br>
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
    methods: {

    },
    mounted() {

    },
    created() {
        // 創建頁面時設定
        counter().setUser({});
    },
    beforeRouteLeave(to, from, next) {
        // 離開頁面時清除
        counter().setUser(null);
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

        .showImg {
            width: 100%;
            height: 80%;

            img {
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
                line-height: 1.8rem;
            }
        }
    }
}

.down {
    width: 100%;
    background-color: #99B080;
    padding-bottom: 5%;
    .title {
        // border: 1px solid black;
        height: 10vh;
        color: #ffc68d;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 4dvh;
    }

    .textArea {
    width: 70%;
    margin: auto;
    color: #FAF8ED;
    font-size: 2.5dvh;
}
}
</style>