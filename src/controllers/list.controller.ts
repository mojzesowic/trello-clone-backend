import { Request, Response } from 'express';
import * as mongoose from 'mongoose';

const list = mongoose.model('List');
const board = mongoose.model('Board');

export function createList(req: Request, res: Response) {
    if (!req.body || !req.body.board || !req.body.name) {
        res.sendStatus(400);
    }

    board.findById(req.body.board, (err, data: any) => {
        if (err) {
            return res.status(404).send('Couldnt find board');
        }

        list.create(req.body.name, (error, newList) => {
            if (error) {
                return res.send(error).status(500);
            }
            data.lists.push(newList);
            data.save();
            res.sendStatus(204);
        });
    });
}
