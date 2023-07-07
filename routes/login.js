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
        } else { //da cambiare con jwt
            console.log("login effetuato")
            return res.status(200).send({
                message: "🥳",
                statusCode: 200
            })
        }
    })

    export default login;