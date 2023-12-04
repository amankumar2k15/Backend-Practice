const PracticeModel = require('../model/practiceModel')

const createPracticeUser = async (req, res) => {
    const user = req.body
    const newUser = new PracticeModel(user)

    try {
        // const insertManyUser = await PracticeModel.insertMany(user)
        await newUser.save();
        return res.status(201).json({
            message: "User created successfully",
            // result: insertManyUser
            result: newUser
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

const getPracticeUser = async (req, res) => {
    try {
        // const result = await PracticeModel.find({})
        // 1st Answer 
        // const result = await PracticeModel.aggregate([
        //     {
        //         $group: {
        //             _id: "$gender",
        //             count: { $sum: 1 }
        //         },
        //     }
        // ])

        // 2nd Answer
        // { "Male": { "username": "user45", "age": 39 }, "Female": { "username": "user46", "age": 39 } }
        // const result = await PracticeModel.aggregate([
        //     {
        //         $group: {
        //             _id: "$gender",
        //             maxAge: { $max: "$age" },
        //             users: {
        //                 $push: {
        //                     username: "$username",
        //                     age: "$age"
        //                 }
        //             }
        //         }
        //     },
        //     {
        //         $project: {
        //             _id: 0,
        //             gender: "$_id",
        //             user: {
        //                 $filter: {
        //                     input: "$users",
        //                     as: "user",
        //                     cond: { $eq: ["$$user.age", "$maxAge"] }   //equal  
        //                 }
        //             }
        //         }
        //     }
        // ]);

        // 3.Answer 
        const result = await PracticeModel.aggregate([
            { $unwind: "$Hobbies" },
            {
                $group: {
                    _id: "$age",
                    getHobbies: { $push: "$Hobbies" }
                }
            }
        ])


        return res.status(200).json({
            message: "User fetched successfully",
            result: result
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

module.exports = { createPracticeUser, getPracticeUser }