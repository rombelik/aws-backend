'use strict'

import { products } from "./products";
export const getProductsList = async (event) => {
    return {
      statusCode: 200,
      body: JSON.stringify(
        products,
        null,
        2
      ),
    };
};
