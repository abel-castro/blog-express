import request from 'supertest';
import express from "express";

import router from "../router"


jest.mock('../postService', () => ({
    getAllPosts: jest.fn().mockReturnValue([
        { id: 1, title: 'Post 1' },
        { id: 2, title: 'Post 2' },
        { id: 3, title: 'Post 3' }
    ]),
}));

describe('Posts API Controller test', (): void => {
    const app = express();

    beforeEach(async () => {
        app.use(express.json());
        app.use(router);
    });

    test('getAll', async (): Promise<void> => {
        const response = await request(app).get('/api/posts')
        expect(response.status).toBe(200)
        expect(response.body.length).toBe(3);
    })
})