<template>
    <div>
        <div class="left">
            <ul class="category">
                <li v-for="(item,index) in categories" :key="index" class="list">
                    <img :src="item.src" :alt="item.name" class="list-img">
                    <span class="name">{{item.name}}</span>
                </li>
            </ul>
            <img src="../../assets/img/icon-shop-1.png" alt="mall" class="mall">
            <p class="mall-name">MALL</p>
        </div>
    </div>
</template>

<script>
export default {
    data (){
        return {
            categories:[
                {
                    src:"http://localhost:3000/icon/categories.png",
                    name:"所有分类"
                },
                {
                    src:"http://localhost:3000/icon/fashion.png",
                    name:"化妆品"
                },
                {
                    src:"http://localhost:3000/icon/fashions.png",
                    name:"国际大牌"
                },
                {
                    src:"http://localhost:3000/icon/eat.png",
                    name:"健康保健"
                },
                {
                    src:"http://localhost:3000/icon/food.png",
                    name:"国际美食"
                },
                {
                    src:"http://localhost:3000/icon/phone.png",
                    name:"电子数码"
                },
                {
                    src:"http://localhost:3000/icon/sport.png",
                    name:"运动户外"
                }
            ]
        }
    }
}
</script>

<style lang="css" scoped>
.left{
    float: left;
    background: linear-gradient(#FF6600, #FF9999);
    padding: .35rem .6rem;
    position: fixed;
    left: 4%;
    top: 15%;
    width: 8%;
}
.list{
    margin:.3rem 0;
}
.list-img{
    vertical-align: middle;
    width: .6rem;
    height: .6rem;
}
.name{
    display: inline-block;
    vertical-align: middle;
    width: 70px;
    height: 30px;
    line-height: 30px;
    white-space: nowrap;
    font-size: .34rem;
    margin-left: .3rem;
    color: white;
    cursor: pointer;
}

.mall{
    vertical-align: middle;
    height:2rem;
    width: 2rem;
    padding: .2rem;
}
.mall-name{
    text-align: center;
    font-size: .6rem;
    font-weight: bold;
    color: white;
}
</style>
