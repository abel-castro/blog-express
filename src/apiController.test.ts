import request from 'supertest';
import { Post } from './models';
import { PostsServiceInterface } from './postsService';
import express from 'express';
import initializeAPIRoutes from './apiController';
import bodyParser from 'body-parser';


let test_data = [
    { id: 1, title: 'Title 1', content: 'Content 1' },
    { id: 2, title: 'Title 2', content: 'Content 2' },
]


class MockedPostsService implements PostsServiceInterface {
    private posts: Post[] = test_data;

    getAllPosts(): Post[] {
        return this.posts;
    }

    getPostById(id: number): Post | undefined {
        return this.posts.find((post) => post.id === id);
    }

    createPost(title: string, content: string): Post {
        const id = this.posts.length + 1;
        const newPost = { id, title, content };
        this.posts.push(newPost);
        return newPost;
    }

    updatePost(id: number, updatedPost: Partial<Post>): Post | null {
        const index = this.posts.findIndex((post) => post.id === id);
        if (index === -1) return null;

        this.posts[index] = { ...this.posts[index], ...updatedPost };
        return this.posts[index];
    }

    deletePost(id: number): boolean {
        const index = this.posts.findIndex((post) => post.id === id);
        if (index === -1) return false;

        this.posts.splice(index, 1);
        return true;
    }


}
const mockedPostsService = new MockedPostsService();

const app = express();
app.use(bodyParser.json());
const setupRoutes = initializeAPIRoutes(mockedPostsService);
setupRoutes(app);


describe('API Endpoints', () => {
    it('should get all posts', async () => {
        const response = await request(app).get('/api/posts');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should get one post by id', async () => {
        const response = await request(app)
            .get('/api/posts/1');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', 1);
        expect(response.body).toHaveProperty('title', 'Title 1');
        expect(response.body).toHaveProperty('content', 'Content 1');
    });

    it('should create a new post', async () => {
        const response = await request(app)
            .post('/api/posts')
            .send({ title: 'New post', content: 'Some content' });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('title', 'New post');
        expect(response.body).toHaveProperty('content', 'Some content');
    });

    it('should update an existing post', async () => {
        const response = await request(app)
            .put('/api/posts/1')
            .send({ title: 'Updated post', content: 'Updated content' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('title', 'Updated post');
        expect(response.body).toHaveProperty('content', 'Updated content');
    });

    it('should delete an posts', async () => {
        const response = await request(app).delete('/api/posts/1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Post deleted' });
    });
});