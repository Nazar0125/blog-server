import express, { Router } from "express";
import multer from "multer";
import path from 'path'
import serverConfig from './../config/server.config.json';

let img:any = null;
let showNow:any = null;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Images");
    },
    filename: (req, file, cb) => {
        let name = Date.now() + path.extname(file.originalname);
        showNow = req.protocol + '://' + serverConfig.host + ':' + serverConfig.port + '/' + 'images/' + name;
        img = `images/${name}`
        cb(null, name)
    },
});

const typesImg = ['images/png', 'images/jpeg', 'images/jpg']

const fileFilter = (req:any, file:any, cb:any) => {
    if (typesImg.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({storage: storage})

const router:Router = express.Router()
    router.post('/', upload.single('img'),(req, res) => {
        res.status(200).json({
            saveBase: img,
            showNow
       })
    });
export default router;


/*
import express, { Router } from "express";
import multer from "multer";
import fillMiddleware from "../utils/file";
import uploadRequest from "./../requests/uploadRequests";

const router:Router = express.Router()
    router.post('/', fillMiddleware.single('img'), uploadRequest.upload);
export default router

*/