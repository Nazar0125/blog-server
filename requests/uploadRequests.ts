import { Request, Response } from 'express'
import { uploadRequestTypes } from './types'

class uploadRequest implements uploadRequestTypes {
    public async upload(req:Request, res:Response):Promise<void> {
        console.log('ping')
        try {
            console.log(req.body)

            if (req.file) {
                res.json(req.file)
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export default new uploadRequest()