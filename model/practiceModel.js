const mongoose = require("mongoose")

const practiceSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    repeatPassword: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    Hobbies: { type: Array, required: true },
    gender: { type: String, required: true }
})

const PracticeModel = mongoose.model("PracticeModel", practiceSchema)

module.exports = PracticeModel;