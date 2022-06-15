import express, { Router } from "express";
import authRequests from "../requests/authRequests";

const router:Router = express.Router()
    router.post('/signup', authRequests.registration)
    router.post('/signin', authRequests.authorization)
export default router