"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postLike_1 = __importDefault(require("../../requests/post/postLike"));
const router = express_1.default.Router();
router.get('/', postLike_1.default.getLike);
router.post('/', postLike_1.default.addLike);
router.delete('/', postLike_1.default.deleteLike);
exports.default = router;
