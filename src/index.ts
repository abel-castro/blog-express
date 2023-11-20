import express, { Router } from 'express';
import router from './router';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('', router);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default server;
