import express from 'express';
import bodyParser from 'body-parser';
import apiController from './apiController';
import initializeAPIRoutes from './apiController';
import { postsService } from './postsService';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Initialize the API routes with the PostsService
const setupRoutes = initializeAPIRoutes(postsService);
setupRoutes(app);

// Mount the API controller at the base route
app.use('/api/posts', apiController);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default server;
