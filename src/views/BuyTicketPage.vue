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
            <br>
            　　　　　　　　　　　　　　　　　　　　<span class="downInfoP">票種</span>　　　　　　　　　　　　　　　　　　　　<span class="downInfoP">售價</span>
            <br><br>
            <div class="ticket1">
                <br>
                <span class="ticketP ticketP1 ">預售票</span>
                <span class="ticketP ticketP2 ">TWD$</span>
                <span class="ticketP ticketP3 ">1200</span>
                <button class="btn">購買</button>
            </div>
            <br>
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
                img{
                    height: 100%;
                    width: 100%;
                    object-fit: cover;
                }
            }

            .showInfo {
                width: 100%;
                height: 20%;
                // border: 1px black solid;
                i,span{
                    color: #FAF8ED;
                    font-size: 1.5rem;
                    margin-left: 5%;
                    line-height: 1.8rem;
                }
            }
        }
    }

.down {
    width: 100%;
    height: 30%;
    background-color: #89A071;

    .downInfoP {
        color: #FAF8ED;
        font-size: 1.1rem;
    }

    .ticket1 {
        width: 60%;
        height: 25%;
        background-color: #748E63;
        margin-left: 20%;
    }

    .ticketP {
        color: #FAF8ED;
        font-size: 1.1rem;
    }

    .ticketP1 {
        margin-left: 1%;
        margin-right: 34%;
    }

    .ticketP3 {
        margin-right: 30%;
    }

    .btn {
        width: 10%;
        height: 45%;
        background-color: #F5A352;
        border: 1pt solid #F5A352;
        border-radius: 15px;
        font-size: 1.1rem;
        color: #FAF8ED;
    }
}</style>