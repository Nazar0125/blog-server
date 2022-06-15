import { Request, Response } from 'express'
import {db} from './../../database/index'
import { postRequestTypes } from './types';

class postRequest implements postRequestTypes {
    public async addPost(req: any, res: Response): Promise<void> {
        const {title, text, user_id, photo} = req.body;
        if (title && text && user_id) {
            try {
                let date = new Date();
                let post = await db.query(`INSERT INTO posts (title, text, user_id, photo, date) VALUES ($1, $2, $3 ,$4, $5) returning *`, [title, text, user_id, photo, date])
                
                console.log(post)

                res.status(200).json({
                    message: 'Пост добавлен',
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
    public async getPost(req: any, res: Response): Promise<void> {
        try {
            const data: any[] = await db.query(`SELECT * FROM posts`)
            const comments: any[] = await db.query(`SELECT * FROM comments`)

            let items = data.map((item) => {
                let m:any = []

                comments.forEach((comment) => {
                    if (item.id === comment.post_id) {
                        console.log(comment)
                        m.push({...comment})
                    } else {
                        m = []
                    }
                })
                item.comments = m

                return {
                    ...item,
                }
            })


            res.status(200).json({
                message: "status code 200",
                content: data,
            })
        } catch (e) {
            res.status(500).json({message: "Ощибка сервера"})
        }
    }
    public async getByPost(req: any, res: Response): Promise<void> {
        if (req.params.id) {
            try {
                const data: any[] = await db.query(`SELECT * FROM posts WHERE id='${req.params.id}'`);
                let id = data[0].id;
                
                const comments: any[] = await db.query(`SELECT * FROM comments WHERE post_id='${id}'`);
                const users: any[] = await db.query(`SELECT id, avatar, name, surname FROM users`);
                
                let commentUser = comments.map((item, i) => {
                    let use = {}
                    let user = users.forEach((user) => {
                        if (item.user_id === user.id) {
                            use = {...user}
                            return user
                        }
                    })
                    return {...item, user: use }
                })

                let items = {
                    ...data[0],
                    commentUser
                }

                res.status(200).json({
                    message: "status code 200",
                    content: items,
                })
            } catch (e) {
                res.status(500).json({message: "Ощибка сервера"})
            }
        } else {
            res.status(500).json({message: "Ощибка сервера"})
        }   
    }
    public async updatePost(req: any, res: Response): Promise<void> {
        if (req.body.id && req.body.title && req.body.text && req.body) {
            try {
                let data = await db.query(`UPDATE posts SET 
                    title = '${req.body.title}',
                    text = '${req.body.text}',
                    photo = '${req.body.photo}'
                    WHERE id = '${req.body.id}' returning *`)
                res.status(200).json({
                     message: "Задача обнавлена",
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
    public async deletePost(req: any, res: Response): Promise<void> {
        if (req.params.id) {
            try {
                await db.query(`DELETE FROM posts WHERE id='${req.params.id}'`)
                res.status(200).json({
                    message: "status code 200",
                })
            } catch (e) {
                res.status(500).json({message: "Ощибка сервера"})
            }
        } else {
            res.status(500).json({message: "Ощибка сервера"})
        }
    }
}

export default new postRequest()