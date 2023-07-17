import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import usersRoute from "./routes/users.js";
import productsRoute from "./routes/products.js";
import listsRoute from "./routes/lists.js";
import login from "./routes/login.js";
import cors from "cors";

dotenv.config();

const PORT = 5050;

const server = express();

server.use(express.json());
server.use(cors())
server.use("/", usersRoute);
server.use("/", productsRoute);
server.use("/", listsRoute)
server.use("/", login)


mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Errore di connessione al DB'));
db.once('open', () => {
    console.log('DB connesso correttamente')
});

server.listen(PORT, () => console.log(`Server avviato sulla porta ${PORT}`))