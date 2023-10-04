import request from 'supertest';
import app from '../src/index'; // Adjust the path accordingly


describe('API Endpoints', () => {
    afterAll((done) => {
        // Close the server after all tests
        app.close();
        done();
    });

    it('should get all posts', async () => {
        const response = await request(app).get('/api/posts');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should get one post by id', async () => {
        const response = await request(app)
            .get('/api/posts/1');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('title');
    });

    it('should create a new post', async () => {
        const response = await request(app)
            .post('/api/posts')
            .send({ title: 'New post', content: 'Some content' });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('title', 'New post');
    });

    it('should update an existing post', async () => {
        const response = await request(app)
            .put('/api/posts/1')
            .send({ title: 'Updated post', content: 'Updated content' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('title', 'Updated post');
    });

    it('should delete an posts', async () => {
        const response = await request(app).delete('/api/posts/1');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Post deleted' });
    });
});