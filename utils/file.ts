import multer from "multer";

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "Images")
    },
    filename(req, file, cb) {
        console.log(file)
        console.log(file.originalname)
        cb(null, file.originalname)
    }
})

const typesImg = ['images/png', 'images/jpeg', 'images/jpg']

const fileFilter = (req:any, file:any, cb:any) => {
    if (typesImg.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

export = multer({
    storage, fileFilter
})