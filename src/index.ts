import express from "express";
import { config } from "dotenv";
import { router } from "./router";
import { db } from "./db/db";


config();

db.then(() => {
  console.log("Deu certo")

}).catch(err => {
  console.log("Erro ao conectar a base de dados!")
  
})

const app = express();
app.use(express.json());
app.use('/api', router);


app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${process.env.PORT}`)
})

