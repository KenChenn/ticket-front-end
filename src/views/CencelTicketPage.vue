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
        <div class="title">退票規定</div>
        <div class="textArea">
            依文化部於中華民國107年5月16日文藝字第10710128232號公告修定之『藝文表演票券定型化契約應記載及不得記載事項』第六條-退換票之申請與手續費，如常見問題說明所示。本節目退票方案訂定如下說明。<br>
個人因素退票者，每張票券須酌收票面金額5%手續費。相關服務費用與寄回郵資非屬票價部分不在退費範圍之內。<br>
購票後(不含購票當日)三日內得退票，第四日起即不接受退票申請；如購票日距活動日不足三日，請於活動開始前完成退票申請。<br>
例：2023/10/03(二) 購票，退票收件截止日為 2023/10/06(五)。<br>
例：2023/10/04(三) 購票，退票收件截止日為 2023/10/07(六)。<br>
例：2023/10/05(四) 購票，退票收件截止日為 2023/10/08(日)。<br>
後續退票，以此類推。<br>
已取票需以郵寄退票申請者，購票後(不含購票當日)之第三日若遇假日，因應物流業者配送，則順延至下一個工作日截止收件。<br>
請自行計算寄達時間，逾期送達恕不受理。演出前未於退票期限內寄達者，拓元將依退票申請表上之聯絡方式通知申請人取回票券，若無法和申請人取得聯繫或無法達成取回票券共識者，拓元將不負票券保管或任何其他責任，所有責任與後果將由申請人自行負擔。<br><br>
退票方式(依據取票與否區分)：<br><br>
未取票者：<br>
信用卡付款者：以【線上退票(系統)】方式辦理。請登入拓元網站至【訂單查詢】，在欲申請退票的訂單中，點選【線上退票申請／進度查詢】，再勾選欲辦理退票的票券，確認送出後，票券會註記為【退票審核中】，即完成退票申請送件，後續仍需待系統進行審核。票款扣除退票手續費，刷退至原購票之信用卡。線上退票申請送出後，若於系統審核前完成取票，退票申請將視為無效，不再另行通知。（活動當日退票無法線上退票，請提供退票申請表格於【聯繫我們】申請退票）<br>
ATM虛擬帳號付款者：以【線上退票(客服)】方式辦理。請下載及填寫退票申請表，填妥退票申請表後，請點選【聯繫我們】進行線上申請，並以拍照或掃瞄的方式，將退票申請表、存摺封面以電子檔方式上傳做為附件，若未提供退票申請表格將無法受理。票款扣除退票手續費，匯款退至申請者指定帳戶。<br>
若申請部分退票，請於【訂單查詢】中確認該票券狀態已備註為【個人因事辦理退票】後，再進行該筆訂單其他票券的取票。<br>
已取票者—以【郵寄退票】方式辧理：<br>
信用卡付款者：請下載及填寫退票申請表並附上票券正本退回，票款扣除退票手續費，刷退至原購票之信用卡。<br>
ATM虛擬帳號付款者：請下載及填寫退票申請表並附上票券正本、存摺影本退回，票款扣除退票手續費，匯款退至申請者指定帳戶。<br><br>

【郵寄退票】注意事項：請隨信附上票券正本、退票申請表正本、非刷卡訂單需附上存摺封面影本(包含銀行名、分行名、戶名、帳號，帳戶以台灣本地銀行／郵局／農漁會信用合作社的台幣帳戶為限)，以掛號郵寄或快遞方式寄回「10551台北市松山區南京東路三段270號10樓 拓元售票系統 客服組 收」。 請勿親送，收件地址現場無法受理(為避免爭議，必須透過掛號或快遞等第三方郵寄系統配送並簽收)。收件時間為週一至週五10:00-18:00，適逢國定假日暫停服務。<br>
申請退票5個工作天後，請於訂單查詢確認訂單，訂單或票券狀態將改為『個人因素退票』，訂單或票券狀態若無變動，請務必向本系統客服確認退票進度（聯繫我們），退款作業時間約20個工作天(收到退票申請且資料完整起計算)，刷卡退款時間將依發卡行之作業時間為準。<br>
在有退票釋出座位之前提下，本公司得於完成退票作業後，陸續將該座位釋出並重新上架販售，於退票截止日後亦有可能釋出座位。<br>
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
        background-color: #FFC68D;
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
                font-size: 3dvh;
                margin-left: 5%;
                line-height: 5vh;
            }
        }
    }
}

.down {
    width: 100%;
    background-color: #99B080;    
    padding: 0% 15% 5% 15%;


    .title {
        height: 10vh;
        color: #ffc68d;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 4dvh;
    }
    
    .textArea {
        // border: 1px solid black;
        font-size: 2.5dvh;
        margin: auto;
        color: #FAF8ED;
    }
}
</style>