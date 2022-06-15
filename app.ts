import express, {Express, Request, Response} from 'express'
import { serverStart } from './startServer'
import {db} from './database';
import authRouter from './routes/authRoute';
import descriptionRouter from './routes/descriptionRoute';
import postRouter from './routes/postRoute/postRoute';
import postLikeRouter from './routes/postRoute/postLikeRoute';
import postNotLikeRouter from './routes/postRoute/postNotLikeRoute';
import usersRouter from './routes/usersRoute'
import profileRouter from './routes/profileRoutes/profileRoute';
import uploadRouter from './routes/uploadRoute'
import lastRouter from './routes/lastRoute'

import uploadAvatatRouter from './routes/uploadRoutes/uploadAvatarRoute';
import commentsRouter from './routes/commentsRoute';

import setCors from './middlewares/CORS';

const app: Express = express()
app.use(express.json())
app.use(setCors)

app.set('view engine', 'html');

app.use('/images', express.static('Images'))
app.use('/images/avatar', express.static('Images/avatar'))

//app.use(express.static('Images'));
app.use('/auth', authRouter)
app.use('/description', descriptionRouter)

app.use('/post', postRouter)
app.use('/post/like', postLikeRouter)
app.use('/post/notLike', postNotLikeRouter)

app.use('/comments', commentsRouter)

app.use('/upload', uploadRouter)
app.use('/upload/avatar', uploadAvatatRouter)

app.use('/last', lastRouter)

app.use('/profile', profileRouter)
app.use('/profile', usersRouter)

app.get("/", (req: Request, res: Response) => {
    res.send('hello1')
})

serverStart(app, db)