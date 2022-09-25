'use strict'

import { products } from "./products";
export const getProductsList = async (event) => {
  console.log('test2')
    return {
      statusCode: 200,
      body: JSON.stringify(
        products,
        null,
        2
      ),
    };
};
