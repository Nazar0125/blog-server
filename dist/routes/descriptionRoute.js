"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const confirmAccessToken_1 = __importDefault(require("../middlewares/confirmAccessToken"));
const descriptionRequests_1 = __importDefault(require("../requests/descriptionRequests"));
const router = express_1.default.Router();
router.get('/:id', confirmAccessToken_1.default, descriptionRequests_1.default.getDescription);
router.put('/', confirmAccessToken_1.default, descriptionRequests_1.default.updateDescription);
router.post('/', confirmAccessToken_1.default, descriptionRequests_1.default.addDescription);
exports.default = router;
