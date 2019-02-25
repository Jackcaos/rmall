<template>
    <div class="tag-wrapper">
         <ul class="tag-list">
             <li>
                 <div class="tag-border">正</div>
                 <p class="bord">100%正品</p>
                 <p>正品保障 假一赔十</p>
             </li>
              <li>
                 <div class="tag-border">低</div>
                 <p class="bord">低价保障</p>
                 <p>缩减环节 确保低价</p>
             </li>
              <li>
                 <div class="tag-border">退</div>
                 <p class="bord">30天无忧退货</p>
                 <p>国内退货 售后无忧</p>
             </li>
              <li>
                 <div class="tag-border">邮</div>
                 <p class="bord">满99包邮</p>
                 <p>顺丰到家 确保时效</p>
             </li>
         </ul>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="css" scoped>
.tag-wrapper{
    height: 2rem;
    padding: .98rem 3rem 0.5rem 4rem;
    border-bottom: .02rem solid #eee;
    border-top: .02rem solid #eee;
}
.tag-list li{
    display: inline-block;
    width: 22%;
}
li div{
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    border: .05rem solid #d6d6d6;
    text-align: center;
    line-height: 1rem;
    font-size: .6rem;
    font-weight: 700;
    display: inline-block;
    float: left;
    margin-right: .24rem;
}
li p{
    font-size:.36rem;
}
.bord{
    font-weight: 700;
}
</style>

