const express = require("express")
const bodyParser = require("body-parser")
const router = express.Router()
const upload = require("../middleware/upload")

const { createUser, getAllUser, updateMpUser, deleteUser } = require("../controller/userController")
const { createcategory, getAllCategory } = require("../controller/categorycontroller")
const { createProduct, getAllProduct, getPaginatedProducts, deleteProduct } = require("../controller/productcontroller")

// ---------------------------------TrialBases Code---------------------------------
const { updatedOneUser, updatedManyUser, getNewStateOfUser, getUsersByAge } = require("../controller/userController")
const { createPracticeUser, getPracticeUser } = require("../controller/practiceController")
// ---------------------------------TrialBases Code---------------------------------


// =====================user=====================
router.post("/create-user", createUser)
router.get("/get-users", getAllUser)
router.patch("/update-user", updateMpUser)
router.delete("/delete-user", deleteUser)
// =====================user=====================

// =====================cateogory=====================
router.post("/create-category", createcategory)
router.get("/get-category", getAllCategory)
// =====================cateogory=====================

// =====================product=====================
router.post("/create-product", upload.single("avatar"), createProduct)
router.get("/get-products", getAllProduct)
router.get("/get-paginatedProducts", getPaginatedProducts)
router.delete("/delete-product/:id", deleteProduct)
// =====================product=====================


// ---------------------------------TrialBases Code---------------------------------
router.patch("/updatedOne-user/:userId", updatedOneUser)
router.patch("/updatedMany-user", updatedManyUser)
router.get("/getNewState-users", getNewStateOfUser)
router.get("/getusersByAge", getUsersByAge)



router.post("/create-practice-user", createPracticeUser)
router.get("/get-practice-user", getPracticeUser)
// ---------------------------------TrialBases Code---------------------------------



module.exports = router