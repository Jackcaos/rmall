const Router = require('koa-router')
const User = require('../dbs/models/users')
const Passport = require('./utils/passport')
const axios = require('./utils/axios')

let router = new Router({
    prefix:'/users'
})

//注册逻辑
router.post('/signup',async (ctx)=>{
    const username = ctx.request.body.username
    const password = ctx.request.body.password
    const address = ctx.request.body.address
    const phone = ctx.request.body.phone

    let user = await User.find({
        username
    })
    if(user.length){
        ctx.body = {
            code:-1,
            msg:'该用户名已存在'
        }
        return
    }

    let users = await User.create({
        username,
        password,
        address,
        phone
    })

    if(users){
        let res = await axios.post('/users/signin',{
            username,
            password
        })
        if(res.data && res.data.code === 0){
            ctx.body = {
                code:0,
                msg:'注册成功',
                user: res.data.user
            }
        }else{
            ctx.body = {
                code:-1,
                msg:'注册失败',
            }
        }
    }else{
        {
            ctx.body = {
                code:-1,
                msg:'注册失败',
            }
        }
    }
})

//登录
router.post('/signin', async (ctx, next) => {
    return Passport.authenticate('local', function(err, user, info, status) {
      if (err) {
        ctx.body = {
          code: -1,
          msg: err
        }
      } else {
        if (user) {
          ctx.body = {
            code: 0,
            msg: '登录成功',
            user
          }
          return ctx.login(user)
        } else {
          ctx.body = {
            code: 1,
            msg: info
          }
        }
      }
    })(ctx, next)
  })

router.get('/exit',async (ctx,next)=>{
  await ctx.logout()
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0
    }
  } else {
    ctx.body = {
      code: -1
    }
  }
})

router.get('/getUser', async (ctx) => {
    if (ctx.isAuthenticated()) {
      const username = ctx.session.passport.user.username
      ctx.body={
        code:0,
        username:username,
      }
    }else{
      ctx.body={
        code:-1,
        username:'',
      }
    }
  })

module.exports = router