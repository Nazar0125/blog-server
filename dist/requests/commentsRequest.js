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
const index_1 = require("../database/index");
class commentsRequest {
    getComments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { post_id } = req.body;
                if (post_id) {
                    const data = yield index_1.db.query(`SELECT * FROM comments WHERE post_id='${post_id}'`);
                    res.status(200).json({
                        message: "status code 200",
                        content: data,
                    });
                }
            }
            catch (e) {
                res.status(500).json({ message: "Ощибка сервера" });
            }
        });
    }
    addComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { post_id, user_id, text } = req.body;
            if (post_id && user_id && text) {
                try {
                    let date = new Date();
                    let comment = yield index_1.db.query(`INSERT INTO comments (post_id, user_id, text, date) VALUES ($1, $2, $3, $4) returning *`, [
                        post_id, user_id, text, date
                    ]);
                    res.status(200).json({
                        statusCode: 200,
                        message: 'Комментари добавлена',
                        content: comment[0]
                    });
                }
                catch (e) {
                    res.status(500).json({ message: "Ощибка сервера" });
                }
            }
            else {
                res.status(400).json({ message: 'нет данных' });
            }
        });
    }
    updateComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body.id && req.body.post_id && req.body.user_id && req.body.text) {
                try {
                    let data = yield index_1.db.query(`UPDATE comments SET 
                    post_id = '${req.body.post_id}',
                    user_id = '${req.body.user_id}',
                    text = '${req.body.text}'
                    WHERE id = '${req.body.id}' returning *`);
                    console.log(res);
                    res.status(200).json({
                        statusCode: 200,
                        content: data
                    });
                }
                catch (e) {
                    console.log(e);
                    res.status(500).json({
                        message: "ошибка сервера",
                    });
                }
            }
            else {
                res.status(400).json({ message: "нет данных" });
            }
        });
    }
    deleteComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.params.id) {
                try {
                    let check = yield index_1.db.query(`SELECT id FROM comments WHERE id='${req.params.id}'`);
                    if (check[0]) {
                        let items = yield index_1.db.query(`DELETE FROM comments WHERE id='${req.params.id}'`);
                        res.status(200).json({
                            message: "status code 200",
                            items
                        });
                    }
                    else {
                        res.status(400).json({ message: "Ощибка при удаление, нету комментари" });
                    }
                }
                catch (e) {
                    console.log(e);
                    res.status(500).json({ message: "Ощибка сервера" });
                }
            }
            else {
                res.status(500).json({ message: "Ощибка сервера" });
            }
        });
    }
}
exports.default = new commentsRequest();
