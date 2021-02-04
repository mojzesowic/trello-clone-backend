import { Request, Response } from 'express';
import * as mongoose from 'mongoose';

const User = mongoose.model('User');

export const register = (req: Request, res: Response) => {
    if (!req.body || !req.body.email || !req.body.username || !req.body.password) {
        return res.sendStatus(400);
    }
    User.create(req.body.email, req.body.username, req.body.password, (err, data) => {
        console.log(err, data);
        if (err) {
            return res.status(500).send(err);
        }

        res.sendStatus(204);
    });
};