// 'use strict';

// const constants = require('./constants');

// module.exports.getProductsList = async (event) => {
  
//   return {
//     statusCode: 200,
//     body: JSON.stringify(
//       constants.products,
//       null,
//       2
//     ),
//   };



//   // Use this code if you don't use the http event with the LAMBDA-PROXY integration
//   // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
// };

// module.exports.getProductsById = async (event) => {
//   const product = constants.products.filter((el) => el.id === event.pathParameters.id)
//   try {
//     if (product.length === 0) {
//       throw new Error()
//     } else {
//       return {
//         statusCode: 200,
//         body: JSON.stringify(
//           product,
//           null,
//           2
//         ),
//       };
//     }
//   }
//   catch(err) {
//     return {
//       statusCode: 404,
//       body: JSON.stringify(
//         "Product not found",
//         null,
//         2
//       ),
//     };
//   }


//   // Use this code if you don't use the http event with the LAMBDA-PROXY integration
//   // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
// };

import { getProductsList } from "./getProductsList"
import { getProductsById } from "./getProductsById"

export { getProductsList, getProductsById }