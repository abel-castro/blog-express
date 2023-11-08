import request from 'supertest';
import bodyParser from "body-parser";
import express from "express";

import router from "../../router"


jest.mock('../../postsService', () => ({
    getAllPosts: jest.fn().mockReturnValue([
        { id: 1, title: 'Post 1' },
        { id: 2, title: 'Post 2' },
        { id: 3, title: 'Post 3' }
    ]),
}));

describe('Posts API Controller test', (): void => {
    const app = express();

    beforeEach(async () => {
        app.use(bodyParser.json())
        app.use(router)
    })

    test('getAll', async (): Promise<void> => {
        const response = await request(app).get('/')
        expect(response.status).toBe(200)
        expect(response.body.length).toBe(3);
    })
})