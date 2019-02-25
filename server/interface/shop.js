const Router = require('koa-router')
const Shop = require('../dbs/models/shops')
const Passport = require('./utils/passport')
const axios = require('./utils/axios')

let router = new Router({
    prefix:'/shop'
})


router.get('/list',async(ctx,next)=>{
    // http://localhost:3000/shop/list?page=1&pageSize=8     //默认排序
    let page = parseInt(ctx.query.page)         //当前页码
    let pageSize = parseInt(ctx.query.pageSize)    //分页大小
    let sort = parseInt(ctx.query.sort)        //升序或者降序
    let skip = (page - 1)*pageSize    //需要从多少之后加载
    let param = {}    //相关查询参数
    let doc = await Shop.find(param).skip(skip).limit(pageSize)
    // shopModel.sort({'money':sort})    //是否按价格排序
        ctx.body = {
            code:0,
            msg:'',
            doc:doc
        }
})

router.get('/main',async(ctx,next)=>{
    let id = ctx.query.id
    let doc = await Shop.find({'shopId':id});
    if(doc){
        ctx.body = {
            code:0,
            data:doc
        }
    }else{
        ctx.body = {
            code:-1,
            data:"未取得数据"
        }
    }
})

module.exports = router