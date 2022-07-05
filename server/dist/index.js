"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoose = void 0;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.mongoose = mongoose_1.default;
const express_validator_1 = require("express-validator");
const collection_model_1 = require("./src/collection.model");
const port = process.env.PORT;
const DB_URL = process.env.DB_URL;
const DB_URL_LOCAL = process.env.DB_URL_LOCAL;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        yield mongoose_1.default.connect(DB_URL_LOCAL);
        app.use(body_parser_1.default.urlencoded({ extended: true }));
        app.use((0, cors_1.default)());
        app.use(body_parser_1.default.json());
        const maxSize = 100 * 1024 * 1024; // 100MB
        const storage = multer_1.default.diskStorage({
            destination: (_, __, cb) => {
                cb(null, "./images");
            },
            filename: (_, file, cb) => {
                cb(null, Date.now() + "--" + file.originalname);
            },
        });
        const upload = (0, multer_1.default)({ storage, limits: { fileSize: maxSize } });
        app.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const collections = yield collection_model_1.Collection.find();
            res.send(collections);
        }));
        app.post("/createCollection", (0, express_validator_1.body)("chain").isString(), (0, express_validator_1.body)("collectionName").isLength({ min: 5 }), (0, express_validator_1.body)("amount").custom((value) => value < 10000), (0, express_validator_1.body)("address").isEthereumAddress(), (0, express_validator_1.body)("description").isLength({ max: 220 }), upload.single("image"), (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const collection = new collection_model_1.Collection(Object.assign(Object.assign({}, req.body), { image: path_1.default.join("/", "images", Date.now() + "--" + ((_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname)) }));
            const result = yield collection.save();
            res.send(result);
        }));
        return app;
    });
}
main()
    .then((app) => {
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
    });
})
    .catch((err) => {
    console.log("Failed with error: ", err);
});
