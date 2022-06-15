import express, { Router } from "express";
import confirmAccessToken from "../../middlewares/confirmAccessToken";
import profileRequests from "./../../requests/profile/profileRequests";

const router:Router = express.Router()
    router.put('/avatar', profileRequests.updateAvatar)
    
export default router