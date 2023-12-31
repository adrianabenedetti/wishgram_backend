import express from "express";
import ListModel from "../models/lists.js";
import { validationResult } from 'express-validator';
import { validateList } from '../middlewares/validators/validateList.js';
import authToken from "../middlewares/token/authToken.js";

const router = express.Router();

router.get("/lists", async (req,res) => {
    try {
        const lists = await ListModel.find()
        res.status(200).send({
            message: "Operazione seguita con successo",
            lists
        })
    } catch (error) {
        res.status(500).send("Errore interno del server")
    }
})

router.get("/lists/:id", async (req,res) => {
    const {id} = req.params;
    try {
        const lists = await ListModel.findById(id)
        .populate('products');
        res.status(200).send({
            message: "Operazione seguita con successo",
            lists
        })
    } catch (error) {
        res.status(500).send("Errore interno del server")
    }
})

router.get("/lists/byUserId/:userId", async (req,res) => {
    const { userId } = req.params;
    const { page = 1, pageSize = 10} = req.query;
    try {
        const lists = await ListModel.find({
            user: userId 
        })
        .limit(pageSize)
        .skip((page - 1) * pageSize)
        .populate('products')

        const resCount = await ListModel.count();
        res.status(200).send({
            count: resCount,
            currentPage: Number(page),
            totalPages: Math.ceil(resCount / Number(pageSize)),
            message: "Operazione seguita con successo",
            statusCode: 200,
            lists
        })
    } catch (error) {
        res.status(500).send("Errore interno del server")
    }
})


router.post("/lists/new/:userId", validateList, async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).send({
        message: 'body validation failed',
        errors: errors.array(),
        statusCode: 400
    });
  }  
  const { userId } = req.params;
  const list = new ListModel({
    title: req.body.title,
    user: userId,
  });
  try {
    const newList = await list.save();
    res.status(200).send({message: "Lista creata con successo", statusCode:200});
  } catch (error) {
    res.status(500).send({message:"Errore interno del server", statusCode:500});
  }
});

router.patch("/lists/:id", validateList, async (req, res) => {
    const {id} = req.params;
    const listExist = await ListModel.findById(id);
    if (!listExist) {
        return res.status(404).send("Lista non trovata");
    }
    try {
        const listId = id;
        const dataUpdated = req.body;
        const options = {new: true};
        const result = await ListModel.findByIdAndUpdate(
            listId,
            dataUpdated,
            options
        );
        res.status(200).send({
            message: "Lista modificata con successo",
            result
        })
    } catch (error) {
        res.status(500).send("Errore interno del server")
    }
});

router.delete("/lists/delete/:id", async (req,res) => {
    const { id } = req.params;
    try {
        const listExist = await ListModel.findByIdAndDelete(id);
        if(!listExist){
            return res.status(404).send({message:"Lista non trovata", statusCode: 404});
        }
        res.status(200).send({message:`Lista con id ${id} rimossa dal Database`, statusCode: 200})
    } catch (error) {
        res.status(500).send({message:"Errore interno del server", statusCode: 500})
    }
});

export default router;