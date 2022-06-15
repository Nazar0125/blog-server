import { Request, Response } from "express";

export interface postRequestTypes {
    getByPost(req:any, res:Response):void
    getPost(req:any, res:Response):void
    updatePost(req:any, res:Response):void
    addPost(req:any, res:Response):void
    deletePost(req:any, res:Response):void
}

export interface postLikeRequestTypes {
    getLike(req:any, res:Response):void
    addLike(req:any, res:Response):void
    deleteLike(req:any, res:Response):void
}

export interface postNotLikeRequestTypes {
    getNotLike(req:any, res:Response):void
    addNotLike(req:any, res:Response):void
    deleteNotLike(req:any, res:Response):void
}