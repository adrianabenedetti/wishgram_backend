import express from "express";
import UserModel from "../models/users.js";
import { validationResult } from "express-validator";
import { usersValidation } from "../middlewares/validators/validateUsers.js";
import { validatePassword } from "../middlewares/validators/validatePassword.js";
import bcrypt, { genSalt } from "bcrypt";


const router = express.Router();

router.get("/users", async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send("Errore interno del server")
    }
})

router.get("/users", async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send("Errore interno del server")
    }
})

router.post("/users/new", [usersValidation, validatePassword], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).send({
            message: 'body validation failed',
            errors: errors.array(),
            statusCode: 400
        });
    }
    const password = req.body.password;
    const genSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, genSalt);
    const user = new UserModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        password: hashedPassword
    })
    try {
        const userExist = await UserModel.findOne({
            email: req.body.email
        });
        const userNameExist = await UserModel.findOne({
            userName: req.body.userName
        })
        if(userExist || userNameExist){
            return res.status(409).send({
                message: "Already registered user",
                statusCode: 409
            });
        }
        const newUser = await user.save();
        res.status(200).send({
            message: "Registration succeded"
        })
    } catch (error) {
        res.status(500).send({
            message: "Errore interno del server",
            error
        })
    }
})

router.delete("/users/delete/:id", async (req,res) => {
    const {id} = req.params;
    try {
        const userExist = await UserModel.findByIdAndDelete(id);
        if(!userExist){
            return res.status(404).send("Utente non trovato");
        } 
        res.status(200).send(`Utente con id ${id} rimosso dal Database`)
    } catch (error) {
        res.status(500).send("Errore interno del server")
    }
})
export default router;