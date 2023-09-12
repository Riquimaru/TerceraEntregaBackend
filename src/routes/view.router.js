import { Router } from 'express'
import dbProdManager from "../DAO/prod.DAO.js";
import dbCartManager from '../DAO/cart.DAO.js';
import dbChatManager from '../DAO/chat.DAO.js';


const viewRouter = Router();
const prodManager = new dbProdManager()
const chatManager = new dbChatManager();
const cartManager = new dbCartManager()

viewRouter.get('/chat', async (req, res) => {
    res.render('chat')
})


viewRouter.get('/carts/:cid', async (req, res) => {
    let cid = req.params.cid;
    let carts;
    carts = await cartManager.getCartById(cid)
    res.render('carts', { carts })
})


export default viewRouter;