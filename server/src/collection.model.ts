import { Schema } from "mongoose";
import { mongoose } from "../index";

const Collection = mongoose.model(
  "Collection",
  new Schema({
    image: {
      type: String,
      required: true,
    },
    chain: {
      type: String,
      required: true,
    },
    storage: {
      type: String,
      required: true,
    },
    collectionName: {
      type: String,
      required: true,
    },
    collectionSymbol: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  })
);

export { Collection };
