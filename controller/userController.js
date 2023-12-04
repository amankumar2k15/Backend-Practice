const UserModelMP = require("../model/userModelMP")
const bcrypt = require("bcrypt")
require("dotenv").config()

const createUser = async (req, res) => {
    const user = req.body
    const salt = bcrypt.genSaltSync(10)
    const hash1 = await bcrypt.hash(user.password, salt)
    const hash2 = await bcrypt.hash(user.repeatPassword, salt)
    user.password = hash1;
    user.repeatPassword = hash2;

    const newUser = new UserModelMP(user)
    console.log(newUser)


    try {
        const emailExist = UserModelMP.findOne({
            email: user.email
        })

        if (emailExist) {
            return res.status(400).json({
                message: "Email already exist, please try again"
            })
        }

        await newUser.save()
        return res.status(201).json({
            message: "User successfully registered",
            result: newUser
        })


    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: err.message
        })

    }
}

const getAllUser = async (req, res) => {
    // const { age } = req.query      
    try {
        // const user = await UserModelMP.findOne({ age: age })  //this API find the first parameter of age and get back with result
        // const user = await UserModelMP.find({ age: age })  // this query find all the same age query parameter with age and get back to result
        const user = await UserModelMP.find({})
        if (!user) {
            return res.status(400).json({
                message: "User not found"
            })
        }
        return res.status(200).json({
            message: "User fetched successfully",
            result: user,
            count: user.length
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

const updateMpUser = async (req, res) => {
    const updatedUser = req.body
    const id = req.params.id

    try {
        if (updatedUser.password !== "" && updatedUser.repeatPassword !== "") {
            const salt = bcrypt.genSaltSync(SALT_ROUND)
            const hash1 = bcrypt.hashSync(updatedUser.password, salt)
            const hash2 = bcrypt.hashSync(updatedUser.repeatPassword, salt)
            updatedUser.password = hash1
            updatedUser.repeatPassword = hash2
        }

        if (updatedUser.password !== updatedUser.repeatPassword) {
            return res.status({
                message: "Password does not match"
            })
        }

        const findUser = await UserModelMP.findOne({
            _id: id
        })
        if (!findUser) {
            return res.status(400).json({
                message: "User doesn't exist"
            })
        }

        const test = await UserModelMP.findByIdAndUpdate(id, updatedUser, { new: true })

        return res.status(200).json({
            message: "User updated successfully",
            result: test
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

const deleteUser = async (req, res) => {
    const id = req.params.id

    try {
        const user = await UserModelMP.findByIdAndDelete({
            _id: id
        })

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            })
        }
        return res.status(200).json({
            message: "User deleted successfully"
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}



// ---------------------------------TrialBases Code---------------------------------
// 1.updateOne 
const updatedOneUser = async (req, res) => {
    const { newObject } = req.body;
    const { userId } = req.params

    try {
        const result = await UserModelMP.updateOne(
            { _id: userId },
            // { $set: { additionalObjects: newObject } }        //this field created an arran of object in my database
            // { $set: { newHobbies: newObject } }              // this is used to update already made newHobbies for this i have write this in postman -- {"newObject": ["Reading", "Swimming"]}
            { $set: { eliminated: newObject } }                //this field created an object in my database of single document
        )

        console.log("result==========>", result)
        if (result.modifiedCount === 1) {
            res.status(200).json({ message: "user updated successfully", result: result })
        } else {
            res.status(404).json({ message: "user does not found or data unchanged" })
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// 2. updateMany
const updatedManyUser = async (req, res) => {
    // const { newObject } = req.body;

    try {
        const result = await UserModelMP.updateMany(
            {}, // Update all documents
            { $push: { newHobbies: { $each: ["Dancing", "Cricket"] } } },    // $push and $set are working same here
            { $set: { newState: ["Orrisa", "Chattisgarh"] } }
        )
        // const result = await UserModelMP.updateMany({}, { $set: { hobbies: newObject } })
        //I can create the "hobbies" from here or i can create a "newObject" key from the frontend to change my data

        console.log("result==========>", result)
        if (result.modifiedCount > 0) {
            res.status(200).json({ message: "user updated successfully", result: result })
        } else {
            res.status(404).json({ message: "user does not found or data unchanged" })
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// 3.getUserBynewState
const getNewStateOfUser = async (req, res) => {
    // const { newHobbies } = req.query;
    // const { eliminated } = req.query;

    try {
        // const user = await UserModelMP.find({ newHobbies: { $in: [newHobbies] } });    //Runing Code // This query is finding the ""newHobbies"" ie. to my query
        // const user = await UserModelMP.find({ newState: { $in: [newState] } });     //Running Code   //This query is finding the ""newState"" ie. to my query
        const user = await UserModelMP.find({ "eliminated.Radha": true });     //Running Code   //This query is finding my "Radha" key whose value is "true" inside of ""eliminated"" key data  //  "eliminated.Radha" 

        // console.log("Database Query Result:", user);
        // const user = await UserModelMP.find({ username: "Aman Kumar" }).select('username')  //isse sirf username and id aa jati hai or kuch nhi aaata matched document ka 
        if (!user) {
            return res.status(400).json({
                message: "User not found"
            })
        }
        return res.status(200).json({
            message: "User fetched successfully",
            result: user,
            count: user.length
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

// 4.getUsersByAge
const getUsersByAge = async (req, res) => {
    const { age } = req.query
    try {
        // const user = await UserModelMP.findOne({ age: age })  //this API find the first parameter of age and get back with result
        const user = await UserModelMP.find({ age: age })  // this query find all the same age query parameter with age and get back to result
        if (!user) {
            return res.status(400).json({
                message: "User not found"
            })
        }
        return res.status(200).json({
            message: "User fetched successfully",
            result: user,
            count: user.length
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

// ---------------------------------TrialBases Code---------------------------------






module.exports = {
    createUser, getAllUser, updateMpUser, deleteUser,
    // ---------------------------------TrialBases Code---------------------------------
    updatedOneUser, updatedManyUser, getNewStateOfUser, getUsersByAge
    // ---------------------------------TrialBases Code---------------------------------
}