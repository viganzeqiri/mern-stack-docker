"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collection = void 0;
const mongoose_1 = require("mongoose");
const index_1 = require("../index");
const Collection = index_1.mongoose.model("Collection", new mongoose_1.Schema({
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
}));
exports.Collection = Collection;
