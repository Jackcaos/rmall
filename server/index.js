const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const session = require('koa-generic-session')
const json = require('koa-json')
const passport = require('./interface/utils/passport')
const users = require('./interface/users')
const shop = require('./interface/shop')
const cart = require('./interface/cart')

const app = new Koa()

app.keys = ['user']
app.proxy = true
app.use(session({key: 'user'}))

app.use(bodyParser({
  extendTypes:['json','form','text']
}))
app.use(json())

mongoose.connect('mongodb://127.0.0.1:27017/dbs',{
  useNewUrlParser:true
})

app.use(passport.initialize())
app.use(passport.session())

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }
  app.use(users.routes()).use(users.allowedMethods())
  app.use(shop.routes()).use(shop.allowedMethods())
  app.use(cart.routes()).use(cart.allowedMethods())
  app.use(ctx => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
