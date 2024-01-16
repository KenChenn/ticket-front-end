<script >
import {mapState,mapActions} from 'pinia';
import counter from '../stores/counter';
export default {
    data() {
        return {
            // ...mapState(counter,['dataList','testArray','test']),
        }
    },
    computed: {
        ...mapState(counter, ['dataList','testArray','test'])
    },
    methods: {
        ...mapActions(counter,[]),
    },
    mounted() {
        this.search()
    },
}
</script>

<template>
    <div class="showArea">

        <!-- 節目卡片區域 -->
        <RouterLink to="/" class="show" v-for="(item,index) in this.dataList">
            <!-- 節目圖片 -->
            <div class="showImg">
                <img :src="item.keyvisualImg ">
            </div>
            <div>
                <!-- 節目名稱 -->
                <p>
                    {{ item.name }}
                </p>
            </div>
            <!-- 節目開售日期 -->
            <div class="showDate">
                <p>
                    {{ item.startDate }}
                </p>
            </div>
            <!-- 節目狀態 -->
            <div class="showStatus">
                <p>
                    ON SALE
                </p>
            </div>
            
            <!-- //測試 -->
            <!-- <div class="one" v-for="(item,index) in this.dataList">
                <p class="text"> {{ item.codename }}</p>
                <img :src="item.keyvisualImg ">
            </div> -->
        </RouterLink>

    </div>
</template>


<style scoped lang="scss">
.showArea {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background-color: #99B080;
    padding: 5% 10% 0% 10%;

    .one{
        height: 200px;
        width: 200px;
        background-color: #FAF8ED;
        .text{
            color: black;
        }
    }
}

.show {
    width: 30%;
    height: 40vh;
    margin-bottom: 10vh;
    background-color: #748E63;
    color: #FAF8ED;
    border-radius: 20px;

    .showImg {
        height: 60%;
        width: 100%;

        img {
            object-fit: cover;
            width: 100%;
            height: 100%;
            border-radius: 20px 20px 0 0;
        }
    }

    .showDate {
        width: 60%;
        height: 20%;
        font-size: 1.5rem;
        display: flex;
        justify-content: end;
        align-items: center;
        // border: 1px black solid;
    }

    .showStatus {
        width: 30%;
        height: 15%;
        border-radius: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 65%;
        background-color: #F5A352;
    }
}
</style>