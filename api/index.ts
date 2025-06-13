import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "../src/config/db";
import UsersRoutes from "../src/routes/auth/UsersRoutes";
import AuthRoutes from "../src/routes/auth/AuthRoutes";
import ProductRoutes from "../src/routes/ProductRoutes"
import UserArtisanRoutes from '../src/routes/auth/UsersArtisanRoutes'
import OrderRoutes from '../src/routes/OrderRoutes'

dotenv.config();
const app: Application = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/artisans",UserArtisanRoutes);
app.use("/users", UsersRoutes);
app.use("/auth", AuthRoutes);
app.use("/products", ProductRoutes);
app.use("/newOrder", OrderRoutes)

app.listen(process.env.PORT);
