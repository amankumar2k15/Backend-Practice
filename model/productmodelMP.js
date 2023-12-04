const mongoose = require('mongoose')

let productSchema = mongoose.Schema({
    product_name: {
        type: String,
        required: true,
        allowNull: true
    },
    product_price: {
        type: Number,
        required: true,
        allowNull: true
    },
    username: {
        type: String,
        required: true,
        allowNull: true
    },

    avatar: {
        type: String
    },

    created_at: {
        type: Date,
        default: Date()
    }
})

let ProductModelMP = mongoose.model("ProductModelMP", productSchema)
module.exports = ProductModelMP;