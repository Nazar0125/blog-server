import { Request, Response } from 'express'
import {db} from '../database/index'
import { lastRequestTypes } from './types';

class lastRequest implements lastRequestTypes {
    public async getLast(req: any, res: Response): Promise<void> {
        try {
            const data: any[] = await db.query(`SELECT * FROM posts ORDER BY id DESC`)
            const comments: any[] = await db.query(`SELECT * FROM comments`);
            const users: any[] = await db.query(`SELECT id, avatar, name, surname FROM users`);
      
            let items = data.map((item, n) => {
                let m:any = []
                let admin: any = {}
                comments.forEach((comment) => {
                    if (item.id === comment.post_id) {
                        m.push({...comment})
                    } else {
                        m = []
                    }
                })

                users.forEach((user) => {
                    if (item.user_id === user.id) {
                        admin = {...user}
                    }
                })

                item.comments = m
                item.user = admin
                
                return {
                    ...item,
                }
            })
            
            res.status(200).json({
                statusCode: 200,
                content: items,
            })
        } catch (e) {
            console.log(e)
            res.status(500).json({message: "Ощибка сервера"})
        }
    }
}

export default new lastRequest()