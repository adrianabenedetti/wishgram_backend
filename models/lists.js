import mongoose from "mongoose";

const ListSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name: {
        type: String
    },
    products: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Products"
}]

}, {timeStamps: true, strict: true});

const ListModel = mongoose.model("List", ListSchema, "lists");

export default ListModel;