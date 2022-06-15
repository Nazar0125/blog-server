import express, { Router } from "express";
import confirmAccessToken from "../../middlewares/confirmAccessToken";
import postNotLikeRequest from '../../requests/post/postNotLike'

const router:Router = express.Router()
    router.get('/', postNotLikeRequest.getNotLike)
    router.post('/', postNotLikeRequest.addNotLike)
    router.delete('/', postNotLikeRequest.deleteNotLike)
    
export default router