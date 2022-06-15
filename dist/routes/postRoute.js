"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postRequests_1 = __importDefault(require("./../requests/postRequests"));
const router = express_1.default.Router();
router.get('/:id', postRequests_1.default.getByPost);
router.get('/', postRequests_1.default.getPost);
router.put('/', postRequests_1.default.updatePost);
router.post('/', postRequests_1.default.addPost);
router.delete('/:id', postRequests_1.default.deletePost);
exports.default = router;
