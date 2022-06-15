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
class usersRequest {
    getUserBy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.params.id) {
                try {
                    const data = yield index_1.db.query(`SELECT users.id, users.avatar, users.name, users.surname FROM users WHERE id='${req.params.id}'`);
                    res.status(200).json({
                        statusCode: 200,
                        content: data[0],
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
    getUserItems(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('test');
            try {
                const data = yield index_1.db.query('SELECT * FROM users');
                res.status(200).json({
                    statusCode: 200,
                    content: data,
                });
            }
            catch (e) {
                res.status(500).json({ message: "Ощибка сервера" });
            }
        });
    }
}
exports.default = new usersRequest();
