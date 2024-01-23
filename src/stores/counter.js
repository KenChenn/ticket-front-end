import { defineStore } from "pinia";

export default defineStore("counter",{
    state: () => ({
        headerLink: null,
        headerHomeLink: null,
        manager: null,
    }),
    state(){
        return{
            dataList:[],
            testArray:[{title:1,content:123},{title:2,content:123},{title:3,content:123}],
            test:"123",
            location:1,
        }
    },
    getters:{
        locationInfo(){
            return `現在位置:${this.location}`
        }
    },
    actions:{
        saveSearchData(data){
            console.log("PINIA DATA:" + data);
            this.dataList = data
        },
        getLocation(){
            console.log(this.location)
        },
        setLocation(num){
            this.location = num;
        },
        setManager(object) {  //管理者
            this.manager = object;
        },
        setUser(object) {  //使用者
            this.user = object;
        },
    }
})