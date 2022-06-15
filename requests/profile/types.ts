import { Request, Response } from "express";

export interface profileRequestTypes {
    updateAvatar(req:any, res:Response):void
}
