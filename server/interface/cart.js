const Router = require('koa-router')
const Cart = require('../dbs/models/carts')
const User = require('../dbs/models/users')
const Passport = require('./utils/passport')
const axios = require('./utils/axios')

let router = new Router({
    prefix:'/cart'
})

router.post('/add',async(ctx,next)=>{
    if (!ctx.isAuthenticated()) {
        ctx.body = {
          code: -1,
          msg: '请先进行登录'
        }
    }
    else{
        let flag = false
        let type = ctx.request.body.type
        let username = ctx.session.passport.user.username
        let arrList = await Cart.findOne({'username':username,'status':0},'goodlist')
        if(arrList){
            let goodlist = arrList.goodlist
            for(list of goodlist){
                if(list.shopId == type.shopId){
                    flag = true
                }
            }
            if(flag){
                ctx.body = {
                    code: 0,
                    msg: '商品已在购物车啦'
                }
            }else{
                arrList.goodlist.push(type);
                let res = await arrList.save()
                if(res){
                    ctx.body = {
                        code: 0,
                        msg: '加入购物车成功'
                    }
                }
            }
        }
        else{
            let username = ctx.session.passport.user.username
            let cartNo = Math.floor(Math.random() * 999999)
            let date = new Date()
            let year = date.getFullYear()
            let month = date.getMonth()+1
            let day = date.getDate()
            let time = year + "年" + month + "月" + day +"日"
            let status = 0
            let total = 0
            let count = 0
            let address = ''
            let goodlist = []
            goodlist.push(type)
            let cart = new Cart({username,cartNo,goodlist,time,status,count,total,address})
            let res = await cart.save()
            if(res){
                ctx.body = {
                    code:0,
                    msg:"购物车创建成功"
                }
            }else{
                ctx.body = {
                    code:-1,
                    msg:"服务器错误，未成功加入购物车"
                }
            }
        }
    }
})

router.get('/user',async(ctx,next)=>{
    if(ctx.isAuthenticated()){
        let username = ctx.session.passport.user.username
        let res = await Cart.findOne({'username':username,'status':0},'goodlist')
        if(res){
            ctx.body = {
                code:0,
                res:res
            }
        }
        else{
            ctx.body = {
                code:-1,
                res:"购物车为空,去购物吧"
            }
        }
    }
    else{
        ctx.body = {
            code: -1,
            msg: '请先进行登录'
        }
    }
})

router.post('/edit',async(ctx,next)=>{
    if(ctx.isAuthenticated){
        let id = ctx.request.body.id
        let num = ctx.request.body.num
        let username = ctx.session.passport.user.username
        let list = await Cart.update({'username':username,'status':0,'goodlist.shopId':id},{'goodlist.$.num':num})
        if(list){
            ctx.body = {
                code:0,
                msg:'修改成功'
            }
        }else{
            ctx.body = {
                code:-1,
                msg:'修改失败'
            }
        }
    }
})

router.post('/del',async(ctx,next)=>{
    if(ctx.isAuthenticated){
        let id = ctx.request.body.id
        let username = ctx.session.passport.user.username
        let res = await Cart.update({'username':username,'status':0},{$pull:{
            'goodlist':{
                'shopId':id
            }
        }})
        if(res){
            ctx.body = {
                code:0,
                msg:'删除成功'
            }
        }else{
            ctx.body = {
                code:-1,
                msg:'删除失败'
            }
        }
    }
})

router.post('/changeState',async(ctx,next)=>{
    if(ctx.isAuthenticated){
        let id = ctx.request.body.id
        let state = ctx.request.body.state
        let username = ctx.session.passport.user.username
        let res = await Cart.update({'username':username,'status':0,'goodlist.shopId':id},{'goodlist.$.state':state})
        if(res){
            ctx.body = {
                code:0,
                msg:'修改成功'
            }
        }else{
            ctx.body = {
                code:-1,
                msg:'修改失败'
            }
        }
    }
})

router.post('/commit',async(ctx,next)=>{
    if(ctx.isAuthenticated){
        let username = ctx.session.passport.user.username
        let total = ctx.request.body.total
        let count = ctx.request.body.count
        let res = await User.findOne({'username':username},'address');
        let address = res.address
        res = await Cart.findOne({'username':username,'status':0})
        res.total = total
        res.count = count
        res.address = address
        res.status = 1
        let data = await res.save()
        if(data){
            ctx.body = {
                code:0,
                msg:'创建订单成功'
            }
        }else{
            ctx.body = {
                code:-1,
                msg:'创建订单失败'
            }
        }
    }
    else{
        ctx.body = {
            code:-1,
            msg:'请先登录'
        }
    }
})

router.get('/order',async(ctx,next)=>{
    if(ctx.isAuthenticated){
        let username = ctx.session.passport.user.username
        let res = await Cart.findOne({'username':username,'status':1})
        if(res){
            ctx.body = {
                code:0,
                msg:res
            }
        }else{
            ctx.body = {
                code:-1,
                msg:'暂无订单'
            }
        }
    }else{
        ctx.body = {
            code:-1,
            msg:'请先登录'
        }
    }
})

module.exports = router