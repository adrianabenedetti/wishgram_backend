import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    list: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "List"
    }
});
 
const ProductModel = mongoose.model("Products", ProductSchema, "products");

export default ProductModel;