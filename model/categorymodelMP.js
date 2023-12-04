const mongoose = require('mongoose')
let categorySchema = mongoose.Schema({

    category_name: {
        type: String,
        required: true,
        allowNull: true
    },
    category_price: {
        type: String,
        required: true, 
        allowNull: true
    },

    created_at: {
        type: Date,
        default: Date.now()
    }

})

let CategoryModel = mongoose.model("CategoryModel", categorySchema)
module.exports = CategoryModel;