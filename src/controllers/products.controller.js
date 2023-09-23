import dbProdManager from '../DAO/prod.DAO.js'
import CustomError from "../services/CustomError.js";
import EErrors from "../services/enums.js";
import { generateProductErrorInfo } from "../services/info.js";

const prodService = new dbProdManager()

export const getProducts = async (req, res) => {
    const { lim, page } = req.params
    let result = await prodService.getProducts(lim, page)
    if (!result) return res.status(500).send({ status: "error", error: 'Error getting products' })
    res.send({ status: "success", result })
}

export const getProductsbyCategory = async (req, res) => {
    const { query, sort } = req.params
    let result = await prodService.getProductsByQuery(query)
    if (!result) return res.status(500).send({ status: "error", error: 'Error getting products' })
    res.send({ status: "success", result })
}

export const getProductById = async (req, res) => {
    const { pid } = req.params
    let result = await prodService.getProductsById(pid)
    if (!result) return res.status(500).send({ status: "error", error: 'Error getting products' })
    res.send({ status: "success", result })
}

export const createProduct = async (req, res) => {
    let { title, description, price, status, stock } = req.body;
    let prod;
    if (!title || !description || !price || !stock){
        CustomError.createError({
            name: "Product creation error",
            cause: generateProductErrorInfo({title, description, price, stock}),
            message: "Error trying to create Product",
            code: EErrors.INVALID_TYPES_ERROR
        })
    };
    try {
        prod = await prodService.newProducts(title, description, price, status, stock)
    } catch (error) {
        res.status(500).send({ status: "error", error })
    }
    res.send({ status: "success", payload: prod })
}

export const updateProduct = async (req, res) => {
    let { pid } = req.params;
    let { title, description, price, stock } = req.body;
    let prod;
    if (!title || !description || !price || !stock) return res.send({ status: "error", error: "Falta completar valores" });
    try {
        prod = await prodService.updProducts(pid, { title, description, price, stock })
    } catch (error) {
        res.status(500).send({ status: "error", error })
    }
    res.send({ status: "success", payload: prod })
}

export const deleteProduct = async (req, res) => {
    let { pid } = req.params;
    let prod;
    try {
        prod = await prodService.delProducts(pid)
    } catch (error) {
        res.status(500).send({ status: "error", error })
    }
    res.send({ status: "success", payload: prod })
}