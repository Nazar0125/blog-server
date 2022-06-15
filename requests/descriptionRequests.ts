import { Request, Response } from 'express'
import {db} from '../database/index'
import { descriptionRequestTypes } from './types';

class descriptionRequest implements descriptionRequestTypes {
    public async getDescription(req: any, res: Response): Promise<void> {
        if (req.params.id) {
            try {
                const data: any[] = await db.query(`SELECT * FROM description WHERE user_id=${req.params.id}`, [
                    req.user.id,
                ])
                res.status(200).json({
                    statusCode: 200,
                    content: data[0],
                })
            } catch (e) {
                res.status(500).json({message: "Ощибка сервера"})
            }
        } else {
            res.status(500).json({message: "Ощибка сервера"})
        }
    }
    public async updateDescription(req: any, res: Response): Promise<void> {        
        if (req.body.id && req.body.text) {
            try {
                let data = await db.query(`UPDATE description SET text='${req.body.text}' WHERE id=${req.body.id} returning *`)
                res.status(200).json({
                    statusCode: 200,
                    message: "Описания обнавлена",
                    content: data[0],
                })
            } catch(e) {
                console.log(e)
                res.status(500).json({message: "ошибка сервера"})
            }
        } else {
            res.status(400).json({message: "нет данных"})
        }
    }
    public async addDescription(id: number): Promise<void> {
        if (id) {
            let text = 'Hello World'
            let userid = id
            await db.query("INSERT INTO description (text, user_id) VALUES ($1, $2)", [
                text,
                userid,  
            ])
        }
    }
}

export default new descriptionRequest()