import dotenv from "dotenv";
import app from "./app";
import { connectDB } from "../src/config/db";

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}).catch((err) => {
  console.error("Erro ao conectar no banco:", err);
});
