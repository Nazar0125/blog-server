import { GenerateAccessTokenTypes, GenerateRefreshTokenTypes } from "./types";
import jwt from 'jsonwebtoken'
import {access_token, refresh_token} from './../config/server.config.json'

export const generateAccessToken:GenerateAccessTokenTypes = (id, login) => {
    const payload = {
        id, 
        login
    }
    return jwt.sign(payload, access_token.secret_key, {
        expiresIn: access_token.time
    })
}

export const generateRefreshToken:GenerateRefreshTokenTypes = (id) => {
    const payload = {
        id, 
    }
    return jwt.sign(payload, refresh_token.secret_key, {
        expiresIn: refresh_token.time
    })
}