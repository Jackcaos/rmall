<template>
    <div class="wrap">
      <div  v-for="(item,index) in this.list" :key="index">
        <div class="lt">
            <img :src="'http://localhost:3000/img/' + item.src" class="img-self">
        </div>
        <div class="rt">
            <div class="content">
                <p class="title">{{item.title}}</p>
                <p class="money-title">零售价<strong class="money">￥{{item.money}}</strong></p>
                <p class="less">月销量{{item.sale}}</p>
                <p class="less">库存{{item.surplus}}</p>
                <p class="more">快递方式</p>
                <img src="../../assets/img/air.png" class="post">
                <img src="../../assets/img/car.png" class="post">
            </div>
            <div class="btn-class">
                    <span class="btn">加入购物车</span>
             </div>
        </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            list:[]
        }
    },
    mounted(){
        axios.get('/shop/main',{
            params:{
                id:this.$route.params.shopId
            }
        }).then(({status,data})=>{
            if(status == 200 && data){
                console.log(data.data)
                this.list = data.data
            }
        })
    }
}
</script>

<style lang="css" scoped>
.wrap{
    padding: 4% 8% 4% 16%;
}
.lt{
    width:8rem;
    border:.1rem solid #eaeaea;
    display: inline-block;
}
.img-self{
    height:8rem;
}
.rt{
    display: inline-block;
    margin-left: 2rem;
    position: relative;
    top:1.2rem;
}
.content{
    margin-bottom: 1rem;
}
.title{
    font-size: .5rem;
    font-weight: bold;
    letter-spacing: .02rem;
}
.money-title{
    font-size: .36rem;
    letter-spacing: .04rem;
}

.money{
    margin-left: .5rem;
    font-size: .5rem;
    letter-spacing: .01rem;
    color:#e31436;
}
.less{
    display: inline-block;
    font-size: .28rem;
    letter-spacing: .02rem;
    padding: .2rem .4rem .2rem 0;
    color:gray;
}
.more{
    font-size: .32rem;
}
.post{
    height:.8rem;
    padding: .1rem;
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
    letter-spacing: .2rem;
    cursor: pointer;
}
.btn:hover{
    background-color:#FFCC99;
}
</style>

