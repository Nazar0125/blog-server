import { Request, Response } from "express";

export interface authRequestTypes {
    authorization(req:Request, res:Response):void
    registration(req:Request, res:Response):void
}

export interface descriptionRequestTypes {
    getDescription(req:any, res:Response):void
    updateDescription(req:any, res:Response):void
    addDescription(req:any, res:Response):void
}

export interface uploadRequestTypes {
    upload(req:any, res:Response):void
}

export interface commentsRequestTypes {
    getComments(req:any, res:Response):void
    addComment(req:any, res:Response):void
    updateComment(req:any, res:Response):void
    deleteComment(req:any, res:Response):void
}

export interface lastRequestTypes {
    getLast(req:any, res:Response):void
}

export interface usersRequestTypes {
    getUserBy(req:any, res:Response):void
    getUserItems(req:any, res:Response):void
}