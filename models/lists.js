import mongoose from "mongoose";

const ListSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    products: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Products"
}]

}, {timeStamps: true, strict: true});

const ListModel = mongoose.model("List", ListSchema, "lists");

export default ListModel;