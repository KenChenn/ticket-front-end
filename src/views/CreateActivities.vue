<template>
    <body>
        <!-- {{this.map.get('visionPicture')  }} -->
        <!-- <img :src="this.map.get('visionPicture')"> -->
        <div class="top">
            <span class="title">建立活動</span>
            <span class="tip">*為必填</span>
        </div>
        <div class="content">
            <span class="name">活動名稱*</span>
            <input type="text" class="nameAbout" v-model="name">
            <br>
            <span v-if="!isEntityName" class="warning">請輸入活動名稱</span>
            <span class="num">活動代號*</span>
            <input type="text" class="numAbout" v-model="codename">
            <br>
            <span v-if="!isEntityCodeName" class="warning">請輸入活動代號</span>
            <span class="unit">主辦單位*</span>
            <select name="" id="" class="unitAbout" v-model="organizer">
                <option value="" hidden>主辦單位名稱</option>
                <option v-for="name in nameList" :value="name">{{ name }}</option>
            </select>
            <br>
            <span v-if="!isEntityOrganizer" class="warning">請選取主辦單位</span>
            <span class="entity">是否為實體活動*</span>
            <span class="yes">是</span>
            <input type="radio" name="radio" class="yesAbout" v-model="enity" value="true">
            <span class="no">否</span>
            <input type="radio" name="radio" class="noAbout" v-model="enity" value="false">
            <br>
            <span v-if="!isEntityEnity" class="warning">請選取是否為實體活動</span>
            <span class="place">地點*</span>
            <input type="text" class="placeAbout" v-model="place">
            <span v-if="!isEntityPlace" class="warning">請輸入地點</span>
            <span class="illustrate">活動說明*</span>
            <textarea name="" id="" cols="30" rows="10" class="illustrateAbout" v-model="introduction"></textarea>
            <span v-if="!isEntityIntroduction" class="warning">請輸入活動說明</span>
            <span class="vision">主視覺圖</span>
            <input type="file" class="visionPicture img" @change="handleFileChange">
            <span v-if="fileSizeError" class="error">檔案大小超過1MB限制</span>
            <span v-if="fileTypeError" class="error">請選擇 JPEG 類型檔案</span>
            <span class="introduce1">座位或介紹圖片/1</span>
            <input type="file" class="introducePicture1 img" @change="handleFileChange1">
            <span v-if="fileSizeError1" class="error">圖片/1 檔案大小超過1MB限制</span>
            <span v-if="fileTypeError1" class="error">圖片/1 請選擇 JPEG 類型檔案</span>
            <span class="introduce2">座位或介紹圖片/2</span>
            <input type="file" class="introducePicture2 img" @change="handleFileChange2">
            <span v-if="fileSizeError2" class="error">圖片/2 檔案大小超過1MB限制</span>
            <span v-if="fileTypeError2" class="error">圖片/2 請選擇 JPEG 類型檔案</span>
            <button type="button" class="establish" @click="test()">確認</button>
        </div>

    </body>
</template>

<script setup>
import * as imageConversion from 'image-conversion';
</script>

<script>

export default {
    data() {
        return {
            imgStr: "data:image/jpeg;base64,",
            map: new Map(),
            nameList: [],

            codename: "",
            name: "",
            introduction: "",
            enity: false,
            place: "",
            organizer: "",
            keyvisualImg: "",
            introduceImg1: "",
            introduceImg2: "",

            //確認輸入
            isEntityName: true,
            isEntityCodeName: true,
            isEntityOrganizer: true,
            isEntityEnity: true,
            isEntityPlace: true,
            isEntityIntroduction: true,

            //照片限制
            fileError: true,
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
            this.isEntityCodeName = !!this.codename;
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
                setTimeout(() => {
                    if (this.isEntityName && this.isEntityCodeName && this.isEntityOrganizer && this.isEntityEnity && this.isEntityIntroduction && this.isEntityPlace && this.fileError) {
                        localStorage.setItem("acttivity", JSON.stringify({
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
                        this.$router.push('/SessionsAndSeats');
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
        // imgConvert(data) {
        //     return((resolve) => {
        //         let reader = new FileReader();
        //         reader.readAsDataURL(data)
        //         reader.onload = () => {
        //             let base64 = reader.result;
        //             resolve(base64)
        //         };
        //     })
        // },
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
    }
}
</script> 
<style scoped lang="scss">
body {
    width: 100%;
    height: 190vh;
    background-color: #faf8ed;
}
.header{
    width: 100%;
    height: 10vh;
    margin-top: 0;
    background-color: #F9B572;
    position: fixed;
    top: 0;
    z-index: 5;
    .fa-solid{
        position: absolute;
        font-size: 30px;
        left:15.5%;
        top: 30%;
        color: #E6E1C8;
        z-index: 10;
        }
    .search{
        position: absolute;
        width: 17%;
        height: 70%;
        top: 15%;
        left: 15%;
        padding-left: 3%;
        border-radius: 10px;
        border: 0 ;
        background-color: #FAF8ED;
        font-size: 25px;
    }
    .signOut{
        position: absolute;
        background-color: transparent;
        color: #FAF8ED;
        font-size: 30px;
        right: 14%;
        top: 20%;
        border: 0;
    }
}

.top {
    margin-left: 15vw;
    padding-top: 10vh;

    .title {
        margin: 0;
        font-size: 50px;
        color: #4D5C44;
        font-weight: 600;
        margin-right: 51vw;
    }

    .tip {
        margin: 0;
        font-size: 25px;
        color: #4D5C44;
    }
}

.content {
    width: 70vw;
    height: 160vh;
    margin-left: 15vw;
    background-color: #f5bf89;
    border-radius: 25px;
    font-size: 35px;
    margin-bottom: 15vh;
    position: relative;

    span {
        color: #4D5C44;
        margin: 0;
    }

    input {
        width: 60%;
        height: 4%;
        font-size: 25px;
        color: #4D5C44;
        background-color: #FAF8ED;
        border: 0;
        border-radius: 20px;
        text-indent: 2%;
        text-align: center;

    }

    select {
        width: 60%;
        height: 4%;
        border-radius: 20px;
        border: 0;
        background-color: #FAF8ED;
        color: #4D5C44;
        font-size: 25px;
        text-align: center;
    }

    input[type="file"] {
        width: 50%;
        height: 3.6%;
        text-indent: 0;
        background-color: transparent;
        border-radius: 0;
    }

    textarea {
        width: 60%;
        height: 25%;
        text-indent: 2%;
        font-size: 25px;
        resize: none;
        color: #4D5C44;
        background-color: #FAF8ED;
        border: 0;
        border-radius: 20px;
    }

    input[type="radio"] {
        width: 30px;
        height: 30px;
        accent-color: #748e63; //改變radio顏色
    }

    .name {
        position: absolute;
        top: 5%;
        left: 10%;
    }

    .nameAbout {
        position: absolute;
        top: 5%;
        right: 10%;
    }

    .num {
        position: absolute;
        top: 12%;
        left: 10%;
    }

    .numAbout {
        position: absolute;
        top: 12%;
        right: 10%;
    }

    .unit {
        position: absolute;
        top: 19%;
        left: 10%;
    }

    .unitAbout {
        position: absolute;
        top: 19%;
        right: 10%;
    }

    .entity {
        position: absolute;
        top: 25%;
        left: 10%;
    }

    .yes {
        position: absolute;
        top: 25%;
        right: 50%;
    }

    .yesAbout {
        position: absolute;
        top: 25%;
        right: 45%;
    }

    .no {
        position: absolute;
        top: 25%;
        right: 30%;
    }

    .noAbout {
        position: absolute;
        top: 25%;
        right: 25%;
    }

    .place {
        position: absolute;
        top: 31.5%;
        left: 10%;
    }

    .placeAbout {
        position: absolute;
        top: 31.5%;
        right: 10%;
    }

    .illustrate {
        position: absolute;
        top: 38.5%;
        left: 10%;
    }

    .illustrateAbout {
        position: absolute;
        top: 38.5%;
        right: 10%;
    }

    .vision {
        position: absolute;
        top: 68%;
        left: 10%;
    }

    .visionPicture {
        position: absolute;
        top: 68%;
        right: 10%;
    }

    .introduce1 {
        position: absolute;
        top: 75%;
        left: 10%;
    }

    .introducePicture1 {
        position: absolute;
        top: 75%;
        right: 10%;
    }

    .introduce2 {
        position: absolute;
        top: 82%;
        left: 10%;
    }

    .introducePicture2 {
        position: absolute;
        top: 82%;
        right: 10%;
    }

    .establish {
        //確認按鈕
        position: absolute;
        bottom: 5vh;
        left: 45%;
        width: 12%;
        font-size: 30px;
        color: #FAF8ED;
        background-color: #748e63;
        border: 0;
        border-radius: 15px;

    }
}
</style>