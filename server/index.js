import cors from "cors";
import path from 'path';
import express from "express";
import {connectDb} from "./config";
import bodyParser from "body-parser";
import AppRoutes from "./routes/index";

connectDb();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(__dirname + "/pages"));

AppRoutes(app);
app.get("/", async (req, res) => {
  res.send(
    "Ok server working..  <br> <a href='/api/v1/example'>Click for test routes..</a>"
  );
});

app.get("/activation", async (req, res) => {
  res.sendFile(path.join(__dirname,"pages", "ActivationPage","activation.html"));
});

app.listen(PORT, () => {
  console.log("Server has benn started at http://localhost:"+PORT);
});
