"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const server_config_json_1 = __importDefault(require("./../../config/server.config.json"));
let img = null;
let showNow = null;
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Images/avatar");
    },
    filename: (req, file, cb) => {
        let name = Date.now() + path_1.default.extname(file.originalname);
        showNow = req.protocol + '://' + server_config_json_1.default.host + ':' + server_config_json_1.default.port + '/' + 'images/avatar/' + name;
        img = `images/avatar/${name}`;
        cb(null, name);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
const router = express_1.default.Router();
router.post('/', upload.single('img'), (req, res) => {
    res.status(200).json({
        saveBase: img,
        showNow
    });
});
exports.default = router;
