<template >
    <div class="main">
        <div class="up">
            <br><br>
            <div class="mainPicSq">
                <div class="picSq"></div>
                <div class="picInfo">
                    <br>
                    　<i class="fa-regular fa-calendar-days icon">　</i><span class="infoP">2024/01/31(周三) 19:30(+0800)</span>
                    <br>
                    　<i class="fa-solid fa-location-dot icon">　</i><span class="infoP">Legacy Taipei / 台北市中正區八德路一段一號</span>
                    <br>
                    　<i class="fa-solid fa-user icon">　</i><span class="infoP">主辦單位 躍演</span>
                </div>
            </div>
        </div>
        <div class="down">
            <br>
            　　　　　　　　　　　　　　　　<span class="downInfoP">票種</span>　　　　　　　　　　　　　　　　　　<span class="downInfoP">售價</span>
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
<style lang="scss">
.main {
    width: 100vw;
    height: 150vh;
    background-color: #FAF8ED;

    .up {
        width: 100%;
        height: 70%;
        background-color: #FAF8ED;

        .mainPicSq {
            width: 60%;
            height: 85%;
            background-color: #F5A352;
            margin: auto;

            .picSq {
                width: 100%;
                height: 70%;
                background-image: url("../views/BELUCA.png");
                background-repeat: round;
            }

            .picInfo {
                width: 100%;
                height: 30%;

                .icon {
                    color: #FAF8ED;
                    font-size: 1.5rem;
                }

                .infoP {
                    color: #FAF8ED;
                    font-size: 1.5rem;
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
        .ticket1{
            width: 60%;
            height: 25%;
            background-color: #748E63;
            margin-left: 20%;
        } 
        .ticketP{
            color: #FAF8ED;
            font-size: 1.1rem;
        }
        .ticketP1{
            margin-left: 1%;
            margin-right: 34%;
        }
        .ticketP3{
            margin-right: 30%;
        }
        .btn{
            width: 10%;
            height: 45%;
            background-color: #F5A352;
            border: 1pt solid #F5A352;
            border-radius: 10px;
            font-size: 1.1rem;
            color: #FAF8ED;
        }
    }
}</style>