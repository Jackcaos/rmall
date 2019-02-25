const axios = require('axios')

const instance = axios.create({
    baseURL:`http://${process.env.HOST||'localhost'}:${process.env.PORT||3000}`,
})

module.exports = instance