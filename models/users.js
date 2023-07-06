import mongoose from "mongoose"

const UsersSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        max: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        require: true,
        max: 30
    },
    lists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "List"
    }]
}, {timeStamps: true, strict:true});

const UserModel = mongoose.model("User", UsersSchema, "users");

export default UserModel;