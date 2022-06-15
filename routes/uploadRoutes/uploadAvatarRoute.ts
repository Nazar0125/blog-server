import express, { Router } from "express";
import multer from "multer";
import path from 'path'
import serverConfig from './../../config/server.config.json';

let img:any = null;
let showNow:any = null;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Images/avatar");
    },
    filename: (req, file, cb) => {
        let name = Date.now() + path.extname(file.originalname);
        showNow = req.protocol + '://' + serverConfig.host + ':' + serverConfig.port + '/' + 'images/avatar/' + name;
        img = `images/avatar/${name}`
        cb(null, name)
    },
});

const upload = multer({storage: storage})

const router:Router = express.Router()
    router.post('/', upload.single('img'),(req, res) => {
        res.status(200).json({
            saveBase: img,
            showNow
        })
    });
export default router;