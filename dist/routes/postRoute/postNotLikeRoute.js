"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postNotLike_1 = __importDefault(require("../../requests/post/postNotLike"));
const router = express_1.default.Router();
router.get('/', postNotLike_1.default.getNotLike);
router.post('/', postNotLike_1.default.addNotLike);
router.delete('/', postNotLike_1.default.deleteNotLike);
exports.default = router;
