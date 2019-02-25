<template>
    <div class="search">
       <div class="wrap">
            <input type="text" class="search-input" placeholder="搜索您喜欢的商品">
       </div>     
        <span class="btn-search">Search</span>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="css" scoped>
.search{
    display: inline-block;
    width:30%;
    position: relative;
    top: .4rem;
    left: 20%;
}
.wrap{
    display: inline-block;
    width: 70%;
    text-align: center;
    padding: .1rem;
    border:#FF7F00 .04rem solid;
    border-radius: .2rem;
    padding-left:.2rem;
}
input{
    line-height: .8rem;
    height: .8rem;
    width: 80%;
}
.btn-search{
    padding: .34rem .5rem .34rem;
    background: #FF7F00;
    border-radius: .2rem;
    font-size: .32rem;
    color: white;
    cursor: pointer;
}
</style>

