<template>
    <body>
        <div class="top">
            <div class="title">
                編輯活動
                <div class="compel">
                    *為必填
                </div>
            </div>
        </div>
        <div class="content">
            <div class="name">
                <span>活動名稱*</span><br>
                <input type="text" class="nameAbout" v-model="name">
                <p v-if="!isEntityName" class="warning">請輸入活動名稱</p>
            </div>
            <div class="num">
                <span>活動代號 (不可編輯)</span><br>
                <input type="text" class="numAbout" v-model="codename" disabled>
            </div>

            <div class="entity">
                <span>是否為實體活動*</span><br>
                <div class="radio">
                    <span class="yes">是</span>
                    <input type="radio" name="radio" v-model="enity" value="true">
                    <span class="no">否</span>
                    <input type="radio" name="radio" v-model="enity" value="false">
                </div>
                <p v-if="!isEntityEnity" class="warning">請選取是否為實體活動</p>
            </div>
            <div class="place">
                <span>地點*</span> <br>
                <input type="text" class="placeAbout" v-model="place">
                <p v-if="!isEntityPlace" class="warning">請輸入地點</p>
            </div>
            <div class="illustrate">
                <div class="illustrateAbout">活動說明*
                    <br>
                    <span v-if="!isEntityIntroduction" class="warning">請輸入活動說明</span>
                </div>
                <textarea name="" id="" cols="30" rows="10" v-model="introduction">
            </textarea>
            </div>
            <div class="unit">
                <span>主辦單位*</span><br>
                <select name="" id="" class="unitAbout" v-model="organizer">
                    <option value="" hidden>主辦單位名稱</option>
                    <option v-for="name in nameList" :value="name">{{ name }}</option>
                </select>
                <p v-if="!isEntityOrganizer" class="warning">請選取主辦單位</p>
            </div>
            <div class="vision">
                <span>主視覺圖</span>
                <input type="file" class="visionPicture img" @change="handleFileChange">
                <p v-if="fileSizeError" class="error">檔案大小超過1MB限制</p>
                <p v-if="fileTypeError" class="error">請選擇 JPEG 類型檔案</p>
            </div>
            <div class="vision">
                <span>座位或介紹圖片/1</span>
                <input type="file" class="introducePicture1 img" @change="handleFileChange1">
                <p v-if="fileSizeError1" class="error">圖片/1 檔案大小超過1MB限制</p>
                <p v-if="fileTypeError1" class="error">圖片/1 請選擇 JPEG 類型檔案</p>
            </div>
            <div class="vision">
                <span>座位或介紹圖片/2</span>
                <input type="file" class="introducePicture2 img" @change="handleFileChange2">
                <p v-if="fileSizeError2" class="error">圖片/2 檔案大小超過1MB限制</p>
                <p v-if="fileTypeError2" class="error">圖片/2 請選擇 JPEG 類型檔案</p>
            </div>

            <button type="button" class="establish" @click="test()">確認</button>
        </div>
        <div class="footer">

        </div>
    </body>
</template>

<script setup>
import * as imageConversion from 'image-conversion';
</script>

<script>
import counter from '../stores/counter'
export default {
    data() {
        return {
            imgStr: "data:image/jpeg;base64,",
            map: new Map(),
            nameList: [],

            id: 0,
            codename: "",
            name: "",
            introduction: "",
            enity: false,
            place: "",
            organizer: "",
            keyvisualImg: "",
            introduceImg1: "",
            introduceImg2: "",
            activityList: [],

            //確認輸入
            isEntityName: true,
            isEntityOrganizer: true,
            isEntityEnity: true,
            isEntityPlace: true,
            isEntityIntroduction: true,

            //照片限制
            fileError: false,
            fileSizeError: false,
            fileTypeError: false,
            fileSizeError1: false,
            fileTypeError1: false,
            fileSizeError2: false,
            fileTypeError2: false,
        }
    },
    methods: {
        test() {
            if (!this.fileSizeError && !this.fileTypeError && !this.fileSizeError1 && !this.fileTypeError1 && !this.fileSizeError2 && !this.fileTypeError2) {
                this.fileError = true
            } else {
                this.fileError = false
            }
            // console.log(this.fileError);

            //確認必填
            this.isEntityName = !!this.name;
            this.isEntityOrganizer = !!this.organizer;
            this.isEntityEnity = !!this.enity
            this.isEntityPlace = !!this.place
            this.isEntityIntroduction = !!this.introduction
            // console.log(this.enity);

            let array = document.querySelectorAll(".img");
            Promise.all(Array.from(array).map((item) => {
                if (item.files[0] != undefined) {
                    this.imgConvert((item.className.split(" ")[0]), (item.files[0]))
                }
                return Promise.resolve();
            })).then(() => {
                setTimeout((codename) => {
                    if (this.isEntityName && this.isEntityOrganizer && this.isEntityEnity && this.isEntityIntroduction && this.isEntityPlace && this.fileError) {
                        localStorage.setItem("EditActtivity", JSON.stringify({
                            id: this.id,
                            codename: this.codename,
                            name: this.name,
                            introduction: this.introduction,
                            enity: this.enity,
                            place: this.place,
                            organizer: this.organizer,
                            sessionData: [],
                            keyvisualImg: this.map.get("visionPicture"),
                            introduceImg1: this.map.get("introducePicture1"),
                            introduceImg2: this.map.get("introducePicture2"),
                        }))
                        // this.$router.push('/EditSessionsAndSeats');
                        this.$router.push({ name: 'EditSessionsAndSeats', params: { codename } })
                    }
                }, 1000);
            }
            )
        },
        imgConvert(key, data) {
            return new Promise((resolve) => {
                imageConversion.compressAccurately(data, 80).then((res) => {
                    let reader = new FileReader();
                    if (res) {
                        reader.readAsDataURL(res)
                    }
                    reader.onload = () => {
                        let base64 = reader.result;
                        this.map.set(key, base64);
                        resolve(base64);
                    };
                });

            });
        },
        convertBlob(data) {
            let byteString = window.atob(data.split(',')[1]);
            let mimeString = data.split(',')[0].split(':')[1].split(';')[0];
            let ab = new ArrayBuffer(byteString.length);
            let ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i)
            }
            return new Blob([ab], { type: mimeString })
        },
        handleFileChange(event) {
            this.fileSizeError = false;
            this.fileTypeError = false;

            const fileInput = event.target;
            const file = fileInput.files[0];

            // 大小
            const maxSizeInBytes = 1 * 1024 * 1024; // 1 MB
            if (file.size > maxSizeInBytes) {
                this.fileSizeError = true;
                return;
            }

            // 類型
            const allowedTypes = ['image/jpeg', 'image/jpg'];
            if (!allowedTypes.includes(file.type)) {
                this.fileTypeError = true;
                return;
            }
        },
        handleFileChange1(event) {
            this.fileSizeError1 = false;
            this.fileTypeError1 = false;

            const fileInput = event.target;
            const file = fileInput.files[0];

            // 大小
            const maxSizeInBytes = 1 * 1024 * 1024; // 1 MB
            if (file.size > maxSizeInBytes) {
                this.fileSizeError1 = true;
                return;
            }

            // 類型
            const allowedTypes = ['image/jpeg', 'image/jpg'];
            if (!allowedTypes.includes(file.type)) {
                this.fileTypeError1 = true;
                return;
            }
        },
        handleFileChange2(event) {
            this.fileSizeError2 = false;
            this.fileTypeError2 = false;

            const fileInput = event.target;
            const file = fileInput.files[0];

            // 大小
            const maxSizeInBytes = 1 * 1024 * 1024; // 1 MB
            if (file.size > maxSizeInBytes) {
                this.fileSizeError2 = true;
                return;
            }

            // 類型
            const allowedTypes = ['image/jpeg', 'image/jpg'];
            if (!allowedTypes.includes(file.type)) {
                this.fileTypeError2 = true;
                return;
            }
        },
    },
    mounted() {
        // console.log(this.$route.params);
        fetch('http://localhost:8080/api/get_update_commmodity_data', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({
                codename: this.$route.params.codename
            })
        }).then(response => response.json())
            .then(res => {
                console.log(res.data)
                if (res.rtncode == "SUCCESSFUL") {
                    this.id = res.data.id
                    this.codename = res.data.codeName
                    this.name = res.data.name
                    this.introduction = res.data.introduction
                    this.enity = res.data.entity
                    this.place = res.data.place
                    this.organizer = res.data.organizer
                    this.keyvisualImg = res.data.keyvisualImg
                    this.introduceImg1 = res.data.introduceImg1
                    this.introduceImg2 = res.data.introduceImg1
                    if (new Date(res.data.endDate) < new Date()) {
                        this.$router.push('/ActivityAndHostPage')
                    }
                } else if (res.rtncode == "PLEASE_LOGIN_ADMIN_ACCOUNT_FIRST") {
                    alert("請先登入")
                }
            }),
            fetch('http://localhost:8080/api/get_organizer_data',
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: 'include',
                }).then(response => response.json())
                .then(res => {
                    // console.log(res.organizer)
                    res.organizer.forEach(host => {
                        this.nameList.push(host.name)
                    });
                })
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
body {
    background-color: #FAF8ED;
}

.title {
    width: 70%;
    margin-top: 10vh;
    margin-left: 15%;
    color: #c26202;
    font-size: 4dvh;
    display: flex;
    align-items: end;
    //  // border: 1px solid black;
    display: flex;
    justify-content: space-between;

    .compel {
        font-size: 2.5dvh;
        color: #c26202;
    }
}

.content {
    width: 70%;
    margin-left: 15%;
    background-color: #FAF8ED;
    border: #F5BF89 0.5vh solid;
    color: #4D5C44;
    border-radius: 2vh;
    font-size: 3dvh;
    padding: 2%;
    display: flex;
    flex-wrap: wrap;

    input {
        width: 70%;
        height: 5vh;
        font-size: 2.5dvh;
        color: #4D5C44;
        background-color: #FAF8ED;
        border: 0;
        text-indent: 2%;
        border-bottom: #F5A352 0.3vh solid;

        &:focus {
            outline: none;
        }
    }

    select {
        width: 70%;
        // height: 5vh;
        border-radius: 1.5vh;
        border: #F5A352 0.3vh solid;
        background-color: #FAF8ED;
        color: #4D5C44;
        font-size: 2.5dvh;
        text-align: center;
    }

    input[type="file"] {
        width: 70%;
        text-indent: 0;
        border-bottom: 0;
        // width: 50%;
        // height: 5vh;
        // // background-color: transparent;
        // border-radius: 0;
    }


    input[type="radio"] {
        width: 3vh;
        height: 3vh;
        accent-color: #748e63; //改變radio顏色
    }

    .name {
        width: 50%;
        // border: 1px solid black;
    }


    .num {
        width: 50%;
        // border: 1px solid black;
    }

    .unit {
        width: 50%;
        // border: 1px solid black;
    }


    .entity {
        width: 50%;
        height: 7vh;

        .radio {
            width: 35%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .yes {
            width: 1%;
            // border: 1px solid black;
        }

        .no {
            width: 1%;
            // border: 1px solid black;
        }
    }

    .place {
        width: 50%;
    }

    .illustrate {
        width: 100%;
        height: 30vh;
        margin-top: 1%;
        display: flex;
        // border: 1px solid black;

        .illustrateAbout {
            width: 15%;
            height: 100%;
            // border: 1px solid black;
        }

        textarea {
            width: 85%;
            font-size: 2.5dvh;
            resize: none;
            color: #4D5C44;
            background-color: #FAF8ED;
            border: #F5A352 0.3vh solid;

            &:focus {
                outline: none;
            }
        }
    }

    .vision {
        width: 35%;
        margin-right: 15%;
        // border: 1px solid black;

        .visionPicture {
            width: 100%;
            // border: 1px solid black;
        }
    }

    .warning {
        height: 10%;
        width: 100%;
        color: #DB3A3A;
        font-size: 2dvh;
        // border: 1px black solid;                
    }

    .error {
        height: 10%;
        width: 100%;
        color: #DB3A3A;
        font-size: 2dvh;
        // border: 1px black solid;                
    }

    .establish {
        //確認按鈕
        height: 10%;
        width: 14%;
        font-size: 2.5dvh;
        border-radius: 1vh;
        border: 0.3vh solid #F5A352;
        background-color: #FAF8ED;
        color: #F5A352;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 3% auto 0 auto;
        transition: 0.1s linear;

        &:hover {
            transition: 0.2s linear;
            border: 0;
            background-color: #748E63;
            border: 0.3vh solid #748E63;
            color: #FAF8ED;
            scale: 1.1;
        }

        &:active {
            scale: 0.95;
        }
    }

    .footer {
        height: 5vh;
        width: 100%;
        background-color: #FAF8ED;
    }
}
</style>