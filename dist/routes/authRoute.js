"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRequests_1 = __importDefault(require("../requests/authRequests"));
const router = express_1.default.Router();
router.post('/signup', authRequests_1.default.registration);
router.post('/signin', authRequests_1.default.authorization);
exports.default = router;
