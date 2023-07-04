import mongoose from "mongoose";

const ListSchema = new mongoose.Schema({
    Name: {
        type: String
    }
}, {timeStamps: true, strict:true});

const ListModel = mongoose.model("List", ListSchema, "lists");

export default ListModel;