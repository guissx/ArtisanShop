import express, { Application } from "express";
import cors from "cors";
import UsersRoutes from "../src/routes/auth/UsersRoutes";
import AuthRoutes from "../src/routes/auth/AuthRoutes";
import ProductRoutes from "../src/routes/ProductRoutes";
import UserArtisanRoutes from "../src/routes/auth/UsersArtisanRoutes";
import OrderRoutes from "../src/routes/OrderRoutes";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/artisans", UserArtisanRoutes);
app.use("/users", UsersRoutes);
app.use("/auth", AuthRoutes);
app.use("/products", ProductRoutes);
app.use("/newOrder", OrderRoutes);

export default app;
