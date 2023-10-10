import { Request, Response, NextFunction } from "express";

import {getAllPosts} from "./postsService"

export function getAll(req: Request, res: Response, next: NextFunction): void {
    const posts = getAllPosts();
    res.json(posts);
}
