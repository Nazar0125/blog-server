import express, { Router } from "express";
import confirmAccessToken from "../middlewares/confirmAccessToken";
import descriptionRequest from "../requests/descriptionRequests";

const router:Router = express.Router()
    router.get('/:id', confirmAccessToken, descriptionRequest.getDescription)
    router.put('/', confirmAccessToken, descriptionRequest.updateDescription)
    router.post('/', confirmAccessToken, descriptionRequest.addDescription)
export default router