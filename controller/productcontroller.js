const ProductModelMP = require('../model/productmodelMP');

const createProduct = (req, res) => {
    const product = req.body
    const newProduct = new ProductModelMP(product)
    try {
        if (!req.file) {
            return res.status(500).json({ message: "Error occured in requesting in file" })
        } else if (req.file) {
            newProduct.avatar = req.file.path
        }

        newProduct.save()
        return res.status(201).json({
            message: "product saved successfully",
            result: newProduct,
            count: newProduct.count
        })
    }
    catch (err) {
        return res.status(500).json({
            message: err.message,
        })

    }
}

const getAllProduct = async (req, res) => {

    try {
        const product = await ProductModelMP.find({})
        if (!product) return res.status(400).json({ message: "Products not found" })

        return res.status(200).json({ message: "Products fetched successfully", result: product })

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}


// GET PRODUCT --- PAGINATION
const getPaginatedProducts = async (req, res) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit) || 6;

    try {
        const all_products = await ProductModelMP.countDocuments({});

        const all_pages = Math.ceil(all_products / limit);
        const skip = (page - 1) * limit;

        const products = await ProductModelMP.find({})
            .skip(skip)
            .limit(limit);

        return res.status(200).json({
            message: "Products fetched successfully",
            page: page,
            all_pages: all_pages,
            result: products,
            total_products: all_products,
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}


const deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const findProduct = ProductModelMP.findOne({
            _id: id
        })
        if (!findProduct) {
            return res.status(400).json({ message: "Product not found" })
        }

        await ProductModelMP.findByIdAndDelete(id)
        return res.status(200).json({
            message: "Product Deleted Successfully"
        })

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports = { createProduct, getAllProduct, getPaginatedProducts, deleteProduct }