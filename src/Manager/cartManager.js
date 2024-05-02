import fs from 'fs';

import path from 'path';
import { config } from '../Config/config.js';

const cartFilePath = path.join(config.DIRNAME, '../Mocks/cart.json');

export const cartManager = {
  cartCreate: (request, response) => {
    const allCarts = JSON.parse(fs.readFileSync(cartFilePath, 'utf-8'));
    try {
      const allCartsNew = {
        id: allCarts.lenght + 1,
        articles: [],
      };
      allCarts.push(allCartsNew);
      fs.writeFileSync(cartFilePath, JSON.stringify(allCarts));
      response.status(201).json(cartNew);
    } catch (error) {
      response
        .status(500)
        .json({ error: 'Hubo un problema al tratar de crear el carrito' });
    }
  },
  getCart: (request, response) => {
    try {
      const allCarts = JSON.parse(fs.readFileSync(cartFilePath, 'utf-8'));
      response.json(allCarts);
    } catch (error) {
      response
        .status(500)
        .json({ error: 'Hubo un problema al tratar de obtener el carrito' });
    }
  },

  getCartByID: (request, response) => {
    try {
      const cartID = Number(request.params.cid);
      const allCarts = JSON.parse(fs.readFileSync(cartFilePath, 'utf-8'));
      const OnlyOneCart = allCarts.find((cart) => cart.id === cartID);

      if (!OnlyOneCart) {
        return response
          .status(500)
          .json({ error: 'no se pudo encontrar el carrito deseado' });
      }
      response.json(OnlyOneCart.articles);
    } catch (error) {
      response.status(500).json({
        error: `Hubo un problema al tratar de obtener el carrito con ID: ${cartID}`,
      });
    }
  },
  addArticlesToCart: (request, response) => {
    try {
      const cartID = Number(request.params.cid);
      const articleID = Number(request.params.aid);
      const quantity = request.body.quantity || 1;

      const allCarts = JSON.parse(fs.readFileSync(cartFilePath, 'utf-8'));
      const OnlyOneCart = allCarts.find((cart) => cart.id === cartID);

      if (!OnlyOneCart) {
        return response.status(404).json({
          error: 'Hubo un problema al tratar de obtener el carrito deseado',
        });
      }

      const articlesInCart = allCarts.articles.find(
        (item) => item.article === articleID
      );

      articlesInCart
        ? (articlesInCart += quantity)
        : OnlyOneCart.articles.push({ article: articleID, quantity });

      fs.writeFileSync(cartFilePath, JSON.stringify(allCarts));
      response.json(OnlyOneCart);
    } catch (error) {
      response.status(500).json({
        error: 'Hubo un problema al intentar agregar el articulo al carrito',
      });
    }
  },
};
