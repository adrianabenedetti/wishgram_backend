import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: {
        type: String
    },
    img: {
        type: String
    },
    description: {
        type: String
    },
    list: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "List"
    }
});
 
const ProductModel = mongoose.model("Products", ProductSchema, "products");

export default ProductModel;