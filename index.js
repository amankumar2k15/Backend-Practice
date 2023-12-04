const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()
const user = require("./routes/user")


app.use(bodyParser.json({ extended: true, limit: "5mb" }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json({ extended: true, limit: "5mb" }))
app.use("/user", user)

app.use("/uploads", express.static("uploads"))

const DB_URL = "mongodb+srv://amankumar2k15:amankumar2662@clustor0.9bcinws.mongodb.net/?retryWrites=true&w=majority"
const PORT = 5000


// Connecting to Database:
mongoose.connect(DB_URL, ({ useNewUrlParser: true, useUnifiedTopology: true }))
    .then(() => {
        app.listen(PORT, function () {
            console.log(`Server is running on PORT ${PORT}`)
            console.log("Connected to Database")
        })
    }).catch((err) => console.log(err.message))

