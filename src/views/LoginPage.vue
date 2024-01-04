<template>
    <div class="main">
    <div class="up">
        <input type="text">
        <h4>註冊</h4>
        <h4>登入</h4>
    </div>
    <div class="down">
        <h1 class="pp">帳號登入</h1>
        <div class="login">
            <h4 class="loginInP">帳號</h4>
            <input type="text" class="inputClass">
            <br><br>
            <h4 class="loginInP">密碼</h4>
            <input type="number" class="inputClass">
            <br><br>
            <button type="button" class="loginBtn">登入</button>
        </div>
    </div>
    </div>
    </template>
    <script>
    export default {
        data(){
            return{ 
                
            }
        },
        methods:{
            
      },
      mounted(){
        
      }
    }
    </script>
    <style lang="scss">
        .main{
            width: 100vw;
            height: 100vh;
            background-color: #FAF8ED;
            .up{
                width: 100%;
                height: 60px;
                background-color: #F9B572;
                display: flex;
            }
            .down{
                .pp{
                    margin-top: 50px;
                    margin-left: 330px;
                    color: #4D5C44;
                }
                .login{
                    width: 600px;
                    height: 350px;
                    background-color: #89A071;
                    margin: auto;
                    margin-top: 10px;
                    border-radius: 30px;
                    .loginInP{
                        margin-left: 280px;
                        font-size: 25px;
                        padding-top: 30px;
                        color:#4D5C44 ;
                    }
                    .inputClass{
                        height: 20px;
                        width: 300px;
                        margin-left: 150px;
                        margin-top: 5px;
                        border-radius: 5px;
                        border: 1pt solid #89A071 ;
                        background-color: #FAF8ED;
                    }
                    .loginBtn{
                        height: 30px;
                        width: 50px;
                        background-color: #F9B572;
                        border: 1pt solid #F9B572 ;
                        color: #FAF8ED;
                        margin-left: 280px;
                        border-radius: 10px;
                        margin-top: 10px;
                    }
                }
            }
        }
    </style>