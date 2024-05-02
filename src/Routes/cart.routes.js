import { Router } from 'express';
import { cartManager } from '../Manager/cartManager.js';

export const cartRouter = Router();

cartRouter.get('/', cartManager.getCart);
cartRouter.get('/:cid', cartManager.getCartByID);
cartRouter.post('/', cartManager.cartCreate);
cartRouter.post('/:cid/article/:aid', cartManager.addArticlesToCart);
