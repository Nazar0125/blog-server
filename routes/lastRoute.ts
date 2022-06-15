import express, { Router } from "express";
import confirmAccessToken from "../middlewares/confirmAccessToken";
import lastRequest from "../requests/lastRequest";

const router:Router = express.Router()
    router.get('/', lastRequest.getLast)
export default router