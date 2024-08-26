import { Request, Response } from 'express';

export interface registerRouterParams {
    method: string,
    handler: (req: Request,res: Response) => void,
    path: string
}