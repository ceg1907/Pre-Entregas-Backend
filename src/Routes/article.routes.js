import express from 'express';
import { articleManager } from '../Manager/articleManager.js';

export const articlesRouter = express.Router();

articlesRouter.get('/', articleManager.getArticles);
articlesRouter.get('/:aid', articleManager.getArticlesByID);
articlesRouter.post('/', articleManager.addArticles);
articlesRouter.put('/:aid', articleManager.articleUpdate);
articlesRouter.delete('/:aid', articleManager.articleDelete);
