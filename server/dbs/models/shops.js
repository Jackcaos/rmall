const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ShopSchema = new Schema({
    shopId:{
        type:Number,
        require:true,
        unique:true
    },
    src:{
        type:String,
        require:true,
    },
    title:{
        type:String,
        require:true,
    },
    money:{
        type:Number,
        require:true,
    },
    sale:{
        type:Number,
        require:true,
    },
    surplus:{
        type:Number,
        require:true,
    },
    category:{
        type:String,
        require:true,
    }
})

const Shop = mongoose.model('Shop',ShopSchema)
module.exports = Shop