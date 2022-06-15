"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersRequests_1 = __importDefault(require("./../requests/usersRequests"));
const router = express_1.default.Router();
router.get('/items', usersRequests_1.default.getUserItems);
router.get('/:id', usersRequests_1.default.getUserBy);
exports.default = router;
