import express from "express";
import ProductModel from "../models/products.js";

const router = express.Router();

router.get("/products", async (req, res) => {
    try {
        const products = await ProductModel.find()
        res.status(200).send("Operazione eseguita con successo")
        } catch (error) { 
            res.status(500).send("Errore interno del server")      
    }
})

router.post("/products/new", async (req, res) => {
    const product = new ProductModel({
        title: req.body.title,
        img: req.body.img,
        description: req.body.description,
        list: req.body.list
    })
    try {
      const newProduct = await product.save();
      res.status(200).send("Prodotto salvato con successo")  
    } catch (error) {
        res.status(500).send("Errore interno del server")
    }
})

//DA FARE DELETE E PATCH

export default router;
