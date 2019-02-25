const mongoose = require('mongoose')
const Schema = mongoose.Schema
const cartSchema = mongoose.Schema({
    cartNo:{
        type:Number,
        require:true,
        unique:true
    },
    username:{
        type:String,
        require:true
    },
    goodlist:{
        type:Array,
        require:true
    },
    time:{
        type:String,
        require:true
    },
    status:{
        type:Number,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    total:{
        type:Number,
        require:true
    },
    count:{
        type:Number,
        require:true
    }
})

const Cart = mongoose.model('Cart',cartSchema)
module.exports = Cart