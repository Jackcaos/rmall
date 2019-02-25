<template>
    <div class="footer-link">
        <ul class="link-list">
            <li class="group">
               <img src="../../assets/img/icon-shop.png" alt="商场图标" class="footer-img">
               <p class="footer-title">MALL</p>
               <div class="contact">
                    <p class="contact-title">了解我们</p>
                    <img src="../../assets/img/github.png" alt="g" class="contact-img">
                    <img src="../../assets/img/twitter.png" alt="t" class="contact-img">
                    <img src="../../assets/img/Facebook.png" alt="f" class="contact-img">
               </div>
            </li>
            <li class="other">
                <dl>
                    <dt>新手指南</dt>
                    <dd><nuxt-link to="#">购买须知</nuxt-link></dd>
                    <dd><nuxt-link to="#">如何充值</nuxt-link></dd>
                    <dd><nuxt-link to="#">地址须知</nuxt-link></dd>
                </dl>
            </li>
            <li>
                <dl>
                    <dt>售后服务</dt>
                    <dd><nuxt-link to="#">退货政策</nuxt-link></dd>
                    <dd><nuxt-link to="#">退货流程</nuxt-link></dd>
                    <dd><nuxt-link to="#">联系客服</nuxt-link></dd>
                </dl>
            </li>
             <li>
                <dl>
                    <dt>物流服务</dt>
                    <dd><nuxt-link to="#">快递选择</nuxt-link></dd>
                    <dd><nuxt-link to="#">相关标准</nuxt-link></dd>
                    <dd><nuxt-link to="#">快递区域</nuxt-link></dd>
                </dl>
            </li>
             <li>
                <dl>
                    <dt>其他服务</dt>
                    <dd><nuxt-link to="#">招商加盟</nuxt-link></dd>
                    <dd><nuxt-link to="#">配送服务</nuxt-link></dd>
                    <dd><nuxt-link to="#">运费标准</nuxt-link></dd>
                </dl>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="css" scoped>
.footer-link{
    margin:1rem 1rem;
}
li{
    display: inline-block;
    width: 16%;
    margin-left: 1rem;
    height:4rem;
}
.footer-img{
    width:1.6rem;
    height:1.6rem;
}
.footer-title{
    display: inline-block;
    font-weight: bold;
    font-size: .72rem;
    position: relative;
    top: 0.2rem;
}
.contact{
    margin: .3rem 0;
}
.contact-title{
    font-size: .36rem;
    padding: .1rem .2rem .1rem 0;
    display: inline-block;
}
.contact-img{
    width:.8rem;
    height:.8rem;
}
dt{
    font-size:.42rem;
    margin-bottom: .4rem;
}
dd{
    font-size: .32rem;
    padding: .2rem 0;
}
</style>