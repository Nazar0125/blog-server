import { Request, Response } from 'express'
import {db} from './../../database/index'
import { postLikeRequestTypes } from './types';

class postLikeRequest implements postLikeRequestTypes {
    public async getLike(req: any, res: Response): Promise<void> {
        console.log(req.body)
        if (req.body.id) {
            try {
                const data: any[] = await db.query(`SELECT * FROM likes WHERE id='${req.body.id}'`);
                console.log(data)
                res.status(200).json({
                    statusCode: 200,
                    content: data
                })
            } catch (e) {
                res.status(500).json({message: "Ощибка сервера"})
            }
        } else {
            res.status(500).json({message: "Ощибка сервера"})
        }   
    }

    public async addLike(req: any, res: Response): Promise<void> {
        const {post_id, user_id} = req.body;
        if (post_id && user_id) {
            try {
                let date = new Date();
                let post = await db.query(`INSERT INTO likes (post_id, user_id) VALUES ($1, $2) returning *`, [post_id, user_id])
                
                console.log(post)

                res.status(200).json({
                    statusCode: 200,
                    content: post[0]
                })
            } catch(error) {
                console.log(error)
                res.status(500).json({message: "Ощибка сервера"})
            }
        } else {
            res.status(400).json({message: 'нет данных'})
        }   
        
    }
    public async deleteLike(req: any, res: Response): Promise<void> {   
    }
}

export default new postLikeRequest();