const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
    },
    price:{
        type:Number,
    },
    quantity:{
        type:Number,
    },
})
const cartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userModel',
    },
    items:[cartItemSchema],
},{timestamps:true})

module.exports = mongoose.model('Cart',cartSchema);