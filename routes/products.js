import express from "express";
import ProductModel from "../models/products.js";
import { validationResult } from "express-validator";
import { validateProduct } from "../middlewares/validators/validateProduct.js";
import authToken from "../middlewares/token/authToken.js";
import * as cheerio from "cheerio";
import axios from "axios";
import jwt from "jsonwebtoken";
import ListModel from "../models/lists.js";
import _ from 'lodash'
const router = express.Router();

router.get("/products", async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).send({
      message: "Operazione eseguita con successo",
      products,
    });
  } catch (error) {
    res.status(500).send("Errore interno del server");
  }
});

router.get("/products/:listId", authToken, async (req, res) => {
  const { listId } = req.params;
  try {
    const products = await ProductModel.find({
      list: listId,
    });
    res.status(200).send({
      message: "Operazione eseguita con successo",
      products,
    });
  } catch (error) {
    res.status(500).send("Errore interno del server");
  }
});

router.post("/products/new/:listId", validateProduct, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      message: "body validation failed",
      errors: errors.array(),
      statusCode: 400,
    });
  }
  const { listId } = req.params;
  const product = new ProductModel({
    url: req.body.url,
    img: req.body.img,
    title: req.body.title,
    list: listId,
  });
  try {
    const newProduct = await product.save();
    const updateDocument = {
      $push: { products: newProduct._id },
    };
    const option = {
      new: true,
    };
    await ListModel.findByIdAndUpdate(listId, updateDocument, option);
    res.status(200).send({message:"Prodotto salvato con successo", product:newProduct, statusCode:200});
  } catch (error) {
    res.status(500).send("Errore interno del server");
  }
});

//SCRAPER
router.get("/products/scraping/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findById(id);
    if (!product) {
      return res
        .status(404)
        .send({ message: "Product not found", statusCode: 404 });
    }
    const url = product.url;
    if (url === "") {
      return res
        .status(404)
        .send({ message: "Url not found", statusCode: 404 });
    }
    axios(url)
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        const articles = [];

        $('div').each(function () { //<-- cannot be a function expression
          const url = $(this).find('img').attr('src')
          articles.push({
              url
          })
      })
      const images = [];
      for (let index = 0; index < articles.length; index++) {
        const element = articles[index];
        if(element.url !== undefined){
          if(element.url.startsWith("http")){
          images.push(element.url)
          }
        } 
      }
      let result = []
      for( let image of images){
        let found = false;
        for( let element of result){
          if(image===element){
            found = true;
            break
          }
        }
        if(!found){
          result.push(image)
        }
      }
      console.log(result)
       res.status(200).send({statusCode:200, result});
      })
      .catch((err) => console.log(err));
  } catch (error) {
    res
      .status(500)
      .send({ message: "errore interno del server", statusCode: 500 });
  }
});

router.patch("/products/:id", validateProduct, async (req, res) => {
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
      return res.status(404).send({message:"Prodotto non trovato", statusCode: 404});
    }
    res.status(200).send({message:`Post con id ${id} rimosso dal Database`, statusCode: 200});
  } catch (error) {
    res.status(500).send({message: "Errore interno del server", statusCode:500});
  }
});

export default router;
