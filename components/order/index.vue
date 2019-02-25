<template>
    <div>
           <div class="header-title">
               <template v-if="!orderList">
                    <p>暂无订单记录</p>
               </template>
               <template>
                <table border="4">
                    <tr>
                        <th>商品名称</th>
                        <th>数量</th>
                        <th>单价(元)</th>
                        <th>下单时间</th>
                    </tr>
                    <tr v-for="(items,index) in orderList.goodlist" :key="index">
                        <td><img :src="'http://localhost:3000/img/' + items.src"><span>{{items.title}}</span></td>
                        <td>{{items.num}}</td>
                        <td>{{items.money}}</td>
                        <td>{{orderList.time}}</td>
                    </tr>
                    <tr>
                        <td><strong>总数</strong></td>
                        <td class="is">{{orderList.count}}</td>
                        <td><strong>总价值(元)</strong></td>
                        <td class="is">{{orderList.total}}</td>
                    </tr>
                    <tr>
                        <td><strong>收货人</strong></td>
                        <td class="is">{{orderList.username}}</td>
                        <td><strong>地址</strong></td>
                        <td>{{orderList.address}}</td>
                    </tr>
                </table>
                </template>
           </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            orderList:[]
        }
    },
    mounted() {
        this.getOrderList()
    },
    methods:{
        getOrderList(){
            axios.get('/cart/order',{}).then(({status,data})=>{
                if(status == 200&&data.code == 0){
                    this.orderList = data.msg
                }
                else{
                    this.orderList = []
                }
            })
        }
    }
}
</script>

<style scoped>
.nul{
    text-align: center;
    padding: .6rem;
    font-size: .36rem;
    font-weight: bold;
}
.header-title{
    text-align: center;
    padding:2rem 1rem;
}
table{
    border-collapse: collapse;
    border-spacing: 0;
    text-align: center;
}
th{
    text-align: center;
    width: 10%;
    font-size: .36rem;
}
td{
    font-size: .36rem;
}
.is{
    font-weight: bold;
    color:#e31436;
}
img{
    height: 3rem;
}
</style>