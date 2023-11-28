import express from 'express';
import dotenv from 'dotenv';
import { urlencoded, json } from 'body-parser';
import { Request, Response, NextFunction } from 'express';
const util = require('util');
import { body, validationResult } from 'express-validator';
import cors from 'cors';
import http from 'http';
import { mokeData } from './moke';
import { IUser } from './interfaces/user.interface';

const url = process.env.CLIENT_URL || 'http://localhost';

export const app = express();
export const server = http.createServer(app);
dotenv.config();
app.options('*', cors({ origin: url, credentials: true }));

app.use(cors({ origin: process.env.CLIENT_URL, optionsSuccessStatus: 200 }));
app.use(json());
app.use(urlencoded({ extended: true }));

app.post(
    '/user',
    body('email').isEmail(),
    body('email').isLength({ min: 5 }),

    (req: Request, res: Response) => {
        const { email, number } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        setTimeout(() => {
            const filteredData: IUser[] = mokeData.filter((rec) => {
                if (email && number) {
                    return rec.email === email && rec.number === String(number);
                } else if (email && !number) {
                    return rec.email === email;
                }
            });
            if (filteredData.length > 0) {
                res.status(200).json(filteredData);
            } else {
                res.status(400).send('there is no such user');
            }
        }, 5000);
    }
);
