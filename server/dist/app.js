"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = require("body-parser");
const express_validator_1 = require("express-validator");
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const moke_1 = require("./moke");
const url = process.env.CLIENT_URL || 'http://localhost';
const port = process.env.CLIENT_PORT || 3000;
exports.app = (0, express_1.default)();
exports.server = http_1.default.createServer(exports.app);
dotenv_1.default.config();
exports.app.use('*', (0, cors_1.default)({ origin: `${url}:${port}`, credentials: true }));
exports.app.use((0, body_parser_1.json)());
exports.app.use((0, body_parser_1.urlencoded)({ extended: true }));
exports.app.post('/user', (0, express_validator_1.body)('email').isEmail(), (0, express_validator_1.body)('email').isLength({ min: 6 }), (req, res) => {
    const { email, number } = req.body;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors);
    }
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
});
