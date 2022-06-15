import {NextFunction, Request, Response} from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { db } from "../database";
import {refresh_token} from './../config/server.config.json'

export default async function confirmRefreshToken(refreshToken:string): Promise<any> {
    try {
        const payload:any = await jwt.verify(refreshToken, refresh_token.secret_key)
        
        const user:any[] = await db.query('SELECT * FROM users WHERE refresh_id=$1', [
            (payload as any).id
        ])
        return user[0]
        
    } catch(e) {
        throw Error('токен не валидный')
    } 
}