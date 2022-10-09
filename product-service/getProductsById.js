'use strict'

import { products } from "./products";
export const getProductsById = async (event) => {
    const product = await products.filter((el) => el.id === event.pathParameters.id)
    try {
      if (product.length === 0) {
        throw new Error()
      } else {
        return {
          statusCode: 200,
          body: JSON.stringify(
            product,
            null,
            2
          ),
        };
      }
    }
    catch(err) {
      return {
        statusCode: 404,
        body: JSON.stringify(
          "Product not found",
          null,
          2
        ),
      };
    }
};
