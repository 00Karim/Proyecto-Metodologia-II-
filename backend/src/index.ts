import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import tripRoutes from "./routes/tripRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
    res.send("Tripmate API funcionando")
});

app.use("/api/trips", tripRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server corriendo en http:://localhost:${PORT}`));

