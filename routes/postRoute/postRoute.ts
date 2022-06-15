import express, { Router } from "express";
import confirmAccessToken from "../../middlewares/confirmAccessToken";
import postRequest from '../../requests/post/postRequests'

const router:Router = express.Router()
    router.get('/:id', postRequest.getByPost)
    router.get('/', postRequest.getPost)
    router.put('/', postRequest.updatePost)
    router.post('/', postRequest.addPost)
    router.delete('/:id', postRequest.deletePost)
export default router