import { Request, Response } from 'express';

export const loggedIn = (req: Request, res: Response, next) => {
    if (!req.user) {
        return res.sendStatus(401);
    }
    next();
};
