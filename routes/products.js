import express from "express";
import ProductModel from "../models/products.js";
import {validationResult} from 'express-validator';
import { validateProduct } from '../middlewares/validators/validateProduct.js';
import authToken from "../middlewares/token/authToken.js";
import * as cheerio from 'cheerio';
import axios from 'axios';


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

router.get("/products/:listId", authToken, async (req, res) => {
  const {listId} = req.params;
  try {
      const products = await ProductModel.find({
        list: listId
      })
      res.status(200).send({
          message:"Operazione eseguita con successo",
          products})
      } catch (error) { 
          res.status(500).send("Errore interno del server")      
  }
})

router.post("/products/new/:listId", validateProduct, async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).send({
      message: 'body validation failed',
      errors: errors.array(),
      statusCode: 400
    });
  }
  const {listId} = req.params;
    const product = new ProductModel({
        url: req.body.url,
        img: req.body.img,
        title: req.body.title,
        list: listId
    })
    try {
      const newProduct = await product.save();
      res.status(200).send("Prodotto salvato con successo")  
    } catch (error) {
        res.status(500).send("Errore interno del server")
    }
})

router.get("/products/scraping/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findById(id);
    if (!product){
      return res.status(404).send({message: "Product not found", statusCode: 404})
    } 
    const url = product.url;
    if (url === ""){
      return res.status(404).send({message:"Url not found", statusCode: 404});
    }
    axios(url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const articles = []

            $('div').each(function () { //<-- cannot be a function expression
                const url = $(this).find('img').attr('src')
                articles.push({
                    url
                })
            })
            res.json(articles)
      }).catch(err => console.log(err))
  } catch (error) {
    res.status(500).send({message:"errore interno del server", statusCode:500})
  }
})

/* router.patch("/products/:id", validateProduct, async (req, res) => {
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
}); */

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
