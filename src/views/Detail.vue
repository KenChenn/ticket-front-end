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
            <div class="link">
                <RouterLink to="/">
                    立即購票
                </RouterLink>
            </div>
            <div class="link">
                <RouterLink to="/">
                    活動介紹
                </RouterLink>
            </div>
            <div class="link">
                <RouterLink to="/">
                    注意事項
                </RouterLink>
            </div>
            <div class="link">
                <RouterLink to="/">
                    購買提醒
                </RouterLink>
            </div>
            <div class="link">
                <RouterLink to="/">
                    取票方式
                </RouterLink>
            </div>
            <div class="link">
                <RouterLink to="/">
                    退票規定
                </RouterLink>
            </div>
        </div>

    </div>

    <div class="down">
        <div class="title">
            相關討論
        </div>

        <div class="forum">
            <!-- 討論區發言 -->
            <div class="discussion">
                <div class="circle"></div>
                <div class="info">
                    <!-- 使用者名字 -->
                    <div class="user">
                        <span>
                            user
                        </span>
                    </div>
                    <!-- 發言內容 -->
                    <div class="content">
                        <span>
                            Hello world
                        </span>
                    </div>
                </div>

            </div>
        </div>
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
        border-radius: 20px;

        .showImg {
            width: 100%;
            height: 80%;

            img {
                border-radius: 20px 20px 0 0;
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
    height: 50vh;
    background-color: #FAF8ED;
    padding: 2% 15% 5% 15%;
    // border: 1px solid black;
}

.linkArea {
    height: 100%;
    // border: 1px solid black;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.link {
    width: 30%;
    height: 40%;
    margin-bottom: 10vh;
    background-color: #748E63;
    border-radius: 15px;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;

    a {
        color: #FAF8ED;
        text-decoration: none;
    }
}

.down {
    // height: auto;
    background-color: #99B080;
}

.title {
    // border: 1px solid black;
    height: 10vh;
    color: #FAF8ED;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
}

.forum {
    padding: 0% 15% 5% 15%;
}

.discussion {
    width: 100%;
    height: auto;
    margin-bottom: 10vh;
    // border: 1px solid black;
    background-color: #89A071;
    border-radius: 15px;
    display: flex;
}
.circle {
    width: 5%;
    height: 5vh;
    background-color: #F5A352;
    margin: 2% 2% 0% 2%;
    clip-path: circle(50% at 50% 50%);
}
.info{
    width: 85%;
    margin: 2%;
    color: #FAF8ED;
    // border: 1px black solid;
    .user{
        font-size: 2rem;
    }
    .content{
        margin: 1%;
        font-size: 1.5rem;
    }
}
</style>