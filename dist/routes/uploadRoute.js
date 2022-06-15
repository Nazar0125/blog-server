"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const server_config_json_1 = __importDefault(require("./../config/server.config.json"));
let img = null;
let showNow = null;
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Images");
    },
    filename: (req, file, cb) => {
        let name = Date.now() + path_1.default.extname(file.originalname);
        showNow = req.protocol + '://' + server_config_json_1.default.host + ':' + server_config_json_1.default.port + '/' + 'images/' + name;
        img = `images/${name}`;
        cb(null, name);
    },
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
const upload = (0, multer_1.default)({ storage: storage });
const router = express_1.default.Router();
router.post('/', upload.single('img'), (req, res) => {
    res.status(200).json({
        saveBase: img,
        showNow
    });
});
exports.default = router;
/*
import express, { Router } from "express";
import multer from "multer";
import fillMiddleware from "../utils/file";
import uploadRequest from "./../requests/uploadRequests";

const router:Router = express.Router()
    router.post('/', fillMiddleware.single('img'), uploadRequest.upload);
export default router

*/ 
