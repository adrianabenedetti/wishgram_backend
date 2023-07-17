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
        max: 30,
        unique: [true, 'Username already in use']
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'email already registered'],
        lowercase: true
    },
    password: {
        type: String,
        require: true,
        max: 30
    },
    confirmPassword: {
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