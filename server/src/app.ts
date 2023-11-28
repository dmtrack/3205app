import express from 'express';
import dotenv from 'dotenv';
import { urlencoded, json } from 'body-parser';
import cors from 'cors';
import http from 'http';
import { mokeData } from './moke';

const url = process.env.CLIENT_URL || 'http://localhost';

export const app = express();
export const server = http.createServer(app);
dotenv.config();
app.options('*', cors({ origin: url, credentials: true }));

app.use(cors({ origin: process.env.CLIENT_URL, optionsSuccessStatus: 200 }));
app.use(json());
app.use(urlencoded({ extended: true }));

app.get('/getuser', async (req, res) => {
    const email = req.query.email as string;
    const number = req.query.number as string;

    setTimeout(() => {
        const filteredData = mokeData.filter((rec) => {
            if (email && number) {
                return rec.email === email && rec.number === number;
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
});
