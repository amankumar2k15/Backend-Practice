const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: { type: String, required: true, },
    email: { type: String, required: true, },
    password: { type: String, required: true, },
    repeatPassword: { type: String, required: true, },

    // ---------------------------------TrialBases Code---------------------------------
    additionalObjects: [{
        hasAdhaarCard: String,
        hasPanCard: Boolean,
    }],
    newHobbies: [{
        type: Array,
        default: [],
    }],
    state: [{
        type: Array,
        default: []
    }],
    newState: {
        type: Array,
        default: []
    },
    eliminated: {
        type: Object,
        default: {}
    },


    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
    // ---------------------------------TrialBases Code---------------------------------

})

const UserModelMP = mongoose.model("UserModelMP", userSchema)

module.exports = UserModelMP