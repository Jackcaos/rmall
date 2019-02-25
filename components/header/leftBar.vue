<template>
    <div class="bar">
        <ul class="list">
            <template v-if="this.user">
                <li><nuxt-link to="/cart">购物车</nuxt-link></li>
                <li><nuxt-link to="/order">我的订单</nuxt-link></li>
                <li><a href="javascript:void(0)" class="user">{{this.user}}</a></li>
                <li><a href="javascript:void(0)"  @click="logout">退出</a></li>
            </template>
            <template v-else>
                <li><a href="javascript:void(0)"  @click="sign">登录</a></li>
                <li><a href="javascript:void(0)" @click="register">注册</a></li>
            </template>
        </ul>
        <dialogs :is-show="isShowDialog" @on-close="closeDialog('isShowDialog')">
           <div class="wrap-content">
                <p class="name">用户名</p>
                <div class="wrap">
                    <input type="text" class="name-input"  v-model="username">
                </div>
           </div>
           <div class="wrap-content wrap-contents">
                <p class="pwd">密码</p>
                <div class="wrap">
                    <input type="password" class="pwd-input"  v-model="password">
                </div>
                <p class="login-error" v-show="this.loginErr">{{this.loginMsg}}</p>
           </div>
           <div class="btn-class">
                    <span class="btn" @click="userLogin">登录</span>
           </div>
        </dialogs>
        <dialogs :is-show="isShowRegDialog" @on-close="closeDialog('isShowRegDialog')">
            <div class="wrap-content">
                <p class="name">用户名</p>
                <div class="wrap">
                    <input type="text" class="name-input" v-model="username">
                </div>
           </div>
           <div class="wrap-content">
                <p class="name">手机号</p>
                <div class="wrap">
                    <input type="text" class="phone-input" v-model="phone">
                </div>
           </div>
           <div class="wrap-content">
                <p class="name">居住地</p>
                <div class="wrap">
                    <input type="text" class="address-input" v-model="address">
                </div>
           </div>
           <div class="wrap-content">
                <p class="pwd">密码</p>
                <div class="wrap">
                    <input type="password" class="pwd-input" v-model="password">
                </div>
                <p class="reg-error" v-show="this.regErr">{{this.regMsg}}</p>
           </div>
           <div class="btn-class">
                    <span class="btn" @click="userRegister">注册</span>
           </div>
        </dialogs>
    </div>
</template>

<script>
import Dialogs from '../common/dialog'
import axios from 'axios'
import CryptoJS from 'crypto-js'
import store from '../../store/index.js'
export default {
    components:{
        Dialogs
    },
    data (){
        return{
           user:'',
           loginErr:false,
           loginMsg:'',
           regErr:false,
           regMsg:'',
           isShowDialog:false,
           isShowRegDialog:false,
           username:'',
           address:'',
           password:'',
           phone:''
        }
    },
    async mounted() {
        axios.get('/users/getUser',{}).then((status,data)=>{
            if(status==200 && data.code==0){
                this.user = data.username
            }
        })
    },
    methods:{
        sign(){
            this.isShowDialog = true;
        },
        register(){
            this.isShowRegDialog = true;
        },
        closeDialog(attr){
             this[attr] = false
             this.loginErr = false
             this.regErr = false
             this.username = ''
             this.password = ''
             this.address = ''
             this.phone = ''
        },
        userRegister(){
            axios.post('/users/signup',{
                username:this.username,
                password:CryptoJS.MD5(this.password).toString(),
                address:this.address,
                phone:this.phone
            }).then(({status,data})=>{
                if(status === 200){
                    if(data&&data.code===0){
                        this.isShowRegDialog = false;
                    }
                    else{
                        this.regErr = true
                        this.regMsg = data.msg
                    }
                }
            })
        },
        userLogin(){
            axios.post('/users/signin',{
                username:this.username,
                password:CryptoJS.MD5(this.password).toString()
            }).then(({status,data})=>{
                if(status === 200){
                    if(data&&data.code===0){
                       this.isShowDialog = false;
                       this.user = data.user.username
                    }
                    else{
                        this.loginErr = true
                        this.loginMsg = data.msg
                    }
                }
            })
        },
        logout(){
            axios.get('/users/exit').then(({status,data})=>{
                if(status === 200){
                    if(data.code === 0){
                        this.user = ''
                    }
                }
            })
        }
    }
}
</script>

<style lang="css" scoped>
.bar{
    float: right;
    position: relative;
    top: .8rem;
    right: 3rem;
}
li{
    display: inline;
    padding: 0 .1rem;
}
a{
    color: darkgrey;
    font-size: .4rem;
}
a:hover{
    color: #FF7F00;
}
.user{
    color: #FF7F00;
}
.wrap-content{
    padding: .2rem 0 0 1rem;
    text-align: center;
}
.wrap{
    display: inline-block;
    border-bottom: .02rem solid red;
    width: 40%;
}
p{
    display: inline-block;
    font-size: .36rem;
    letter-spacing: .1rem;
}
input{
    width:100%;
}
.login-error{
    padding: .2rem;
    background: pink;
    width: 50%;
    margin-top: .2rem;
    color: red;
    border-radius: .2rem;
}
.reg-error{
    padding: .2rem;
    background: pink;
    width: 50%;
    margin-top: .2rem;
    color: red;
    border-radius: .2rem; 
}
.pwd{
    letter-spacing: .35rem;
}
.btn-class {
    clear: both;
    padding: .2rem .4rem;
    text-align: center;
    margin-top:.2rem;
}
.btn{ 
    display: inline-block;
    text-align: center;
    width: 30%;
    border: .02rem #FF6600 solid;
    padding: .2rem 0;
    font-size: .36rem;
    font-weight: bolder;
    color: #FF6600;
    transition: all .3s ease-out;
    letter-spacing: .2rem;
    cursor: pointer;
}
.btn:hover{
    background-color:#FFCC99;
}
</style>

