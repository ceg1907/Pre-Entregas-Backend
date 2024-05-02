import fs from 'fs';
import { config } from '../Config/config.js';
import path from 'path';

const articleFilePath = path.join(config.DIRNAME, '../Mocks/articles.json');

export const articleManager = {
  addArticles: (request, response) => {
    try {
      const articles = JSON.parse(fs.readFileSync(articleFilePath, 'utf-8'));
      const newArticle = {
        title: request.body.title,
        description: request.body.description,
        price: request.body.price,
        category: request.body.category,
        stock: request.body.stock,
        thumbnails: request.body.thumbnails || [],
        id: articles.length + 1,
        code: request.body.code,
        status: true,
      };

      articles.push(newArticle);
      fs.writeFileSync(articleFilePath, JSON.stringify(articles));
      response.status(201).json(newArticle);
    } catch (error) {
      response.status(500).json({ error: 'no se pudo cargar el articulo' });
    }
  },

  getArticles: (request, response) => {
    try {
      const articles = JSON.parse(fs.readFileSync(articleFilePath, 'utf-8'));
      response.json(articles);
    } catch (error) {
      response.status(500).json({ error: 'No se pudo obtener los articulos' });
    }
  },

  getArticlesByID: (request, response) => {
    try {
      const articleID = Number(request.params.aid);
      const articles = JSON.parse(fs.readFileSync(articleFilePath, 'utf-8'));
      const article = articles.find((item) => item.id === articleID);
      if (!article) {
        response.status(404).json({ error: 'Articulo no encontrado' });
      }
      response.json(article);
    } catch (error) {
      response.status(500).json;
    }
  },
  articleUpdate: (request, response) => {
    try {
      const articleID = Number(request.params.aid);
      const articleUpdated = request.body;

      const articles = JSON.parse(fs.readFileSync(articleFilePath, 'utf-8'));
      const index = article.findIndex((item) => item.id === articleID);
      if (index === -1) {
        return response
          .status(404)
          .json({ error: 'El articulo no fue encontrado' });
      }

      articles[index] = { ...articles[index], ...articleUpdated };
      fs.writeFileSync(articleFilePath, JSON.stringify(articles));
    } catch (error) {
      response
        .status(500)
        .json({ error: 'Hubo un problema en actualizar el articulo' });
    }
  },

  articleDelete: (request, response) => {
    try {
      const articleID = Number(request.params.aid);
      const articles = JSON.parse(fs.readFileSync(articleFilePath, 'utf-8'));
      const articlesFiltered = articles.filter((item) => item.id !== articleID);

      if (articlesFiltered === articles.length) {
        return response
          .status(404)
          .json({ error: 'el articulo no fue encontrado' });
      }
      fs.writeFileSync(articleFilePath, JSON.stringify(articlesFiltered));
      response.json({ message: 'Se elimino de manera exitosa' });
    } catch (error) {
      response.status(500).json({ error: 'No se pudo eliminar el articulo' });
    }
  },
};
