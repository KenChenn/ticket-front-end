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
        <h1 class="noticeP">注意事項</h1>
        <div class="textArea">
            購票前請詳閱注意事項：<br>
            <br>
            購票後三天內可辦理退票，退票需酌收票面價5%手續費，換票等同於退票。購買各種優惠票者，需於購票與使用時依規定出示相關證明文件。每人每場退票總張數，不得超出該次演唱會公告之限購張數，分次寄送者亦同。<br>
            演唱會現場嚴禁攝錄影，禁止攜帶飲食(水除外)、除手機之外的任何形式之拍攝及錄音電子設備、自拍棒與危險物品（依主辦單位定義）入場，現場需經安檢程序方能入場，場館無設置置物櫃，開演前請關注LIVE NATION
            TAIWAN官方網站https://www.livenation.com.tw或臉書 https://www.facebook.com/livenationtw/
            瞭解入場辦法與安檢規定，並請提早到場進行安檢以免耽誤觀賞演出的時間，主辦單位保留修改或終止本活動之權力。<br>
            一人一票入場，孩童也需購票。站席為人身安全起見，孕婦及身高未滿110公分或未滿七歲者孩童請勿購票入場。搖滾區因無指定席位，又因票券屬無記名有價證券，故遺失票券者可拒絕入場，請妥善保管票券，遺失恕不補發。<br>
            請確實核對訂購內容，本票券一經售出，表示台端同意支付本次交易的內容與價格，台端不得以任何理由拒付本次交易費用。<br>
            票券屬無記名的有價證券，如發生遺失、破損、燒毀或無法辨識等狀況，恕不補發或退換。任意塗改、影印或套印、掃描複製票劵，均屬無效票。<br>
            請支持杜絕黃牛票以及二手票券買賣，台灣演出請上官方售票網站-https://tixcraft.com購票，請千萬不要購買非官方管道售出的票券。若因購買非官方售票網站售出的票券引起相關權益受損致無法入場，將無法保障自身權益，本售票系統恕不負責，主辦單位保留認定票券合法性之權力。<br>
            若有任何形式非供自用而加價轉售之票券，無論加價名目為何。經查屬實者，將取消入場權利並得不予退票，且得依社會秩序維護法第64條第2款逕向警方檢舉並提出告訴。<br>
            各表演場館各有其入場規定，請持票觀眾務必遵守主辦單位及場館各項規定，如有干擾演出秩序之行為，主辦單位有權請出場外並且不予退還票款。活動若因故延期或取消，主辦單位不負交通及住宿費之補償，且僅受理票面金額全額退費。<br>
            活動現場嚴禁以下行為：<br>
            使用相機、攝影機或任何器材攝錄影、錄音等與直播行為。<br>
            如經查獲，將由工作人員請出場外，情節嚴重者不予再次進場，主辦單位有權強制曝光底片或刪除記憶卡中所拍攝/錄製之內容以維護藝人肖像權與智慧財產權，若有損壞與遺失概不負責，並保留法律追訴權。<br><br>
            演出期間：<br>
            全場禁止站立於椅子上觀賞。<br>
            請勿攜帶並高舉看板或手機以免阻擾後方觀眾視線。<br>
            請勿丟擲螢光棒、寶特瓶、鐵鋁罐等物品。<br>
            經勸告未果，工作人員有權請違規者離場。<br>
            遺失票券：<br>
            座位區遺失票券者，請盡早進線02-8772-9835或點選聯繫我們至拓元票務申告，遺失票券者需在演出當日下午6點前，持警局報案單、購票證明與身份證明文件前往場館拓元票務櫃臺簽立切結書，待開演後清查該座位無人進場，可讓申報遺失票券的消費者入場觀賞，但倘若持票人出現，應以持票人優先，遺失票券的觀眾需另行購票入場(剩餘票券，依現場實際狀況為準)，否則將觸及刑法第339條的詐欺不正取財之公訴罪。若雙方僵持不下，將會請出場外報警處理。
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
    height: 90%;
    background-color: #99B080;
    .noticeP{
        color: #F5BF89;
        margin-left: 15%;
    }
    .textArea{
        width: 70%;
        height: 80%;
        margin: auto;
        overflow-y:scroll;
        color: #FAF8ED;
    }
}
</style>