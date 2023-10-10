import { Request, Response, Router } from 'express';
import { PostsServiceInterface } from './postsService';
import { Express } from 'express';

const router = Router();

const initializeAPIRoutes = (postsService: PostsServiceInterface) => {
    router.get('/', (req: Request, res: Response) => {
        const posts = postsService.getAllPosts();
        res.json(posts);
    });

    router.get('/:id', (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const post = postsService.getPostById(id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.json(post);
    });

    router.post('/', (req: Request, res: Response) => {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }

        const newPost = postsService.createPost(title, content);
        res.status(201).json(newPost);
    });

    router.put('/:id', (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const updatedPost = req.body;

        const updated = postsService.updatePost(id, updatedPost);

        if (!updated) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.json(updated);
    });

    router.delete('/:id', (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const deleted = postsService.deletePost(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.json({ message: 'Post deleted' });
    });

    return (app: Express) => {
        app.use('/api/posts', router);
    };
};

export default initializeAPIRoutes;
