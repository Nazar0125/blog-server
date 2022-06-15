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
class descriptionRequest {
    getDescription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.params.id) {
                try {
                    const data = yield index_1.db.query(`SELECT * FROM description WHERE user_id=${req.params.id}`, [
                        req.user.id,
                    ]);
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
    updateDescription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body.id && req.body.text) {
                try {
                    let data = yield index_1.db.query(`UPDATE description SET text='${req.body.text}' WHERE id=${req.body.id} returning *`);
                    res.status(200).json({
                        statusCode: 200,
                        message: "Описания обнавлена",
                        content: data[0],
                    });
                }
                catch (e) {
                    console.log(e);
                    res.status(500).json({ message: "ошибка сервера" });
                }
            }
            else {
                res.status(400).json({ message: "нет данных" });
            }
        });
    }
    addDescription(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id) {
                let text = 'Hello World';
                let userid = id;
                yield index_1.db.query("INSERT INTO description (text, user_id) VALUES ($1, $2)", [
                    text,
                    userid,
                ]);
            }
        });
    }
}
exports.default = new descriptionRequest();
