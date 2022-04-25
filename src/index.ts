import express from "express";
import dotenv from "dotenv";
import { restaurantsRouter } from "./routers/Restaurants.route";
import morgan from "morgan";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());
// app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("Hello You out there!");
});

app.use("/api/restaurants", restaurantsRouter);

app.listen(PORT, () => console.log("listening on port ", PORT));
