import { Request, Response } from 'express'
import {db} from './../../database/index'
import { postNotLikeRequestTypes } from './types';

class postNotLikeRequest implements postNotLikeRequestTypes {
    public async getNotLike(req: any, res: Response): Promise<void> {   
    }
    public async addNotLike(req: any, res: Response): Promise<void> {   
    }
    public async deleteNotLike(req: any, res: Response): Promise<void> {   
    }
}

export default new postNotLikeRequest();