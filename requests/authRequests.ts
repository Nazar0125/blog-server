import { Request, Response } from 'express'

import hash, { compareSync, hashSync } from 'bcrypt'
import {v4} from 'uuid';
import {db} from './../database/index'
import {access_token, refresh_token} from './../config/server.config.json';
import { authRequestTypes } from './types'
import { generateAccessToken, generateRefreshToken } from '../utils/generates';
import descriptionRequest from "./descriptionRequests";


class authRequest implements authRequestTypes {
    public async authorization(req:Request, res:Response):Promise<void> {
        const {login, password} = req.body;
        if (login && password) {
            try {
                const user: any = await db.query('SELECT users.id, login, name, surname, avatar, password FROM users WHERE login=($1)', [
                    login,
                ])
                 if (compareSync(password, user[0].password) && user) {
                    const accessToken = generateAccessToken(user[0].id, login);
                    const refreshToken = generateRefreshToken(user[0].refresh_id); 
                    res.status(200).json({
                        message: 'authorization ок', 
                        accessToken,
                        user
                    })
                } else {
                    res.status(400).json({message: 'не верны логин и парол'})
                }
            } catch (e) {
                res.status(400).json({message: 'не верны логин и парол'})
            }
        } else {
            res.status(400).json({message: 'нет данных'})
        }
    }
    public async registration(req:Request, res:Response):Promise<void> {
       const {login, password, name, surname} = req.body;
        if (login && password && name && surname) {
            const refreshId:string = v4();
            const hashPassword:string = hash.hashSync(password, 10)
            try {
                const user: any = await db.query('INSERT INTO users (login, password, refresh_id, name, surname) VALUES ($1,$2,$3,$4,$5) returning *', [
                    login,
                    hashPassword,
                    refreshId,
                    name,
                    surname
                ])

                const accessToken = generateAccessToken(user[0].id, login);
                const refreshToken = generateRefreshToken(user[0].refresh_id);
                res.status(200).json({
                    message: 'пользоветель добавлен', 
                    accessToken, 
                    refreshToken,
                    expiresIn: access_token.time
                })
                let id = user[0].id
                descriptionRequest.addDescription(id)
            } catch (e) {
                console.log(e)
                res.status(500).json({message: 'Ошибка сервера'})
            }
        } else {
            res.status(400).json({message: 'нет данных'})
        }           
    }
}

export default new authRequest()