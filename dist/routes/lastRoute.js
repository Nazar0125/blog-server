"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lastRequest_1 = __importDefault(require("../requests/lastRequest"));
const router = express_1.default.Router();
router.get('/', lastRequest_1.default.getLast);
exports.default = router;
