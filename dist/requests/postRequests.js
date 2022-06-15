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
class postRequest {
    addPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, text, user_id, photo } = req.body;
            if (title && text && user_id && photo) {
                try {
                    let date = new Date();
                    let post = yield index_1.db.query(`INSERT INTO posts (title, text, user_id, photo, date) VALUES ($1, $2, $3 ,$4, $5) returning *`, [title, text, user_id, photo, date]);
                    res.status(200).json({
                        message: 'Пост добавлен',
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
    getPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield index_1.db.query(`SELECT * FROM posts`);
                const comments = yield index_1.db.query(`SELECT * FROM comments`);
                let items = data.map((item) => {
                    let m = [];
                    comments.forEach((comment) => {
                        if (item.id === comment.post_id) {
                            console.log(comment);
                            m.push(Object.assign({}, comment));
                        }
                        else {
                            m = [];
                        }
                        console.log('m', m);
                    });
                    item.comments = m;
                    return Object.assign({}, item);
                });
                console.log(items);
                res.status(200).json({
                    message: "status code 200",
                    content: data,
                });
            }
            catch (e) {
                res.status(500).json({ message: "Ощибка сервера" });
            }
        });
    }
    getByPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.params.id) {
                try {
                    const data = yield index_1.db.query(`SELECT * FROM posts WHERE id='${req.params.id}'`);
                    let id = data[0].id;
                    const comments = yield index_1.db.query(`SELECT * FROM comments WHERE post_id='${id}'`);
                    const users = yield index_1.db.query(`SELECT * FROM users`);
                    let commentUser = comments.map((item, i) => {
                        let use = {};
                        let user = users.forEach((user) => {
                            if (item.user_id === user.id) {
                                console.log('user.id', user.id);
                                use = Object.assign({}, user);
                                return user;
                            }
                        });
                        return Object.assign(Object.assign({}, item), { user: use });
                    });
                    let items = Object.assign(Object.assign({}, data[0]), { commentUser });
                    res.status(200).json({
                        message: "status code 200",
                        content: items,
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
    updatePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body.id && req.body.title && req.body.text && req.body) {
                try {
                    let data = yield index_1.db.query(`UPDATE posts SET 
                    title = '${req.body.title}',
                    text = '${req.body.text}',
                    photo = '${req.body.photo}'
                    WHERE id = '${req.body.id}' returning *`);
                    res.status(200).json({
                        message: "Задача обнавлена",
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
    deletePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.params.id) {
                try {
                    yield index_1.db.query(`DELETE FROM posts WHERE id='${req.params.id}'`);
                    res.status(200).json({
                        message: "status code 200",
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
}
exports.default = new postRequest();
