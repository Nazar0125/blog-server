import { Request, Response } from 'express'
import {db} from './../../database/index'
import { profileRequestTypes } from './types';

class profileRequests implements profileRequestTypes {
    
    public async updateAvatar(req: any, res: Response): Promise<void> {
        if (req.body) {
            try {
                let data = await db.query(`UPDATE users SET 
                    avatar = '${req.body.imgAvatar}'
                    WHERE id = '${req.body.id}' returning *`)
                res.status(200).json({
                     message: "avatar ok",
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
    
}

export default new profileRequests()