import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    title: {
        type: String
    },
    list: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "List"
    }
});
 
const ProductModel = mongoose.model("Products", ProductSchema, "products");

export default ProductModel;