'use strict'
import AWS from 'aws-sdk';

const Client = new AWS.DynamoDB.DocumentClient();

export const getProductsById = async (event) => {
    try {
      const { id } = event.pathParameters;
      console.log(id)
      const result_product = await Client.get({
        TableName: 'aws_products',
        Key: {
          id
        }
      }).promise()

      const result_stock = await Client.get({
        TableName: 'aws_stocks',
        Key: {
          product_id: id
        }
      }).promise()

      console.log('result_product --->', result_product )
      console.log('result_stock --->', result_stock )

      if (result_product.hasOwnProperty('Item') && result_stock.hasOwnProperty('Item')) {
        
        const { count } = result_stock['Item']
        const { id, title, description, price } = result_product['Item']
  
        return {
          statusCode: 200,
          body: JSON.stringify({
            id,
            title,
            description,
            price,
            count
          }, null, 2 ) 
        }      
      } else {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: 'Product not found' }, null, 2)
        } 
      };

    }
    catch(err) {
      return {
        statusCode: 404,
        body: JSON.stringify(
          {message: `${err}`},
          null,
          2
        ),
      };
    }
};
