import { Router } from 'express';
import { applyForLoan } from '../controllers/loan.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.post('/apply', authMiddleware, applyForLoan);

export default router;