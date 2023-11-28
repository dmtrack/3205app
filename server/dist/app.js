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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const moke_1 = require("./moke");
const url = process.env.CLIENT_URL || 'http://localhost';
exports.app = (0, express_1.default)();
exports.server = http_1.default.createServer(exports.app);
dotenv_1.default.config();
exports.app.options('*', (0, cors_1.default)({ origin: url, credentials: true }));
exports.app.use((0, cors_1.default)({ origin: process.env.CLIENT_URL, optionsSuccessStatus: 200 }));
exports.app.use((0, body_parser_1.json)());
exports.app.use((0, body_parser_1.urlencoded)({ extended: true }));
exports.app.get('/getuser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.query.email;
    const number = req.query.number;
    setTimeout(() => {
        const filteredData = moke_1.mokeData.filter((rec) => {
            if (email && number) {
                return rec.email === email && rec.number === number;
            }
            else if (email && !number) {
                return rec.email === email;
            }
        });
        if (filteredData.length > 0) {
            res.status(200).json(filteredData);
        }
        else {
            res.status(400).send('there is no such user');
        }
    }, 5000);
}));
