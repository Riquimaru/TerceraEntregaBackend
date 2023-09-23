import { Router } from "express";
import { generateProducts } from "../mocks/products.mock.js";

const mockRouter = Router()

mockRouter.get('/', (req, res)=>{
    let products = generateProducts()
    res.send(products)
})

export default mockRouter;