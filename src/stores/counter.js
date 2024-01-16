import { defineStore } from "pinia";

export default defineStore("counter",{
    state(){
        return{
            dataList:[],
            testArray:[{title:1,content:123},{title:2,content:123},{title:3,content:123}],
            test:"123"
        }
    },
    getters:{

    },
    actions:{
        saveSearchData(data){
            console.log("PINIA DATA:" + data);
            this.dataList = data
        }
    }
})