const CategoryModel = require("../model/categorymodelMP")

const createcategory = (req, res) => {
  const product = req.body;
  const newProduct = new CategoryModel(product);
  try {
    newProduct.save();
    return res.status(200).json({
      message: "Product created successfuly",
      result: newProduct,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: err.message,
    });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const product = await CategoryModel.find({})
    return res.status(200).json({
      message: "Product fetched successfuly",
      result: product,

    })
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}
module.exports = { createcategory, getAllCategory }

