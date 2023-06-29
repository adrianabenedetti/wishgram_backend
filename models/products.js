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
        type: String
    }
});
 
const ProductModel = mongoose.model("Products", ProductSchema, "products");

export default ProductModel;