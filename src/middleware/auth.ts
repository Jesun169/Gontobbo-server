import { Request, Response, NextFunction } from 'express';
import { getAuth } from '@clerk/express';

declare global {
    namespace Express {
        interface Request {
            user?: { userId: string; role?: string };
        }
    }
}

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const { isAuthenticated, userId } = getAuth(req);
    if (!isAuthenticated || !userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    req.user = { userId };
    next();
};