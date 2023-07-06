import express from "express";
import ProductModel from "../models/products.js";

const router = express.Router();

router.get("/products", async (req, res) => {
    try {
        const products = await ProductModel.find()
        res.status(200).send({
            message:"Operazione eseguita con successo",
            products})
        } catch (error) { 
            res.status(500).send("Errore interno del server")      
    }
})

router.get("/products/:listId", async (req, res) => {
  const {listId} = req.params;
  try {
      const products = await ProductModel.find({
        List: listId
      })
      res.status(200).send({
          message:"Operazione eseguita con successo",
          products})
      } catch (error) { 
          res.status(500).send("Errore interno del server")      
  }
})

router.post("/products/new/:listId", async (req, res) => {
  const {listId} = req.params;
    const product = new ProductModel({
        title: req.body.title,
        img: req.body.img,
        description: req.body.description,
        list: listId
    })
    try {
      const newProduct = await product.save();
      res.status(200).send("Prodotto salvato con successo")  
    } catch (error) {
        res.status(500).send("Errore interno del server")
    }
})

router.patch("/products/:id", async (req, res) => {
  const { id } = req.params;
  const productExist = await ProductModel.findById(id);
  if (!productExist) {
    return res.status(404).send("Prodotto non trovato");
  }

  try {
    const productId = id;
    const dataUpdated = req.body;
    const options = { new: true };
    const result = await ProductModel.findByIdAndUpdate(
      productId,
      dataUpdated,
      options
    );
    res.status(200).send({
      message: "Prodotto modificato con successo",
      statusCode: 200,
      result
    });
  } catch (error) {
    res.status(500).send("Errore interno del server");
  }
});

router.delete("/products/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const productExist = await ProductModel.findByIdAndDelete(id);
    if (!productExist) {
      return res.status(404).send("Prodotto non trovato");
    }
    res.status(200).send(`Post con id ${id} rimosso dal Database`);
  } catch (error) {
    res.status(500).send("Errore interno del server");
  }
});

export default router;
