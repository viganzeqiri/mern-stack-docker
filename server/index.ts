import "dotenv/config";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";

const app: Express = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Express is runing...");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
