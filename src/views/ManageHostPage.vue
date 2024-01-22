<template>
    <div class="main">
        <div class="up">
            <div class="title">
                主辦單位名稱
            </div>
            <button class="plusBtn" @click="goCreateHost()">新增</button>
        </div>
        <div class="down">
            <div class="host" v-for="(name, index) in this.nameList" :key="index">
                <button class="editBtn" @click="goToEditPage(idList[index])">編輯</button>
                <span class="kaisyaiName">{{ name }}</span>
                <button class="cencelBtn" @click="this.delete(this.idList[index])">刪除</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            nameList: [],
            idList: []
        }
    },
    methods: {
        goCreateHost() {
            this.$router.push('/CreateHost');
        },
        delete(id) {
            console.log("====");
            fetch('http://localhost:8080/api/delete_organizer',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: 'include',
                    body: JSON.stringify({ id: id }),
                }).then(response => response.json())
                .then(res => {
                    console.log(res.rtncode);
                    if (res.rtncode == "SUCCESSFUL") {
                        console.log("刪除成功");
                        this.nameList = this.nameList.filter((name, index) => this.idList[index] !== id);
                    }
                })
        },
        goToEditPage(id) {
            // console.log(this.$route.params.id);
            this.$router.push({ name: 'EditHost', params: { id } });
        }
    },
    mounted() {
        fetch('http://localhost:8080/api/get_organizer_data',
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
            }).then(response => response.json())
            .then(res => {
                console.log(res.organizer)
                // this.id = res.organizer[0].id
                res.organizer.forEach(host => {
                    this.nameList.push(host.name)
                    this.idList.push(host.id)
                });
            })
    }
}
</script>

<style lang="scss" scoped>
.main {
    width: 100%;
    margin-top: 10vh;
    background-color: #FAF8ED;

    .up {
        display: flex;
        justify-content: space-between;

        .title {
            width: 35%;
            height: 10vh;
            margin-left: 15%;
            color: #c26202;
            font-size: 4dvh;
            display: flex;
            align-items: end;
            display: flex;
            justify-content: space-between;
        }

        .plusBtn {
            height: 70%;
            width: 10%;
            margin-top: 3vh;
            margin-right: 15%;
            font-size: 3dvh;
            line-height: 6vh;
            border-radius: 1vh;
            border: 0.3vh solid #89A071;
            color: #89A071;
            background-color: #FAF8ED;
        }

        .plusBtn:hover {
            transition: 0.1s linear;
            color: #FAF8ED;
            background-color: #89A071;
            scale: 1.1;
        }

        .plusBtn:active {
            scale: 0.95;
            background-color: #4D5C44;
        }
    }

    .down {
        width: 70%;
        min-height: 70vh;
        margin: auto;
        border-radius: 2vh;
        border: #F5BF89 0.5vh solid;
        padding: 2%;

        .host {
            // border: black 1px solid;
            height: 5vh;
            margin-bottom: 1%;
            display: flex;
            justify-content: space-between;

            .editBtn {
                width: 10%;
                height: 100%;
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

            .kaisyaiName {
                width: 70%;
                text-align: center;
                font-size: 3dvh;
                color: #4D5C44;
                border-bottom: 0.3vh solid #F5BF89;
            }

            .cencelBtn {
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
}</style>