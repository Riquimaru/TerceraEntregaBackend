import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const prodCollection = 'products'

const prodSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number, 
    thumbnail: String,
    status: Boolean,
    stock: Number
})

prodSchema.plugin(mongoosePaginate)

export const prodModel = mongoose.model(prodCollection, prodSchema);