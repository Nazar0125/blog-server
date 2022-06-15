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
class lastRequest {
    getLast(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield index_1.db.query(`SELECT * FROM posts ORDER BY id DESC`);
                const comments = yield index_1.db.query(`SELECT * FROM comments`);
                const users = yield index_1.db.query(`SELECT id, avatar, name, surname FROM users`);
                let items = data.map((item, n) => {
                    let m = [];
                    let admin = {};
                    comments.forEach((comment) => {
                        if (item.id === comment.post_id) {
                            m.push(Object.assign({}, comment));
                        }
                        else {
                            m = [];
                        }
                    });
                    users.forEach((user) => {
                        if (item.user_id === user.id) {
                            admin = Object.assign({}, user);
                        }
                    });
                    item.comments = m;
                    item.user = admin;
                    return Object.assign({}, item);
                });
                res.status(200).json({
                    statusCode: 200,
                    content: items,
                });
            }
            catch (e) {
                console.log(e);
                res.status(500).json({ message: "Ощибка сервера" });
            }
        });
    }
}
exports.default = new lastRequest();
