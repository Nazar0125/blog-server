"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importStar(require("bcrypt"));
const uuid_1 = require("uuid");
const index_1 = require("./../database/index");
const server_config_json_1 = require("./../config/server.config.json");
const generates_1 = require("../utils/generates");
const descriptionRequests_1 = __importDefault(require("./descriptionRequests"));
class authRequest {
    authorization(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { login, password } = req.body;
            if (login && password) {
                try {
                    const user = yield index_1.db.query('SELECT users.id, login, name, surname, avatar, password FROM users WHERE login=($1)', [
                        login,
                    ]);
                    if ((0, bcrypt_1.compareSync)(password, user[0].password) && user) {
                        const accessToken = (0, generates_1.generateAccessToken)(user[0].id, login);
                        const refreshToken = (0, generates_1.generateRefreshToken)(user[0].refresh_id);
                        res.status(200).json({
                            message: 'authorization ок',
                            accessToken,
                            user
                        });
                    }
                    else {
                        res.status(400).json({ message: 'не верны логин и парол' });
                    }
                }
                catch (e) {
                    res.status(400).json({ message: 'не верны логин и парол' });
                }
            }
            else {
                res.status(400).json({ message: 'нет данных' });
            }
        });
    }
    registration(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { login, password, name, surname } = req.body;
            if (login && password && name && surname) {
                const refreshId = (0, uuid_1.v4)();
                const hashPassword = bcrypt_1.default.hashSync(password, 10);
                try {
                    const user = yield index_1.db.query('INSERT INTO users (login, password, refresh_id, name, surname) VALUES ($1,$2,$3,$4,$5) returning *', [
                        login,
                        hashPassword,
                        refreshId,
                        name,
                        surname
                    ]);
                    const accessToken = (0, generates_1.generateAccessToken)(user[0].id, login);
                    const refreshToken = (0, generates_1.generateRefreshToken)(user[0].refresh_id);
                    res.status(200).json({
                        message: 'пользоветель добавлен',
                        accessToken,
                        refreshToken,
                        expiresIn: server_config_json_1.access_token.time
                    });
                    let id = user[0].id;
                    descriptionRequests_1.default.addDescription(id);
                }
                catch (e) {
                    console.log(e);
                    res.status(500).json({ message: 'Ошибка сервера' });
                }
            }
            else {
                res.status(400).json({ message: 'нет данных' });
            }
        });
    }
}
exports.default = new authRequest();
