import { Request, Response, Router } from 'express';
import { postService } from './postsService';


const router = Router();

router.get('/', (req: Request, res: Response) => {
    const posts = postService.getAllPosts();
    res.json(posts);
});

router.get('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const post = postService.getPostById(id);

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

    const newPost = postService.createPost(title, content);
    res.status(201).json(newPost);
});

router.put('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const updatedPost = req.body;

    const updated = postService.updatePost(id, updatedPost);

    if (!updated) {
        return res.status(404).json({ message: 'Post not found' });
    }

    res.json(updated);
});

router.delete('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const deleted = postService.deletePost(id);

    if (!deleted) {
        return res.status(404).json({ message: 'Post not found' });
    }

    res.json({ message: 'Post deleted' });
});

export default router;
