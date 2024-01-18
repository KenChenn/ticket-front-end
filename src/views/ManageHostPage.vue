<template>
    <div class="main">
        <div class="up">
            <h1 class="hostName">主辦單位名稱</h1>
            <button class="plusBtn" @click="goCreateHost()">新增</button>
        </div>
        <div class="down">
            <div class="hostSq">
                <div class="host" v-for="(name, index) in this.nameList" :key="index">
                    <br>
                    <button class="editBtn" @click="goToEditPage(idList[index])" >編輯</button>
                    <span class="kaisyaiName">{{ name }}</span>
                    <button class="cencelBtn" @click="this.delete(this.idList[index])">刪除</button>
                </div>
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
        goToEditPage(id){
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
    width: 100vw;
    height: 100vh;
    background-color: #FAF8ED;

    .up {
        width: 100%;
        height: 20%;

        .hostName {
            color: #4D5C44;
            margin-left: 20%;
            margin-top: 4%;
        }

        .plusBtn {
            width: 6%;
            height: 30%;
            background-color: #89A071;
            border: 1pt solid #89A071;
            border-radius: 15px;
            font-size: 1.2rem;
            color: #FAF8ED;
            margin-top: 4.5%;
            margin-left: 37%;
        }
    }

    .down {
        width: 100%;
        height: 80%;

        .hostSq {
            width: 59%;
            height: 90%;
            background-color: #F5BF89;
            margin-left: 20%;
            border-radius: 15px;

            .editBtn {
                width: 13%;
                height: 1.6rem;
                border-radius: 15px;
                background-color: #F5A352;
                border: 1pt solid #F5A352;
                color: #FAF8ED;
                margin-left: 3%;
                margin-right: 26%;
            }

            .cencelBtn {
                width: 13%;
                height: 1.6rem;
                border-radius: 15px;
                background-color: #DB3A3A;
                border: 1pt solid #DB3A3A;
                color: #FAF8ED;
            }

            .kaisyaiName {
                font-size: 1.3rem;
                margin-right: 26%;
                color: #4D5C44;
            }
        }
    }
}
</style>