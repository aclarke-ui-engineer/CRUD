import express from 'express';
import cors from 'cors';

import routers from './routes';
const { chillSpotRouter, textRouter } = routers;
const server = express();
const PORT = process.env.PORT || 4001;

server.use(express.json());
server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use('/api', chillSpotRouter, textRouter);

server.use((request: express.Request, response: express.Response) => {
  response.status(404).send('Resource not found');
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
