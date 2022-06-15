"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commentsRequest_1 = __importDefault(require("./../requests/commentsRequest"));
const router = express_1.default.Router();
router.get('/', commentsRequest_1.default.getComments);
router.post('/', commentsRequest_1.default.addComment);
router.put('/', commentsRequest_1.default.updateComment);
router.delete('/:id', commentsRequest_1.default.deleteComment);
exports.default = router;
