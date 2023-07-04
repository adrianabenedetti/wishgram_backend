import express from "express";
import ListModel from "../models/lists.js";

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

router.post("/lists/new", async (req, res) => {
  const list = new ListModel({
    name: req.body.name,
  });
  try {
    const newList = await list.save();
    res.status(200).send("Lista creata con successo");
  } catch (error) {
    res.status(500).send("Errore interno del server");
  }
});

router.patch("/lists/:id", async (req, res) => {
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
            return res.status(404).send("Lista non trovata");
        }
        res.status(200).send(`Lista con id ${id} rimossa dal Database`)
    } catch (error) {
        res.status(500).send("Errore interno del server")
    }
});

export default router;