"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./../../database/index");
class postLikeRequest {
    getLike(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            if (req.body.id) {
                try {
                    const data = yield index_1.db.query(`SELECT * FROM likes WHERE id='${req.body.id}'`);
                    console.log(data);
                    res.status(200).json({
                        statusCode: 200,
                        content: data
                    });
                }
                catch (e) {
                    res.status(500).json({ message: "Ощибка сервера" });
                }
            }
            else {
                res.status(500).json({ message: "Ощибка сервера" });
            }
        });
    }
    addLike(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { post_id, user_id } = req.body;
            if (post_id && user_id) {
                try {
                    let date = new Date();
                    let post = yield index_1.db.query(`INSERT INTO likes (post_id, user_id) VALUES ($1, $2) returning *`, [post_id, user_id]);
                    console.log(post);
                    res.status(200).json({
                        statusCode: 200,
                        content: post[0]
                    });
                }
                catch (error) {
                    console.log(error);
                    res.status(500).json({ message: "Ощибка сервера" });
                }
            }
            else {
                res.status(400).json({ message: 'нет данных' });
            }
        });
    }
    deleteLike(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.default = new postLikeRequest();
