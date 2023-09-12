import { cartModel } from "../DAO/models/cart.model.js";
import { getProductsById } from "../DAO/prod.DAO.js"
import TicketManager from "./ticket.DAO.js";

const ticketService = new TicketManager()

class dbCartManager {
    constructor() {
        this.model = cartModel;
    }

    async getCartById(id) {
        let cart;
        try {
            cart = await this.model.findOne({ _id: id }).lean()
        } catch (error) {
            console.log(error)
        }
        console.log(cart)
        return cart;
    }


    async createCart() {
        let cart;
        try {
            cart = await this.model.create({
            })
        } catch (error) {
            console.log(error)
        }
        return cart;
    }

    async addProdToCart(id, prod) {
        let cartid;
        try {
            cartid = await this.model.findOne({ _id: id })
            if (cartid) {
                cartid.products.push({ product: prod })
                cartid.products.quantity++;
                let upd = await this.model.updateOne({ _id: id }, cartid)
                let cartup = await this.model.find({ _id: id }).populate('products.product')
                console.log(cartup)
                return cartup;
            }
        } catch (error) {
            console.log(error)
        }
    }

    async addProdCart(id, prod) {
        let cart;
        try {
            cart = await this.model.updateOne({ _id: id }, { set: { products: prod } })
        } catch (error) {
            console.log(error)
        }
        return cart
    }

    async addProdCartQty(id, pid, qty) {
        let cart;
        try {
            cart = await this.model.updateOne({ _id: id }, { $set: { products: pid } }, { quantity: qty })
        } catch (error) {
            console.log(error)
        }
        try {

        } catch (error) {

        }
    }

    async purchaseCartController(cid) {
        try {
            const cart = await getCartById(cid)
            const totalProductsInCart = cart.products.length;
            let totalAmount
            for (let i = 0; i < totalProductsInCart; i++) {
                const IdProd = cart.products[i]._id;
                const stock = cart.products[i].stock;

                const prod = await getProductsById(IdProd);

                if (prod.stock < stock) {
                    return ("No hay stock del producto: " + IdProd)
                } else {
                    const prodStock = prod.stock - stock;
                    const result = await updateProductStock(IdProd, prodStock);
                    totalAmount += prod.price;
                }
            }

            const dateCode = new Date();

            function getRandomInt(max) {
                return Math.floor(Math.random() * max);
            };

            const codeTicket = getRandomInt(1000000)

            const newTicket = {
                code: codeTicket,
                purchase_datetime: dateCode,
                amount: totalAmount,
                purchaser: "",
            };
            const ticketCreation = await ticketService.addTicket(newTicket);
        } catch (error) {
            console.log(error)
        }
        return
    };

    async delCartProducts(id) {
        let cart;
        let totalprod;
        try {
            cart = await this.model.findOne({ _id: id })
            totalprod = cart.products.length;
            cart.products.splice(0, totalprod)
            let upd = await this.model.updateOne({ _id: id }, cart)
        } catch (error) {
            console.log(error)
        }
        return cart;
    }

    async delCartProduct(id, prod) {
        let cart;
        let prodfound;
        try {
            cart = await this.model.findOne({ _id: id })
            prodfound = cart.products.indexOf(prod)
            if (prodfound) {
                cart.products.splice(prodfound, 1)
            }
            let upd = await this.model.updateOne({ _id: id }, cart)
        } catch (error) {
            console.log(error)
        }
        console.log(cart)
        return cart;
    }

}

export default dbCartManager;