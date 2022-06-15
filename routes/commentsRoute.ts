import express, { Router } from "express";
import confirmAccessToken from "../middlewares/confirmAccessToken";
import commentsRequest from './../requests/commentsRequest'

const router:Router = express.Router()
    router.get('/', commentsRequest.getComments)
    router.post('/', commentsRequest.addComment)
    router.put('/', commentsRequest.updateComment)
    router.delete('/:id', commentsRequest.deleteComment)
export default router