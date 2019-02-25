<template>
    <div>
        <dialogs :is-show="this.confirm" @on-close="sure">
            <p class="confirm-msg">{{msg}}</p>
            <div class="btns-class">
                    <span class="btns" @click="sure">确定</span>
            </div>
        </dialogs>
        <div class="header">
           <div class="header-title">
                <ul>
                    <li class="col0 ss">选择</li>
                    <li class="col1 ss">商品名称</li>
                    <li class="col ss">单价(元)</li>
                    <li class="col ss">数量</li>
                    <li class="col ss">金额</li>
                    <li class="col ss">操作</li>
                </ul>
           </div>
           <div class="content">
               <template v-if="!this.cartList">
                    <div class="nul">
                        <p>现在购物车是空的！</p>
                    </div>
               </template>
               <template v-else>
                <ul v-for="(item,index) in this.cartList" :key="index">
                    <li>
                        <div class="col0 div1">
                            <div v-bind:class="{'traingle':item.state}" @click="changeState(item)"></div>
                        </div>
                        <div class="col1 div1"  @click="changeState(item)">
                            <img :src="'http://localhost:3000/img/' + item.src" class="shop-img">
                            <p class="shop-title">{{item.title}}</p>
                        </div>
                        <div class="col div1">{{item.money}}</div> 
                        <div class="col div1">
                            <div class="counter-component">
                                <div class="counter-btn" @click="edit('mins',item)"> - </div>
                                    <div class="counter-show">
                                          <input type="text" v-model="item.num" @keyup="fixNumber" >
                                    </div>
                                    <div class="counter-btn" @click="edit('add',item)"> + </div>
                            </div>
                        </div>
                        <div class="col div1">{{item.money * item.num}}</div>
                        <div class="col div1"><a href="javascript:void(0)" @click="delCart(item)">删除</a></div>
                    </li>
                </ul>
                <div class="footer">
                    <div class="lt">
                        <a href="javascript:void(0)">
                                <div class="traingle"></div>
                                <span class="all">全选</span>
                        </a>
                        </div>
                    <div class="rt">
                        <p class="rt1">已选择<strong>{{count}}</strong>件商品</p>
                        <p class="rt2">共计<strong>{{total}}</strong>元</p>
                        <a href="javascript:void(0)" class="sure" @click="commit">生成订单</a>
                    </div>
                </div>
               </template>
           </div>
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
            number:5,
            min:1,
            max:99,
            flag:false,
            msg:'',
            confirm:false
        }
    },
    computed:{
        count(){
            let i = 0
            this.cartList.forEach((item)=>{
                if(item.state == 1){
                    i = i + item.num
                }
            })
            return i
        },
        total(){
            let sum = 0
            this.cartList.forEach((item)=>{
                if(item.state == 1){
                    sum = sum + item.num + item.money
                }
            })
            return sum
        }
    },
    async mounted(){
        this.getUser()
        this.getCart()
    },
    methods:{
    sure(){
       this.msg = ''
       this.confirm = false
    },
    getUser(){
         axios.get('/users/getUser',{}).then((status,data)=>{
            if(status==200 && data.code==0){
                this.user = data.username
            }
        })
    },
    getCart(){
        axios.get('/cart/user',{}).then(({status,data})=>{
            if(status == 200 && data.code == 0){
                this.cartList = data.res.goodlist
                this.computes()
            }
            else{
                this.cartList = []
            }
        })
    },
    edit(state,item){
        if(state == 'add'){
            item.num++
        }
        else{
            if(item.num >= 1){
                return;
            }
            item.num--
        }
        axios.post('/cart/edit',{
            id:item.shopId,
            num:item.num
        }).then(({status,data})=>{
            if(data.code == -1){
                this.confirm = true
                this.msg = data.msg 
            }
        })
    },
    changeState(item){
        if(!item.state){
            item.state = 1
        }
        else{
            item.state = 0
        }
        axios.post('/cart/changeState',{
            state:item.state,
            id:item.shopId,
            })
        .then(({status,data})=>{
            if(data.code == -1){
                this.confirm = true
                this.msg = data.msg 
            }
        })
    },
    delCart(item){
        axios.post('/cart/del',{
             id:item.shopId,
        }).then(({status,data})=>{
            if(data.code == -1){
                this.confirm = true
                this.msg = data.msg 
            }
            else{
                this.getCart()
            }
        })
    },
    commit(){
        axios.post('/cart/commit',{
            total:this.total,
            count:this.count
        }).then(({status,data})=>{
            if(data.code == 0 && status == 200){
                this.confirm = true
                this.msg = data.msg 
                setTimeout(()=>{
                    this.$router.push('/')
                },5000)
            }
            else{
                this.confirm = true
                this.msg = data.msg 
            }
        })
    },
    fixNumber(item){
      let fix
      if (typeof this.item.num === 'string') {
        fix = Number(this.item.num.replace(/\D/g, ''))
      }
      else {
        fix = this.item.num
      }
      if (fix > this.max || fix < this.min) {
        fix = this.min
      }
      this.item.num = fix
    }
    }
}
</script>

<style scoped>
.header{
    padding:2rem 1rem;
}
.ss{
    float: left;
    background: #eaeaea;
    padding: .1rem;
    text-align: center;
    font-size: .36rem;
}
.col1{
    width:25%;
}
.col{
    width:15%;
}
.col0{
    width: 10%;
}
.shop-img{
    height:2rem;
}
.content{
    margin-top:.5rem;
}
.nul{
    text-align: center;
    padding: .6rem;
    font-size: .36rem;
    font-weight: bold;
}
.div1{
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    padding-left: .1rem;
    font-size: .36rem;
}
.shop-title{
    display: inline-block;
}
.traingle{
	width:0;
	height:0;
	border-left:.2rem solid transparent;
	border-right:.2rem solid transparent;
    border-bottom:.4rem solid  #FF7F00;
    text-align: center;
    display: inline-block;
}
.footer{
    background: #eaeaea;
    height:1rem;
}
.lt{
    float: left;
    position: relative;
    left: 4%;
    top: .3rem;
    font-size: .36rem;
}
.all{
    margin-left: .1rem;
}
.all:hover{
    color:#FF7F00;
}
.rt{
    float:right;
    font-size: .36rem;
}
p{
    display: inline-block;
    padding-right:.4rem; 
}
strong{
    color: #e31436;
    font-size: .5rem;
}
.sure{
    padding: .3rem;
    background: #e31436;
    color: #eee;
    font-weight: bold;
}
.counter-component {
    /* 首先定义position,然后为了避免块级换行问题将display设为inline-block,为之后的数字也设置上隐藏和居中样式 */
  position: relative;
  display: inline-block;
  overflow: hidden;
  vertical-align: middle;
}
.counter-show {
    /* 将3个div进行左浮动 */
  float: left;
}
.counter-show input {
    /* 设置输入框中的样式,高宽以及边界 */
  border: none;
  border-top: 1px solid #e3e3e3;
  border-bottom: 1px solid #e3e3e3;
  height: 25px;
  line-height: 25px;
  width: 40px;
  outline: none;
  text-indent: 4px;
  text-align: center;
}
.counter-btn {
    /* 给两个点击的按钮设置样式 */
  border: 1px solid #e3e3e3;
  float: left;
  height: 25px;
  line-height: 25px;
  width: 25px;
  text-align: center;
  cursor: pointer;
}
.counter-btn:hover {
    /* 设置鼠标的hover效果 */
  border-color: #4fc08d;
  background: #4fc08d;
  color: #fff;
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
