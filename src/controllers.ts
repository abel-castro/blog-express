import { Request, Response, NextFunction } from "express";
import { getAllPosts } from "./postsService"

export async function getAll(req: Request, res: Response, next: NextFunction) {
    const posts = getAllPosts();
    res.json(posts);
    res.status(200)
}
