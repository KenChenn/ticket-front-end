<template >
    <div class="up">
        <div class="showArea">
            <div class="showImg">
                <!-- 節目圖片 -->
                <img v-if="this.codeList" :src="this.codeList.keyvisualImg">
            </div>

            <!-- 節目資訊 -->
            <div class="showInfo">
                <i class="fa-regular fa-calendar-days"></i>
                <!-- 時間 -->
                <span v-if="this.codeList">
                    {{ this.codeList.startDate }}
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

        <!-- 加入最愛按鈕 -->
        <div class="likeArea">
            <button v-if="!searchFav" @click="this.addFav()">
                <i class="fa-solid fa-heart-circle-plus" > 加入最愛</i>
            </button>
            <button v-if="searchFav" @click="this.cencelFav()">
                <i class="fa-solid fa-heart-circle-plus cencel"   > 移除最愛</i>
            </button>
        </div>

        <div class="linkArea">
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
        </div>

    </div>

    <div class="down">
        <div class="title">
            相關討論
        </div>

        <div class="forum">
            <!-- 討論區發言 -->
            <div class="discussions">
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
                    <button type="button" class="deleteComment" @click="deleteComment(item.id)"
                        v-if="item.isUser">刪除</button>
                </div>
            </div>
            <div class="comment">
                <input type="text" class="commentInput" v-model="comments">
                <button type="submit" @click="commentInput">發布留言</button>
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
            searchFav:"",
            trackerList: [],
            commodityCodenameList: [],

            commentList: [],

            comments: "",
        }
    },
    methods: {
        codeInfo() {
            console.log( this.$route.params.codename);
            fetch('http://localhost:8080/api/get_commodity', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    codename: this.$route.params.codename
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.codeList = data.commodityList;
                    console.log(this.codeList )
                    console.log(this.codeList.codename)
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
                    tracker:$cookies.get("account"),
                    commodityCodename:this.$route.params.codename
                })
            })
                .then(response => response.json())
                .then(data => {
                    this.searchFav = data.is_Track;
                    console.log(this.searchFav)
                })
                .catch(error => console.log(error))
        },
        addFav(){
            fetch('http://localhost:8080/api/track', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    tracker:$cookies.get("account"),
                    commodityCodename:this.$route.params.codename
                })
            })
                .then(response => response.json())
                .then(data => {
                    this.searchFav = data.is_Track;
                    console.log(this.searchFav)
                })
                .catch(error => console.log(error))
        },
        cencelFav(){
            fetch('http://localhost:8080/api/untrack', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    tracker:$cookies.get("account"),
                    commodityCodename:this.$route.params.codename
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
    },
    mounted() {

        this.searchFavorate()
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
        this.comment()
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

.mid {
    height: 50vh;
    background-color: #FAF8ED;
    padding: 0% 15% 5% 15%;
    // border: 1px solid black;
}

.likeArea {
    width: 100%;
    height: 10vh;
    // border: 1px black solid;
    margin-bottom: 5vh;

    button {
        width: 100%;
        height: 100%;
        border-radius: 1.5vh;
        border: none;
        font-size: 3dvh;
        color: #DB3A3A;
        background-color: #FAF8ED;
        border: #DB3A3A solid 0.5vh;
        &:hover{
            transition: 0.1s linear;
            scale: 1.05;
            background-color: #ffffff;
        }
        &:active{
            scale: 0.95;
            background-color: #DB3A3A;
            color: #FAF8ED;
        }
    }
}

.linkArea {
    height: 70%;
    // border: 1px solid black;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .link {
        width: 30%;
        height: 40%;
        margin-bottom: 5vh;
        background-color: #748E63;
        border-radius: 1.5vh;
        font-size: 3dvh;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        color: #FAF8ED;
        &:hover{
            background-color: #608349;
            transition: 0.1s linear;
            scale: 1.05;
        }
        &:active{
            scale: 0.95;
            background-color: #4D5C44;
            color: #FAF8ED;
        }
    }
}


.down {
    // height: auto;
    background-color: #99B080;
    .title {
        // border: 1px solid black;
        height: 10vh;
        color: #ffc68d;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 4dvh;
    }
}


.forum {
    padding: 0% 15% 5% 15%;

    .comment {
        input {
            width: 83%;
            margin-right: 5%;
        }
    }
}

.discussions {
    width: 100%;
    // height: 60vh;
    // overflow-y: auto;
}

.discussion {
    width: 100%;
    height: auto;
    margin-bottom: 5%;
    // border: 1px solid black;
    background-color: #748E63;
    border-radius: 2vh;
    display: flex;
    .circle {
        width: 3vw;
        height: 3vw;
        background-color: #F5A352;
        margin: 2% 2% 0% 2%;    
        clip-path: circle(50% at 50% 50%);
    }
    
    .info {
        width: auto;
        margin: 2%;
        color: #FAF8ED;
    
        // border: 1px black solid;
        .user {
            font-size: 2.5dvh;
        }
    
        .content {
            margin: 1%;
            font-size: 2.5dvh;
        }
    }
}

.deleteComment {
    width: 15%;
    height: 10%;
    margin: 3%;

}
</style>