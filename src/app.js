import express from 'express';
import { articlesRouter } from './Routes/article.routes.js';
import { cartRouter } from './Routes/cart.routes.js';
import { config } from './Config/config.js';

const server = express();

server.use(express.json());

server.use('/api/articles', articlesRouter);
server.use('/api/cart', cartRouter);

server.use('/static', express.static(`${config.DIRNAME}/public`));

server.listen(config.PORT, () => {
  console.log(`Servidor activo: http://localhost:${config.PORT}/`);
});
