const passport = require('koa-passport')
const LocalStrategy = require('passport-local')
const UserModel = require('../../dbs/models/users.js')

passport.use(new LocalStrategy(async function(username,password,done){
    let us = { username }
    let res = await UserModel.findOne(us)   //查询用户是否存在
    if(res != null){
        if(res.password === password){
            return done(null,res)
        }
        else{
            return done(null,false,'密码错误')
        }
    }
    else{
        return done(null,false,'用户不存在')
    }
}))

passport.serializeUser(function(user,done){
    // console.log('serializeUser: ', user)
    done(null,user)         //把用户数据存在session中
})

passport.deserializeUser(function(user,done){
    // console.log('deserializeUser: ', user)
    return done(null,user)    //从session中读取数据对象
})

module.exports = passport

