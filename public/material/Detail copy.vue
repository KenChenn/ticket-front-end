<template >
    <div class="up">
        <div class="showArea">
            <div class="showImg">
                <!-- 節目圖片 -->
                <img v-if="this.codeList" :src="this.codeList.keyvisualImg">
                <!-- 加入最愛按鈕 -->
                <div class="likeArea">
                    <div >
                        <button v-if="!searchFav" @click="this.addFav()" class="like">
                            <i class="fa-solid fa-heart"></i>
                        </button>
                    </div>
                    <div >
                        <button v-if="searchFav" @click="this.cencelFav()" class="dislike">
                            <i class="fa-solid fa-heart-crack"></i>
                        </button>
                    </div>
                </div>
            </div>

            <!-- 節目資訊 -->
            <div class="showInfo">
                <i class="fa-regular fa-calendar-days"></i>
                <!-- 時間 -->
                <span v-if="this.codeList">
                    {{ this.codeList.name }}
                </span>
                <br>
                <i class="fa-solid fa-location-dot"></i>
                <!-- 地點 -->
                <span v-if="this.codeList">
                    {{ this.codeList.place }}
                </span>
                <br>
                <i class="fa-solid fa-user"></i>
                <!-- 主辦 -->
                <span v-if="this.codeList">
                    {{ this.codeList.organizer }}
                </span>
            </div>

        </div>
    </div>

    <div class="mid">

        <!-- <div class="linkArea">
                    <RouterLink to="/BuyTicketPage" class="link">
                        立即購票
                    </RouterLink>
                    <RouterLink to="/Introduction" class="link">
                        活動介紹
                    </RouterLink>
                    <RouterLink to="/TicketNoticePage" class="link">
                        注意事項
                    </RouterLink>
                    <RouterLink to="/BuyNoticePage" class="link">
                        購買提醒
                    </RouterLink>
                    <RouterLink to="/GetTicketPage" class="link">
                        取票方式
                    </RouterLink>
                    <RouterLink to="/CencelTicketPage" class="link">
                        退票規定
                    </RouterLink>
                </div> -->
    </div>


    <div class="bookmarkBTN">
        <button type="button" class="bookmarkSet" @click="buyTicketBTN">立即購票</button>
        <button type="button" class="bookmarkSet" @click="introductionBTN">活動介紹</button>
        <button type="button" class="bookmarkSet" @click="ticketNoticeBTN">注意事項</button>
        <button type="button" class="bookmarkSet" @click="buyNoticeBTN">購買提醒</button>
        <button type="button" class="bookmarkSet" @click="getTicketBTN">取票方式</button>
        <button type="button" class="bookmarkSet" @click="cencelTicketBTN">退票規定</button>
        <button type="button" class="bookmarkSet" @click="forumBTN">相關討論</button>
    </div>
    <div class="down">
        <div class="bookmark">
            <!-- 立即購票 -->
            <div class="buyTicket" v-if="buyTicket">
                <div class="title">
                    <span>活動開始時間</span>
                    <span>開售時間</span>
                    <span>停售時間</span>
                </div>

                <div class="ticket" v-for="item in this.sessionList" :key="item.id">
                    <div class="sale">
                        <div class="saleTimes">
                            <span>{{ item.showDateTime }}</span>
                            <span>{{ item.startSellDateTime }}</span>
                            <span>{{ item.endSellDateTime }}</span>
                        </div>
                        <button class="btn" @click="seatInfo(item.num)" v-if="item.inTime">座位區域</button>
                        <span v-if="item.isEarly">{{ item.startSellDateTime }}開售</span>
                        <span v-if="item.isAfter">{{ item.endSellDateTime }}完售</span>
                    </div>
                </div>
                <div class="seat" v-if="seat">
                    <div class="seatTitle">
                        <span>區域名稱</span>
                        <span>座位價格</span>
                    </div>
                    <div class="seatArea" v-for="seatItem in this.seatList">
                        <span>{{ seatItem.area }}</span>
                        <span>{{ seatItem.price }}</span>
                        <span>剩餘張數 : {{ seatItem.remainingTicket }}</span>
                        <select name="" id="" v-model="seatItem.selectedQuantity">
                            <option value="" disabled selected hidden>請選擇張數</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                        <button class="btn" @click="buy(seatItem.num, seatItem.area, seatItem.selectedQuantity)">購買</button>
                    </div>
                </div>
            </div>

            <!-- 活動介紹 -->
            <!-- <div class="introduction" v-if="introduction">
                <span v-if="this.codeList">
                    {{ this.codeList.introduction }}
                </span>
                <br><br>
                <img v-if="this.codeList" :src="this.codeList.introduceImg2" class="introductionImg">
                <br><br>
                <img v-if="this.codeList" :src="this.codeList.introduceImg1" class="introductionImg">
            </div> -->

            <!-- 注意事項 -->
            <!-- <div class="ticketNotice" v-if="ticketNotice">
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
            </div> -->

            <!-- 購買提醒 -->
            <!-- <div class="buyNotice" v-if="buyNotice">
                <div class="textArea">
                    欲購票者，請參考【拓元會員加入辦法】，需進行手機驗證，才可開始購票，未完成驗證者，恕無法購票，建議提早完成。<br>
                    單筆訂單限購4張，可支援行動裝置購票。<br>
                    付款方式可選擇【ATM虛擬帳號付款】或【信用卡付款】，虛擬帳號需在一小時內結帳完畢。<br><br>
                    2024/01/16起，付款方式僅限【信用卡付款】。<br>
                    【ATM虛擬帳號付款】<br>
                    請依訂單顯示之「帳號」、「轉帳金額」於「繳費截止期限」內完成付款。逾期繳費者，此訂單取消不予保留。非國泰世華金融卡或國泰世華櫃員機需另付轉帳手續費$15元。<br>
                    僅限於台灣金融機構開戶所核發之提款卡，包括郵局、農漁會信用合作社，並且已開通【非約定帳戶轉帳】功能皆可使用。請注意所使用之金融提款卡，轉帳交易未超過原發卡銀行所提供每日或每月之轉帳、繳費上限。<br>
                    本系統顯示之ATM虛擬帳號，銀行代號為「國泰世華(013)」，虛擬帳號「前四碼為2821或2700」總計16碼。<br>
                    【信用卡付款】<br>
                    信用卡僅限VISA、MasterCard、JCB卡（無法使用AE、銀聯、大來卡）購票前請先確認信用卡額度是否足夠，進入刷卡頁面後，請勿點選上一頁或是關閉刷卡頁面，避免刷卡失敗，刷卡資料送出前請檢查是否正確。<br>
                    刷卡時，若出現其他訊息如下：<br>
                    a.回傳授權結果失敗！！請洽原交易商家確認此筆交易是否成功。<br>
                    b.商家交易資料有誤！！本筆訂單無法進行付款作業，請洽原交易商家。<br>
                    不論顯示訊息為何，請務必登入並到【訂單查詢】頁面，確認其【訂單狀態】，刷卡交易成功與否，依訂單查詢顯示為主。<br>
                    a.若顯示「訂單成立」，即表示刷卡成功。<br>
                    b.若顯示「刷卡失敗」，請重新購票。<br><br>
                    訂購者帳號中若有未完成付款或刷卡失敗的訂單，該帳號之購票額度需等待系統自動清除訂單後才會釋出，並請重新訂購。故售票日之後，如釋出較為前面座位之票券屬正常情形。如遇票款金流系統維護等緣故無法完成付款，請稍後再進行購票。<br>
                    付款完成之訂單代表已售出，表示台端同意支付本次交易的內容與價格，請至【訂單查詢】核對訂購內容，一旦訂單成立，台端不得以任何理由拒付本次交易費用。(如需退票，請另依退票規則辦理。)<br>
                    不論付款(刷卡、ATM)時出現訊息為何，付款成功與否，請務必登入並到【訂單查詢】頁面，確認其【訂單狀態】，依訂單查詢顯示為主。<br>
                    如果有退票票券，本系統將會自動釋出於系統上販售。<br>
                    身心障礙票劵於2023/10/05 (四) 11AM 開放訂購。<br>
                    身心障礙票劵僅接受傳真訂購，請透過購票網頁上方【身心障礙訂購單】按鈕下載傳真表單 ，連同「身心障礙證明影本」傳真到02-8772-9853進行購票(每張訂購單限購2張票劵(含陪同席者)。<br>
                    收到傳真5個工作天內，訂單成立將以簡訊通知購票者，訂單未成立將不另行簡訊通知(若身心障礙席已售罄將於網站上公告)。<br>
                    購票者請於接到通知後，於指定時間內，以ATM轉帳之方式，將票款轉入虛擬帳號，逾時座位恕不保留。非國泰世華金融卡或國泰世華櫃員機需另付轉帳手續費15元。<br>
                    每張身心障礙證明每場次限購一張優惠票及一張陪同票，入場時證明持有人與陪同者需同時入場並請備妥身障證明查驗。輪椅席區限乘坐輪椅及必要陪伴者1人使用，入場時將加強查核身分。新版證明需於「必要陪同者優惠措施」有相關註記方可購買陪同席票券。<br>
                    有鑒於網路拍賣風氣盛行，有許多來路不明的票券在拍賣網站出售競標，但這些票券來源不明、真偽難辨，票務糾紛層出不窮，為確保您的權益，懇請勿於拍賣網站或是其他非正式授權售票之管道購票，如發生無法進場或其他損害個人權益之事宜，本售票系統恕不負責。<br>
                </div>
            </div> -->

            <!-- 取票方式 -->
            <!-- <div class="getTicket" v-if="getTicket">
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
            </div> -->

            <!-- 退票規定 -->
            <!-- <div class="cencelTicket" v-if="cencelTicket">
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

                    【郵寄退票】注意事項：請隨信附上票券正本、退票申請表正本、非刷卡訂單需附上存摺封面影本(包含銀行名、分行名、戶名、帳號，帳戶以台灣本地銀行／郵局／農漁會信用合作社的台幣帳戶為限)，以掛號郵寄或快遞方式寄回「10551台北市松山區南京東路三段270號10樓
                    拓元售票系統 客服組 收」。 請勿親送，收件地址現場無法受理(為避免爭議，必須透過掛號或快遞等第三方郵寄系統配送並簽收)。收件時間為週一至週五10:00-18:00，適逢國定假日暫停服務。<br>
                    申請退票5個工作天後，請於訂單查詢確認訂單，訂單或票券狀態將改為『個人因素退票』，訂單或票券狀態若無變動，請務必向本系統客服確認退票進度（聯繫我們），退款作業時間約20個工作天(收到退票申請且資料完整起計算)，刷卡退款時間將依發卡行之作業時間為準。<br>
                    在有退票釋出座位之前提下，本公司得於完成退票作業後，陸續將該座位釋出並重新上架販售，於退票截止日後亦有可能釋出座位。<br>
                </div>
            </div> -->

            <div class="forum" v-if="forum">
                <!-- 討論區發言 -->
                <div class="comment">
                    說點什麼...
                    <input type="text" class="commentInput" v-model="comments">
                    <button type="submit" class="submit" @click="commentInput">
                        <i class="fa-regular fa-paper-plane"></i>
                    </button>
                </div>
                <div class="discussion" v-for="(item, index) in this.commentList" :key="item.id">
                    <div class="circle"></div>
                    <div class="info">
                        <!-- 使用者名字 -->
                        <div class="user">
                            <span>
                                {{ item.commenter }}
                            </span>
                        </div>
                        <!-- 發言內容 -->
                        <div class="content">
                            <span>
                                {{ item.comments }}
                            </span>
                        </div>
                    </div>
                    <button type="button" class="deleteComment" @click="deleteComment(item.id)" v-if="item.isUser"><i
                            class="fa-solid fa-x"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import counter from '../stores/counter'
export default {
    data() {
        return {
            codeList: [],
            trackerList: [],
            commodityCodenameList: [],
            searchFav: "",
            commentList: [],
            comments: "",
            sessionList: [],
            seatList: [],
            introductions: "",
            // selectedQuantity: 0,
            buyTicket: true,
            introduction: false,
            ticketNotice: false,
            buyNotice: false,
            getTicket: false,
            cencelTicket: false,
            forum: false,
            seat: false,
        }
    },
    methods: {
        codeInfo() {
            // console.log(this.$route.params.codename);
            fetch('http://localhost:8080/api/get_commodity', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({
                    codename: this.$route.params.codename
                })
            })
                .then(response => response.json())
                .then(data => {
                    // console.log(data)
                    this.codeList = data.commodityList;
                    console.log(this.codeList)
                    // console.log(this.codeList.codename)
                    // console.log(this.codeList[0].codename)
                })
                .catch(error => console.log(error))
        },
        searchFavorate() {
            fetch('http://localhost:8080/api/checktrack', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    tracker: $cookies.get("account"),
                    commodityCodename: this.$route.params.codename
                })
            })
                .then(response => response.json())
                .then(data => {
                    this.searchFav = data.is_Track;
                    console.log(this.searchFav)
                })
                .catch(error => console.log(error))
        },
        addFav() {
            fetch('http://localhost:8080/api/track', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    tracker: $cookies.get("account"),
                    commodityCodename: this.$route.params.codename
                })
            })
                .then(response => response.json())
                .then(data => {
                    this.searchFav = data.is_Track;
                    console.log(this.searchFav)
                })
                .catch(error => console.log(error),
                    alert("請先登入才可新增至我的最愛"),
                    this.$router.push('/LoginPage'))
        },
        cencelFav() {
            fetch('http://localhost:8080/api/untrack', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    tracker: $cookies.get("account"),
                    commodityCodename: this.$route.params.codename
                })
            })
                .then(response => response.json())
                .then(data => {
                    this.searchFav = data.is_Track;
                    console.log(this.searchFav)
                })
                .catch(error => console.log(error))
        },
        comment() {
            fetch('http://localhost:8080/api/get_comments', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({
                    codename: this.$route.params.codename
                })
            })
                .then(response => response.json())
                .then(data => {
                    this.commentList = data.forumData
                    // console.log(this.commentList)
                    // console.log(data.forumData)
                    this.commentList.forEach(item => {
                        data.forumData.forEach(dataItem => {
                            if (item.commenter == dataItem.commenter) {
                                item.isUser = true
                            } else {
                                item.isUser = false
                            }
                        })
                    })
                })
                .catch(error => console.log(error))
        },
        commentInput() {
            if (this.comments != "") {
                fetch('http://localhost:8080/api/comment', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        codename: this.$route.params.codename,
                        comments: this.comments
                    })
                })
                    .then(response => response.json())
                    .then(data => {
                        // console.log(data.rtncode)
                        // console.log(this.commentList)
                        if (data.rtncode == "PLEASE_LOGIN_FIRST") {
                            alert("請先登入才可留言")
                        }
                        if (data.rtncode == "PARAM_ERROR") {
                            alert("請輸入欲發表的留言")
                        }
                        if (data.rtncode == "SUCCESSFUL") {
                            this.comment()
                            this.comments = ""
                        }
                    })
                    .catch(error => console.log(error))
            } else {
                alert("請輸入欲發表的留言")
            }
        },
        deleteComment(id) {
            console.log(id);
            fetch('http://localhost:8080/api/delete_comment', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({
                    id: id
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data.rtncode)
                    if (data.rtncode == "PLEASE_LOGIN_FIRST") {
                        alert("請先登入才可刪除")
                    }
                    if (data.rtncode == "COMMENT_DELETE_ERROR") {
                        alert("刪除留言失敗")
                    }
                    if (data.rtncode == "COMMENTER_ERROR") {
                        alert("非留言者本人")
                    }
                    if (data.rtncode == "SUCCESSFUL") {
                        this.comment()
                    }
                })
                .catch(error => console.log(error))
        },
        sessionInfo() {
            fetch('http://localhost:8080/api/get_Sessions', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({
                    codename: this.$route.params.codename
                })
            })
                .then(response => response.json())
                .then(data => {
                    this.sessionList = data.data;
                    this.sessionList.forEach(item => {
                        var current = new Date()
                        // console.log(current);
                        var startSellDateTime = new Date(item.startSellDateTime);
                        var endSellDateTime = new Date(item.endSellDateTime);
                        if (startSellDateTime > current) {
                            console.log("000");
                            item.isEarly = true
                        }
                        if (endSellDateTime < current) {
                            console.log("999");
                            item.isAfter = true
                        }
                        if (startSellDateTime < current && endSellDateTime > current) {
                            item.inTime = true
                        }
                        //時間格式調整
                        var showDateTime = new Date(item.showDateTime);
                        var showDateTimeYear = showDateTime.getFullYear()
                        var showDateTimeMonth = (showDateTime.getMonth() + 1).toString().padStart(2, '0')
                        var showDateTimeDate = (showDateTime.getDate()).toString().padStart(2, '0')
                        var showDateTimeHour = (showDateTime.getHours()).toString().padStart(2, '0')
                        var showDateTimeMin = (showDateTime.getMinutes()).toString().padStart(2, '0')
                        var space = "　"
                        item.showDateTime = showDateTimeYear + " - " + showDateTimeMonth + " - " + showDateTimeDate + space + showDateTimeHour + " : " + showDateTimeMin
                        // console.log(item.showDateTime);

                        var startSellDateTime = new Date(item.startSellDateTime);
                        // console.log(startSellDateTime);
                        var startSellDateTimeYear = startSellDateTime.getFullYear()
                        var startSellDateTimeMonth = (startSellDateTime.getMonth() + 1).toString().padStart(2, '0')
                        var startSellDateTimeDate = (startSellDateTime.getDate()).toString().padStart(2, '0')
                        var startSellDateTimeHour = (startSellDateTime.getHours()).toString().padStart(2, '0')
                        var startSellDateTimeMin = (startSellDateTime.getMinutes()).toString().padStart(2, '0')
                        item.startSellDateTime = startSellDateTimeYear + " - " + startSellDateTimeMonth + " - " + startSellDateTimeDate + space + startSellDateTimeHour + " : " + startSellDateTimeMin

                        var endSellDateTime = new Date(item.endSellDateTime);
                        var endSellDateTimeYear = endSellDateTime.getFullYear()
                        var endSellDateTimeMonth = (endSellDateTime.getMonth() + 1).toString().padStart(2, '0')
                        var endSellDateTimeDate = (endSellDateTime.getDate()).toString().padStart(2, '0')
                        var endSellDateTimeHour = (endSellDateTime.getHours()).toString().padStart(2, '0')
                        var endSellDateTimeMin = (endSellDateTime.getMinutes()).toString().padStart(2, '0')
                        item.endSellDateTime = endSellDateTimeYear + " - " + endSellDateTimeMonth + " - " + endSellDateTimeDate + space + endSellDateTimeHour + " : " + endSellDateTimeMin
                    })
                })
                .catch(error => console.log(error))
        },
        // date() {
        //     fetch('http://localhost:8080/api/get_Sessions', {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         credentials: 'include',
        //         body: JSON.stringify({
        //             codename: this.$route.params.codename
        //         })
        //     })
        //         .then(response => response.json())
        //         .then(data => {
        //             this.sessionList = data.data;
        //             console.log(this.sessionList)
        //             this.sessionList.forEach(item => {
        //                 var current = new Date()
        //                 // console.log(current);
        //                 var startSellDateTime = new Date(item.startSellDateTime);
        //                 var endSellDateTime = new Date(item.endSellDateTime);
        //                 console.log(item.startSellDateTime);
        //                 console.log(startSellDateTime);
        //                 if (startSellDateTime > current) {
        //                     console.log("000");
        //                     item.isEarly = true
        //                 }
        //                 if (endSellDateTime < current) {
        //                     // item.isAfter = true
        //                 }
        //                 if (startSellDateTime < current && endSellDateTime > current) {
        //                     item.inTime = true
        //                 }
        //             })
        //         })
        //         .catch(error => console.log(error))
        // },
        seatInfo(num) {
            // console.log(num);
            fetch('http://localhost:8080/api/get_Remaining_Tickets', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({
                    num: num
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data.data);
                    if (data.rtncode == "SUCCESSFUL") {
                        this.seat = true
                        this.seatList = data.data
                        console.log(this.seatList)
                    }
                })
                .catch(error => console.log(error))
        },
        buy(sessionNum, area, selectedQuantity) {
            console.log(sessionNum, area, selectedQuantity);
            fetch('http://localhost:8080/api/buy', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({
                    sessionNum: sessionNum,
                    area: area,
                    buyPieces: selectedQuantity
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.rtncode == "SUCCESSFUL") {
                        alert("購買成功")
                        this.$router.go(0); //重整頁面
                    }
                    if (data.rtncode == "PARAM_ERROR") {
                        alert("請選擇欲購買張數")
                    }
                    if (data.rtncode == "NOT_ENOUGH_TICKETS") {
                        alert("剩餘張數不足，請重新選擇欲購買張數")
                        this.$router.go(0);
                    }
                })
                .catch(error => console.log(error))
        },
        //頁籤按鈕
        buyTicketBTN() {  //立即購票
            this.buyTicket = true
            this.introduction = false
            this.ticketNotice = false
            this.buyNotice = false
            this.getTicket = false
            this.cencelTicket = false
            this.forum = false
        },
        introductionBTN() {  //活動介紹
            this.buyTicket = false
            this.introduction = true
            this.ticketNotice = false
            this.buyNotice = false
            this.getTicket = false
            this.cencelTicket = false
            this.forum = false
        },
        ticketNoticeBTN() {  //注意事項
            this.buyTicket = false
            this.introduction = false
            this.ticketNotice = true
            this.buyNotice = false
            this.getTicket = false
            this.cencelTicket = false
            this.forum = false
        },
        buyNoticeBTN() {  //購買提醒
            this.buyTicket = false
            this.introduction = false
            this.ticketNotice = false
            this.buyNotice = true
            this.getTicket = false
            this.cencelTicket = false
            this.forum = false
        },
        getTicketBTN() {  //取票方式
            this.buyTicket = false
            this.introduction = false
            this.ticketNotice = false
            this.buyNotice = false
            this.getTicket = true
            this.cencelTicket = false
            this.forum = false
        },
        cencelTicketBTN() {  //退票規定
            this.buyTicket = false
            this.introduction = false
            this.ticketNotice = false
            this.buyNotice = false
            this.getTicket = false
            this.cencelTicket = true
            this.forum = false
        },
        forumBTN() {  //相關討論
            this.buyTicket = false
            this.introduction = false
            this.ticketNotice = false
            this.buyNotice = false
            this.getTicket = false
            this.cencelTicket = false
            this.forum = true
        },
    },

    mounted() {
        this.searchFavorate()
        this.sessionInfo()
        fetch('http://localhost:8080/api/get_user_basic_data', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({
                account: $cookies.get("account"),
            })
        })
            .then(response => response.json())
            .then(res => {
                console.log(res.data.username)
                this.commentList.forEach(item => {
                    if (item.commenter == res.data.username) {
                        item.isUser = true
                    } else {
                        item.isUser = false
                    }
                })
            })
            .catch(error => console.log(error))

    },
    created() {
        this.codeInfo();
        this.comment();
        // this.date()
    }
}

</script>

<style lang="scss" scoped>
.up {
    margin-top: 10vh;
    width: 100%;
    height: 70vh;
    display: flex;
    justify-content: start;
    border: 1px solid black;

    .showArea {
        width: 70%;
        height: 60vh;
        background-color: #F5A352;
        margin: auto;
        border-radius: 2vh;

        .showImg {
            width: 100%;
            height: 75%;
            border: #F5A352 0.5vh solid;
            background-color: #404040;
            border-radius: 2vh 2vh 0 0;
            // display: flex;

            img {
                height: 100%;
                width: 100%;
                display: block;
                object-fit: contain;
            }

            .likeArea {
                width: 9%;
                height: 10vh;
                // border: 1px solid black;
                margin-top: -10vh;
                margin-left: 91%;

                .like {
                    background-color: #DB3A3A;
                    color: #FAF8ED;
                    border: #DB3A3A solid 0.5vh;
                }

                .dislike {
                    // background-color: #DB3A3A;
                    color: #DB3A3A;
                    background-color: #FAF8ED;
                    border: #DB3A3A solid 0.5vh;
                }

                button {
                    // width: 100%;
                    // height: 100%;
                    // border-radius: 1.5vh;
                    // border: none;
                    // font-size: 5dvh;
                    // color: #DB3A3A;
                    // background-color: #FAF8ED;
                    // border: #DB3A3A solid 0.5vh;

                    &:hover {
                        transition: 0.1s linear;
                        scale: 1.05;
                        background-color: #ffffff;
                    }

                    &:active {
                        scale: 0.95;
                        background-color: #DB3A3A;
                        color: #FAF8ED;
                    }
                }
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

// .mid {
//     padding: 0% 15% 0% 15%;
//     border: 1px solid black;
// }


.bookmarkBTN {
    padding: 0% 15% 0% 15%;
    width: 100%;
    height: 7vh;
    background-color: #FAF8ED;
    // border: black solid 1px;
    display: flex;
    justify-content: space-between;

    .bookmarkSet {
        width: 12%;
        height: 100%;
        background-color: #748E63;
        border: 0;
        border-radius: 2vh 2vh 0 0;
        font-size: 2.5dvh;
        text-align: center;
        color: #FAF8ED;

        &:hover {
            background-color: #608349;
            transition: 0.1s linear;
            scale: 1.05;
        }

        &:active {
            scale: 0.95;
            color: #FAF8ED;
        }

        &:focus {
            background-color: #99B080;
        }
    }
}

.down {
    width: 100%;
    padding: 0% 15% 5% 15%;
    background-color: #99B080;

    .bookmark {
        .buyTicket {

            //立即購票
            .title {
                height: 10vh;
                width: 65%;
                color: #ffd1a2;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 3dvh;
                padding: 2%;
                // border: 1px solid black;

                span {
                    margin-left: 0%;
                }
            }
        }

        .ticket {
            width: 100%;
            min-height: 10vh;
            background-color: #748E63;
            border-radius: 2vh;
            padding: 2%;
            margin-bottom: 2%;
            // border: 1px solid black;

            span {
                color: #FAF8ED;
                font-size: 2.5dvh;
            }

            .sale {
                // border: 1px solid black;
                display: flex;
                justify-content: space-between;
                align-items: center;

                .saleTimes {
                    width: 70%;
                    // border: 1px solid black;
                    display: flex;
                    justify-content: space-between;
                }
            }

            .btn {
                width: 10%;
                height: 100%;
                background-color: #F5A352;
                border: 0;
                border-radius: 1.5vh;
                font-size: 2.5dvh;
                color: #FAF8ED;
                display: flex;
                justify-content: center;
                align-items: center;

                &:hover {
                    transition: 0.1s linear;
                    scale: 1.1;
                    background-color: #FFC68D;
                }

                &:active {
                    scale: 0.95;
                    background-color: #c26202;
                }
            }
        }

        .seat {

            // border: 1px solid black;
            span {
                color: #FAF8ED;
                font-size: 2.5dvh;
            }


            .seatTitle {
                width: 30%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                // border: 1px solid black;

                span {
                    color: #ffc68d;
                    font-size: 3dvh;
                }
            }

            .btn {
                width: 10%;
                height: 100%;
                background-color: #F5A352;
                border: 0;
                border-radius: 1.5vh;
                font-size: 2.5dvh;
                color: #FAF8ED;
                display: flex;
                justify-content: center;
                align-items: center;

                &:hover {
                    transition: 0.1s linear;
                    scale: 1.1;
                    background-color: #FFC68D;
                }

                &:active {
                    scale: 0.95;
                    background-color: #c26202;
                }
            }
        }

        .seatArea {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 2.5dvh;
            // border: 1px solid black;
            margin-bottom: 2%;

            select {
                border-radius: 1.5vh;
                text-align: center;
            }
        }


        .introduction {
            //活動介紹
            padding-top: 5%;
            color: #FAF8ED;
            font-size: 2.5dvh;

            .introductionImg {
                width: 80%;
                height: 80%;
            }

            .title {
                // border: 1px solid black;
                height: 10vh;
                color: #ffc68d;
                display: flex;
                align-items: center;
                font-size: 4dvh;
            }

            .textArea {
                font-size: 2.5dvh;
            }
        }

        .ticketNotice {
            //注意事項
            padding-top: 5%;

            .textArea {
                margin: auto;
                color: #FAF8ED;
                font-size: 2.5dvh;
            }
        }

        .buyNotice {
            //購買提醒
            padding-top: 5%;

            .textArea {
                margin: auto;
                color: #FAF8ED;
                font-size: 2.5dvh;
            }
        }

        .getTicket {
            //取票方式
            padding-top: 5%;

            .textArea {
                margin: auto;
                color: #FAF8ED;
                font-size: 2.5dvh;
            }
        }

        .cencelTicket {
            //退票規定
            padding-top: 5%;

            .textArea {
                margin: auto;
                color: #FAF8ED;
                font-size: 2.5dvh;
            }
        }

        .forum {
            //相關討論
            padding-top: 5%;
            font-size: 2.5dvh;
            color: #FAF8ED;

            .comment {
                width: 100%;
                height: auto;
                margin-bottom: 5%;
                padding: 2%;
                display: flex;
                justify-content: space-between;
                font-size: 3dvh;
                // border: 1px black solid;

                .commentInput {
                    width: 75%;
                    border: 0;
                    word-wrap: break-word;
                    background-color: #99B080;
                    border-bottom: 0.3vh solid #748E63;
                    color: #FAF8ED;

                    &:focus {
                        outline: none;
                    }
                }

                .submit {
                    width: 10%;
                    height: 5vh;
                    border: 0;
                    border-radius: 1.5vh;
                    font-size: 3dvh;
                    background-color: #F5A352;
                    color: #FAF8ED;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    &:hover {
                        transition: 0.1s linear;
                        scale: 1.1;
                        background-color: #FFC68D;
                    }

                    &:active {
                        scale: 0.95;
                        background-color: #c26202;
                    }
                }
            }

            .discussion {
                width: 100%;
                height: auto;
                margin-bottom: 2%;
                padding: 2%;
                border-radius: 2vh;
                background-color: #748E63;
                display: flex;
                justify-content: space-between;

                .circle {
                    width: 3vw;
                    height: 3vw;
                    background-color: #F5A352;
                    clip-path: circle(50% at 50% 50%);
                }

                .info {
                    width: 80%;
                    margin-left: 2%;
                    color: #FAF8ED;

                    .content {
                        // border: 1px black solid;
                        word-wrap: break-word;
                    }
                }

                .deleteComment {
                    width: 10%;
                    height: 100%;
                    border-radius: 1.5vh;
                    border: none;
                    font-size: 3dvh;
                    background-color: #FAF8ED;
                    color: #DB3A3A;
                    border: #DB3A3A solid 0.3vh;

                    &:hover {
                        transition: 0.1s linear;
                        scale: 1.05;
                        background-color: #ffffff;
                    }

                    &:active {
                        scale: 0.95;
                        background-color: #DB3A3A;
                        color: #FAF8ED;
                    }
                }
            }
        }
    }
}</style>