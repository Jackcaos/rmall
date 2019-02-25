<template>
    <div class="shop-list">
        <dialogs :is-show="this.confirm" @on-close="sure">
            <p class="confirm-msg">{{msg}}</p>
            <div class="btns-class">
                    <span class="btns" @click="sure">确定</span>
            </div>
        </dialogs>
        <ul>
            <li v-for="(item,index) in cartList" :key="index">
                <div class="pic">
                    <nuxt-link :to="{name:'product-id',params:{shopId:item.shopId}}">
                        <img v-lazy="'http://localhost:3000/img/' + item.src">
                    </nuxt-link>
                </div>
                <div class="main">
                    <p class="shop-title">{{item.title}}</p>
                    <span class="money">￥{{item.money}}</span>
                    <span class="sale">销量 {{item.sale}}</span>
                    <div class="btn-class">
                        <a href="javascsript:;" class="btn" @click="joinCart(index)">加入购物车</a>
                    </div>
                </div>
            </li>
        </ul>
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
            
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Dialogs from '../common/dialog'
export default {
    components:{
        Dialogs
    },
   data() {
       return {
           cartList:[],
           pageSize:10,    //加载数目
           sort:1,
           page:1,        //页码
           busy:true,      //不使用滚动加载
           msg:'',
           confirm:false,
           list:[],
           type:{}
       }
   },
   async mounted() {
      this.getShopList()
   },
   methods:{
       getShopList(flag){     //flag监听是否需要继续商品列表是否，true就是继续累加
        axios.get('/shop/list',{
            params:{
                page:this.page,
                pageSize:this.pageSize,
            }
            }).then(({status,data})=>{
                if(status === 200 && data.code === 0){
                    if(flag){
                        this.cartList = this.cartList.concat(data.doc)     //滚动加载
                        if(data.doc.length < 10){
                            this.busy = true
                        }
                        else{
                            this.busy = false
                        }
                    }
                    else{
                        this.cartList = data.doc          //初次进入页面
                        this.busy = false
                    }
                }
        })
       },
       loadMore(){
           this.busy = true
           setTimeout(() => {
                this.page++
                this.getShopList(true)
           }, 500);
       },
       sure(){
           this.confirm = false
       },
       joinCart(index){
        this.type.money = this.cartList[index].money
        this.type.title = this.cartList[index].title
        this.type.shopId = this.cartList[index].shopId
        this.type.src = this.cartList[index].src
        this.type.num = 1
        this.type.state = 1
        axios.post('/cart/add',{
              type:this.type
        }).then(({status,data})=>{
            if(status == 200 && data){
                 this.msg = data.msg
                 this.confirm = true
            }
        })
       }
   }
}
</script>

<style lang="css" scoped>
.shop-list{
    margin: 0 3% 0 17%;
}
li{
    border: .04rem #eaeaea solid; 
    display: inline-block;
    transition: all .3s ease-out;
    margin: 2% 1.5%;
    width:5rem;
    overflow:hidden;
}
li:hover{
    margin-right:1%;
    margin-bottom:.4rem;
    border: .04rem bisque solid;
    box-shadow: .04rem .04rem .02rem bisque;
}
img{
    height:5rem;
    width: 5rem;
}
.shop-title{
    font-size: .38rem;
    font-weight: bolder;
    margin:.3rem .3rem;
    width:4rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.money{
    font-size: .36rem;
    font-weight: bolder;
    color: red;
    padding: 0 .8rem 0 .2rem;
}
.sale{
    color:lightgray;
}
.btn-class {
    clear: both;
    padding: .2rem .4rem;
}
.btn{ 
    display: inline-block;
    text-align: center;
    width: 100%;
    border: .02rem #FF6600 solid;
    padding: .2rem 0;
    font-size: .36rem;
    font-weight: bolder;
    color: #FF6600;
    transition: all .3s ease-out;
}
a:hover{
    background-color:#FFCC99;
}
.confirm-msg{
    text-align: center;
    font-size: .36rem;
    font-weight: bold;
    padding: .2rem 0;
}
.btns-class {
    clear: both;
    padding: .2rem .4rem;
    text-align: center;
    margin-top:.2rem;
}
.btns{ 
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
.btns:hover{
    background-color:#FFCC99;
}
</style>
