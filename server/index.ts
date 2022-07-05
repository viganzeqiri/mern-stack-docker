import "dotenv/config";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";
import path from "path";
import mongoose from "mongoose";
import { body, validationResult } from "express-validator";

import { FormStateTypes } from "./src/types";

import { Collection } from "./src/collection.model";

const port = process.env.PORT;
const DB_URL = process.env.DB_URL;
const DB_URL_LOCAL = process.env.DB_URL_LOCAL;

interface CustomRequest<T> extends Request {
  body: T;
}

async function main() {
  const app: Express = express();
  await mongoose.connect("mongodb://database:27017/admin", {
    useNewUrlParser: true,
  });

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());
  app.use(bodyParser.json());

  const maxSize = 100 * 1024 * 1024; // 100MB
  const storage = multer.diskStorage({
    destination: (_, __, cb) => {
      cb(null, "./images");
    },
    filename: (_, file, cb) => {
      cb(null, Date.now() + "--" + file.originalname);
    },
  });
  const upload = multer({ storage, limits: { fileSize: maxSize } });

  app.get("/", async (req, res) => {
    const collections = await Collection.find();
    res.send(collections);
  });

  app.post(
    "/createCollection",
    body("chain").isString(),
    body("collectionName").isLength({ min: 5 }),
    body("amount").custom((value) => value < 10000),
    body("address").isEthereumAddress(),
    body("description").isLength({ max: 220 }),
    upload.single("image"),
    async (req: CustomRequest<FormStateTypes>, res: Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const collection = new Collection({
        ...req.body,
        image: path.join(
          "/",
          "images",
          Date.now() + "--" + req.file?.originalname
        ),
      });

      const result = await collection.save();

      res.send(result);
    }
  );

  return app;
}

main()
  .then((app) => {
    app.listen(port, () => {
      console.log(
        `⚡️[server]: Server is running at https://localhost:${port}`
      );
    });
  })
  .catch((err) => {
    console.log("Failed with error: ", err);
  });

export { mongoose };
