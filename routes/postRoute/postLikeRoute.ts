import express, { Router } from "express";
import confirmAccessToken from "../../middlewares/confirmAccessToken";
import postLikeRequest from '../../requests/post/postLike'

const router:Router = express.Router()
    router.get('/', postLikeRequest.getLike)
    router.post('/', postLikeRequest.addLike)
    router.delete('/', postLikeRequest.deleteLike)

export default router