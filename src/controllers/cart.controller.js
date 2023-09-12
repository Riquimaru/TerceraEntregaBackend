import dbCartManager from "../DAO/cart.DAO.js"

const cartService = new dbCartManager()

export const getCartById = async (req, res) =>{
    let cid = req.params.cid;
    let carts;
    try {
        carts = await cartService.getCartById(cid)
    } catch (error) {
        res.status(404).send({ status: "error", error })
    }

    res.send({ status: "success", payload: carts })
}

export const createCart = async (req, res) =>{
    let cart;
    try {
        cart = await cartService.createCart()
    } catch (error) {
        res.status(500).send({status: "error", error})
    }
    res.send({ status: "success", payload: cart })
}

export const updateCart = async (req, res) =>{
    let cid = req.params.cid;
    let prods = req.body.prods;
    let cart;

    try {
        cart = await cartService.addProdToCart(cid, prods)
    } catch (error) {
        res.status(500).send({status: "error", error})
    }
    res.send({ status: "success", payload: cart })
}

export const addProdCart = async (req, res) =>{
    let cid = req.params.cid
    let pid = req.params.pid
    let qty = req.body;
    let cart;

    try {
       cart = await cartService.addProdCartQty(cid, pid, qty)
    } catch (error) {
        res.status(500).send({status: "error", error})
    }
    res.send({ status: "success", payload: cart })
}

export const delCart = async (req, res) =>{
    let cid = req.params.cid;
    let cart;
    try {
        cart = await cartService.delCartProducts(cid)
    } catch (error) {
        res.status(500).send({status: "error", error})
    }
    res.send({status:"success", payload: cart})
}

export const delCartProds = async (req, res) =>{
    let cid = req.params.cid;
    let pid = req.params.pid
    let cart;
    try {
        cart = await cartService.delCartProduct(cid, pid)
    } catch (error) {
        res.status(500).send({status: "error", error})
    }
    res.send({status:"success", payload: cart})
}