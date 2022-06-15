import { Request, Response } from 'express'
import {db} from '../database/index'
import { commentsRequestTypes } from './types';

class commentsRequest implements commentsRequestTypes {
    public async getComments(req: any, res: Response): Promise<void> {
        try {
            const {post_id} = req.body;
            if (post_id) {
                const data: any[] = await db.query(`SELECT * FROM comments WHERE post_id='${post_id}'`)
                res.status(200).json({
                    message: "status code 200",
                    content: data,
                })
            }
        } catch (e) {
            res.status(500).json({message: "Ощибка сервера"})
        }
    }
    public async addComment(req: any, res: Response): Promise<void> {
        const {post_id, user_id, text} = req.body;
        if (post_id && user_id && text) {
            try {
                let date = new Date();
                let comment = await db.query(`INSERT INTO comments (post_id, user_id, text, date) VALUES ($1, $2, $3, $4) returning *`, [
                    post_id, user_id, text, date
                ])
                res.status(200).json({
                    statusCode: 200,
                    message: 'Комментари добавлена',
                    content: comment[0]
                })
            } catch(e) {
                res.status(500).json({message: "Ощибка сервера"})
            }
        } else {
            res.status(400).json({message: 'нет данных'})
        }   
    }
    public async updateComment(req: any, res: Response): Promise<void> {
        if (req.body.id && req.body.post_id && req.body.user_id && req.body.text) {
            try {
                let data = await db.query(`UPDATE comments SET 
                    post_id = '${req.body.post_id}',
                    user_id = '${req.body.user_id}',
                    text = '${req.body.text}'
                    WHERE id = '${req.body.id}' returning *`)
                console.log(res)
                res.status(200).json({
                    statusCode: 200,
                    content: data
                })
            } catch(e) {
                console.log(e)
                res.status(500).json({
                    message: "ошибка сервера",
                })
             }
         } else {
             res.status(400).json({message: "нет данных"})
        }
    }
    public async deleteComment(req: any, res: Response): Promise<void> {
        if (req.params.id) {
            try {
                let check = await db.query(`SELECT id FROM comments WHERE id='${req.params.id}'`)
                if (check[0]) {
                    let items = await db.query(`DELETE FROM comments WHERE id='${req.params.id}'`)
                    res.status(200).json({
                        message: "status code 200",
                        items
                    })
                } else {
                    res.status(400).json({message: "Ощибка при удаление, нету комментари"})                    
                }

            } catch (e) {
                console.log(e)
                res.status(500).json({message: "Ощибка сервера"})
            }
        } else {
            res.status(500).json({message: "Ощибка сервера"})
        }
    }
}

export default new commentsRequest()