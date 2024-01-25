<template>
    <div class="main">
        <div class="up">
            <!-- 主辦單位管理按鈕 -->
            <button class="host" @click="this.goManageHostPage()">主辦單位管理</button>

            <!-- 建立活動按鈕 -->
            <button class="act" @click="this.goCreateActivities()">建立活動</button>
        </div>
        <div class="down">
            <div class="actSq">
                <div class="sqUp">
                    <span class="actSpan">活動名稱</span>
                </div>
                <div class="sqDown">

                    <!-- 活動區域 -->
                    <div class="plusAct" v-for="item in activityList">
                        <button class="hensyu" @click="edit(item.codename)">編輯</button>
                        <div class="spanName">{{ item.name }}</div>
                        <button class="cencel" @click="deleteActivity(item.codename)">刪除</button>
                    </div>
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
            activityList: []
        }
    },
    methods: {
        goManageHostPage() {
            this.$router.push('/ManageHostPage') 
        },
        goCreateActivities() {
            this.$router.push('/CreateActivities')
        },
        deleteActivity(codename){
            const activityName = this.activityList.find(item => item.codename === codename)?.name || "該活動";
            if(confirm(`是否刪除活動　　${activityName}`) == true){
                this.confirmDeleteActivity(codename)
            }
        },
        confirmDeleteActivity(codename) {
            fetch('http://localhost:8080/api/delete_commodity', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({
                    codename: codename
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if (data.rtncode == "PLEASE_LOGIN_FIRST") {
                        alert("請先登入才可刪除")
                    }
                    if (data.rtncode == "SESSIONS_ALREADY_SELLED") {
                        // alert("已開始售票，無法刪除活動")
                        alert("已開始售票，無法刪除該活動")
                    }
                    if (data.rtncode == "SUCCESSFUL") {
                        console.log("刪除活動成功");
                        alert("刪除活動成功");
                        this.getAllCommodity()
                    }
                })
                .catch(error => console.log(error))
        },
        getAllCommodity() {
            fetch('http://localhost:8080/api/get_all_commodity', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
            }).then(response => response.json())
                .then(res => {
                    console.log(res.data)
                    if (res.rtncode == "SUCCESSFUL") {
                        this.activityList = res.data
                    } else if (res.rtncode == "PLEASE_LOGIN_ADMIN_ACCOUNT_FIRST") {
                        alert("請先登入")
                        this.$router.push('/AdminLoginPage')
                    }
                })
        },
        edit(codename) {
            fetch('http://localhost:8080/api/get_update_commmodity_data', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    codename: codename
                })
            }).then(response => response.json())
                .then(res => {
                    console.log(res.data)
                    if (res.rtncode == "SUCCESSFUL") {
                        this.$router.push({ name: 'EditingActivity', params: { codename } })
                    } else if (res.rtncode == "PLEASE_LOGIN_ADMIN_ACCOUNT_FIRST") {
                        alert("請先登入")
                        this.$router.push('/AdminLoginPage')
                    }
                })
        }
    },
    mounted() {
        this.getAllCommodity()
    },
    created() {
        // 創建頁面時設定
        counter().setManager({});
    },
    beforeRouteLeave(to, from, next) {
        // 離開頁面時清除
        counter().setManager(null);
        next();
    },
}
</script>
<style lang="scss" scoped>
.main {
    width: 100%;
    height: 100%;
    background-color: #FAF8ED;
    margin-top: 10vh;
    padding: 5vh 0;

    .up {
        width: 70%;
        height: 10%;
        margin-left: 15%;
        display: flex;
        display: flex;
        justify-content: space-between;
        align-items: center;

        button {
            height: 70%;
            width: 25%;
            font-size: 3dvh;
            line-height: 6vh;
            border: 0.3vh solid #89A071;
            color: #89A071;
            background-color: #FAF8ED;
            border-radius: 1vh;
        }

        button:hover {
            transition: 0.1s linear;
            color: #FAF8ED;
            background-color: #89A071;
            scale: 1.1;
        }

        button:active {
            scale: 0.95;
            background-color: #4D5C44;
        }
    }

    .down {
        width: 100%;
        height: 80%;
        // border: 1px solid black;

        .actSq {
            width: 70%;
            min-height: 75vh;
            border: #F5BF89 0.5vh solid;
            margin-left: 15%;
            border-radius: 2vh;

            .sqUp {
                width: 100%;
                height: 15%;
                // border: 1px solid black;
                display: flex;
                justify-content: center;
                align-items: center;

                .actSpan {
                    color: #4D5C44;
                    font-size: 3dvh;
                }
            }

            .sqDown {
                width: 100%;
                height: 85%;
                padding: 2%;

                // border: 1px solid black;
                .plusAct {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 2%;

                    .hensyu {
                        width: 10%;
                        height: 20%;
                        border-radius: 1vh;
                        font-size: 3dvh;
                        color: #F5A352;
                        background-color: #FAF8ED;
                        border: 0.3vh solid #F5A352;

                        button:hover {
                            transition: 0.1s linear;
                            background-color: #F9B572;
                            scale: 1.1;
                        }

                        button:active {
                            scale: 0.95;
                            background-color: #c26202;
                        }
                    }

                    .spanName {
                        width: 100%;
                        font-size: 2dvh;
                        display: flex;
                        justify-content: center;
                        color: #4D5C44;
                        border-bottom: #F5A352 0.3vh solid;
                    }

                    .cencel {
                        width: 10%;
                        height: 100%;
                        border-radius: 1vh;
                        font-size: 3dvh;
                        color: #DB3A3A;
                        background-color: #FAF8ED;
                        border: 0.3vh solid #DB3A3A;

                        button:hover {
                            transition: 0.1s linear;
                            background-color: #d05757;
                            scale: 1.1;
                        }

                        button:active {
                            scale: 0.95;
                            background-color: #ab3131;
                        }
                    }

                }
            }
        }
    }
}
</style>