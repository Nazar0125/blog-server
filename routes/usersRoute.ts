import express, { Router } from "express";
import confirmAccessToken from "../middlewares/confirmAccessToken";
import usersRequest from "./../requests/usersRequests";

const router:Router = express.Router()
    router.get('/items', usersRequest.getUserItems)
    router.get('/:id', usersRequest.getUserBy)
export default router