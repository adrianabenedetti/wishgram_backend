import { Router } from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/users.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const login = Router();

login.post("/login", async (req, res) => {
    const user = await UserModel.findOne({
        email: req.body.email
    });
    if(!user){
        return res.status(404).send({
            message: "User not found. Sign in first",
            statusCode: 404
        });
    }
    const password = await bcrypt.compare(req.body.password, user.password);
    if(!password){
        return res.status(400).send({
            message: "Wrong credentials",
            statusCode: 400
        })
        } 
        const accessToken = jwt.sign({
            email:user.email,
            userName:user.userName,
            id: user._id,
        }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "24h"})
        res.header('authorization', accessToken).status(200).send({
            message: "User has successfully logged in",
            statusCode:200,
            accessToken
        } );
    });

    export default login;