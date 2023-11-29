import express from 'express';
import dotenv from 'dotenv';
import { urlencoded, json } from 'body-parser';
import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import cors from 'cors';
import http from 'http';
import { mokeData } from './moke';
import { IUser } from './interfaces/user.interface';

const url = process.env.CLIENT_URL || 'http://localhost';
const port = process.env.CLIENT_PORT || 3000;

export const app = express();
export const server = http.createServer(app);
dotenv.config();

app.use('*', cors({ origin: `${url}:${port}`, credentials: true }));
app.use(json());
app.use(urlencoded({ extended: true }));

app.post(
    '/user',
    body('email').isEmail(),
    body('email').isLength({ min: 6 }),

    (req: Request, res: Response) => {
        const { email, number } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send(errors);
        }
        setTimeout(() => {
            const filteredData: IUser[] = mokeData.filter((rec) => {
                if (email && number) {
                    return rec.number === number.split('-').join('');
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
