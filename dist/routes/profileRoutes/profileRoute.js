"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const profileRequests_1 = __importDefault(require("./../../requests/profile/profileRequests"));
const router = express_1.default.Router();
router.put('/avatar', profileRequests_1.default.updateAvatar);
exports.default = router;
