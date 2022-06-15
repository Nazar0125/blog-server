import { Request, Response } from 'express'
import {db} from '../database/index'
import { usersRequestTypes } from './types';

class usersRequest implements usersRequestTypes {
    public async getUserBy(req: any, res: Response): Promise<void> {
        if (req.params.id) {
            try {
                const data: any[] = await db.query(`SELECT users.id, users.avatar, users.name, users.surname FROM users WHERE id='${req.params.id}'`);
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
    public async getUserItems(req: any, res: Response): Promise<void> {
        console.log('test')
        try {
            const data: any[] = await db.query('SELECT * FROM users')
            res.status(200).json({
                statusCode: 200,
                content: data,
            })
        } catch (e) {
            res.status(500).json({message: "Ощибка сервера"})
        }
    }
}

export default new usersRequest()