import { Router } from "express";
import { roleUserMiddleware } from "../middlewares/roles.js";
import { getCartById, purchaseCart, createCart, updateCart, addProdCart, delCart, delCartProds } from "../controllers/cart.controller.js";

const cartRouter = Router()

cartRouter.get('/:cid', getCartById)

cartRouter.get('/:cid/purchase', purchaseCart)

cartRouter.post('/', createCart)

cartRouter.put('/:cid', updateCart)

cartRouter.post('/:cid/products/:pid', roleUserMiddleware, addProdCart)

cartRouter.delete('/:cid', delCart)

cartRouter.delete('/:cid/products/:pid', delCartProds)

export default cartRouter;