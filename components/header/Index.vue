<template>
  <div class="header">
    <search/>
    <div class="header-icon">
      <nuxt-link to="/">
        <img src="../../assets/img/icon-shop.png" alt="商场图标" class="header-img">
        <p class="header-title">™</p>
      </nuxt-link>
    </div>
    <left-bar/>
  </div>
</template>

<script>
import leftBar from './leftBar';
import Search from './search';

export default {
  components:{
    leftBar,
    Search,
  },

}
</script>

<style style="css" scoped>
.header{
    height:2rem;
    margin:0 0.2rem;
    border-bottom: .02rem solid #eee;
}
.header-icon{
    float: left;
    display: inline-block;
    padding: .2rem;
    margin-left:2rem;
}
.header-img{
    width:1.6rem;
    height:1.6rem;
}
.header-title{
    display: inline-block;
    font-weight: bold;
    font-size: .72rem;
    float: right;
    /* background: black; */
    color: black;
}
</style>
