"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination(req, file, cb) {
        cb(null, "Images");
    },
    filename(req, file, cb) {
        console.log(file);
        console.log(file.originalname);
        cb(null, file.originalname);
    }
});
const typesImg = ['images/png', 'images/jpeg', 'images/jpg'];
const fileFilter = (req, file, cb) => {
    if (typesImg.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
module.exports = (0, multer_1.default)({
    storage, fileFilter
});
