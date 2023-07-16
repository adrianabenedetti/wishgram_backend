import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: false
    },
    list: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "List"
    }
});
 
const ProductModel = mongoose.model("Products", ProductSchema, "products");

export default ProductModel;