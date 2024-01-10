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

    <div class="mid">
        <div class="linkArea">
            <RouterLink to="/Popular" active-class="active" >
                立即購票
            </RouterLink>
            <RouterLink to="/Popular" active-class="active" >
                活動介紹
            </RouterLink>
            <RouterLink to="/Popular" active-class="active" >
                注意事項
            </RouterLink>
            <RouterLink to="/Popular" active-class="active" >
                購買提醒
            </RouterLink>
            <RouterLink to="/Popular" active-class="active" >
                取票方式
            </RouterLink>
            <RouterLink to="/Popular" active-class="active" >
                退票歸定
            </RouterLink>            
        </div>
    </div>

    <div class="down">

    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
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
                font-size: 1.5rem;
                margin-left: 5%;
                line-height: 1.8rem;
            }
        }
    }
}

.mid {
    background-color: #FAF8ED;

    padding: 2% 15%;
    border: 1px solid black;
}

.down {
    width: 100%;
    height: 50vh;
    background-color: #89A071;
}
</style>