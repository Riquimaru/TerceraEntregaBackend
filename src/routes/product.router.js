import { Router } from "express";
import { roleAdminMiddleware, roleUserMiddleware } from "../middlewares/roles.js";
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct, getProductsbyCategory } from "../controllers/products.controller.js";

const productRouter = Router()

productRouter.get('/all/:limit?/:page?',  getProducts)

productRouter.get('/category/:query?', getProductsbyCategory)

productRouter.get('/productid/:pid', getProductById)

productRouter.post('/', roleAdminMiddleware, createProduct)

productRouter.put('/productid/:pid', roleAdminMiddleware, updateProduct)

productRouter.delete('/productid/:pid', roleAdminMiddleware, deleteProduct)

export default productRouter;