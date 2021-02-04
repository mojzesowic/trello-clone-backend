import { Router } from 'express';
import { createBoard, getBoardById, getBoards } from '../controllers/board.controller';
import { createList } from '../controllers/list.controller';

const router = Router();

router.get('/boards', getBoards);
router.get('/boards/:id', getBoardById);
router.post('/boards', createBoard);
router.post('/lists', createList);

export default router;
